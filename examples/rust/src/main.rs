mod ex_main;
use rust_sc2::prelude::*;

#[bot]
#[derive(Default)]
struct WorkerRush;
impl Player for WorkerRush {
    fn get_player_settings(&self) -> PlayerSettings {
        PlayerSettings::new(Race::Protoss)
    }
    fn on_start(&mut self) -> SC2Result<()> {
        for worker in &self.units.my.workers {
            worker.attack(Target::Pos(self.enemy_start), false);
        }
        Ok(())
    }
}

fn main() -> SC2Result<()> {
    ex_main::main(WorkerRush::default())
}
