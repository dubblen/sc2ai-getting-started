# NodeJs bot development

This tutorial will guide you through setting up a development environment for creating a StarCraft II bot using Rust
and the [rust-sc2](https://github.com/UltraMachine/rust-sc2) library.

## Prerequisites

- ready StarCraft II installation (see [here](../../README.md#1-get--configure-starcraft-ii) how to install & configure it)
- Rust and Cargo installed on your machine (see [here](https://www.rust-lang.org/tools/install) how to install it (using rustup is recommended)
- some IDE (RustRover is a great choice) and basic knowledge of Rust

## Setting up the project
### 1. Project & dependencies
#### Create a new project directory and initialize it with cargo:
```bash
cargo new my_bot
```
#### Move to the project directory:
```bash
cd my_bot
```

#### Add sc2-rust library dependenci to Cargo.toml:
```bash
# open Cargo.toml with your favourite text editor
nano  Cargo.toml
```

Add `rust-sc2 = "1"` to the `[dependencies]` block.

The final result should look similar to this:

```toml
[package]
name = "my_bot"
version = "0.1.0"
edition = "2021"

[dependencies]
rust-sc2 = { git = "https://github.com/UltraMachine/rust-sc2" }
```

### 2. Bot code
There should be also a `src` directory right next to the `Cargo.toml` file. In the `src` directory should be `main.rs` which is going to be the entrypoint of your bot.

Replace the content of the `main.rs` file with this bootstrap code:
```rust
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
    let mut bot = WorkerRush::default();
    run_vs_computer(
        &mut bot,
        Computer::new(Race::Random, Difficulty::Medium, None),
        "BerlingradAIE", // Map name
        Default::default(),
    )
}
```
#### Replace the map name.
Look into your Starcraft 2 install path and find the `maps` directory. Choose one of the maps and paste it's filename into the code.

### 3. Running the bot
The library is able to run the game with the correct setup on Windows, MacOS and Linux (using wine).
If you're working on Linux (or your Starcraft 2 path is not at the standard location), you need to set the `SC2PATH` environment variable.
```bash
export SC2PATH="/home/myname/Games/wineprefix/drive_c/Program Files (x86)/StarCraft II/"
```

#### Enable Wine feature (Linux only)
Enable wine feature by adding this block anywhere into the `Cargo.toml` file:
```toml
[features]
wine_sc2 = ["rust-sc2/wine_sc2"]
```

The final result should look like this:
```toml
[package]
name = "my_bot"
version = "0.1.0"
edition = "2021"

[dependencies]
rust-sc2 = "1"

[features]
wine_sc2 = ["rust-sc2/wine_sc2"]
```

#### Run the bot
##### Linux
Set `WINE` environment variable if you want to use a specific wine binary:
```bash
export WINE="/home/nathan/.config/heroic/tools/wine/Wine-GE-latest/bin/wine64"
```
```bash
cargo run --features wine_sc2
```
##### Windows and MacOS
```bash
cargo run
```

You can find this code in the [Example nodejs bot](../../examples/rust-bot) directory.