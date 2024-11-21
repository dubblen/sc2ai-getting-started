# Rust bot development

This tutorial will guide you through setting up a development environment for creating a StarCraft II bot using Rust
and the [rust-sc2](https://github.com/UltraMachine/rust-sc2) library.

## Prerequisites

- ready StarCraft II installation (see [here](../../README.md#1-get--configure-starcraft-ii) how to install & configure it)
- Rust and Cargo installed on your machine (see [here](https://www.rust-lang.org/tools/install) how to install it (using rustup is recommended)
- some IDE ([RustRover](https://www.jetbrains.com/rust/) is a great choice) and basic knowledge of Rust

## Setting up the project
### 1. Project & dependencies
#### Create a new project directory, initialize it with cargo and move into it
```bash
cargo new my_bot; cd my_bot
```

#### Add sc2-rust library dependency to the `Cargo.toml`
```bash
# open Cargo.toml with your favourite text editor
nano Cargo.toml
```

Add `rust-sc2 = { git = "https://github.com/UltraMachine/rust-sc2" }` into the `[dependencies]` block.

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
#### Replace the map name
Look into your Starcraft 2 install path and find the `maps` directory. Choose one of the maps and paste it's filename into the code.

#### If there is not the `maps` directory

Create the `maps` directory in the Starcraft 2 install path and put there some maps that you can download [here](https://aiarena.net/wiki/184/plugin/attachments/download/39/).

### 3. Running the bot
The library is able to run the game with the correct setup on Windows, MacOS and Linux (using wine).
If you're working on Linux (or your Starcraft 2 path is not at the standard location), you need to set the `SC2PATH` environment variable.
```bash
export SC2PATH="/home/myname/Games/wineprefix/drive_c/Program Files (x86)/StarCraft II/"
```

#### Enable Wine feature (Linux only)
Enable wine feature by adding this block into the `Cargo.toml` file:
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
And just run the bot that should start the game and connect into it itself:
```bash
cargo run --features wine_sc2
```
##### Windows and MacOS
Just simply start the bot:
```bash
cargo run
```

### 4. Build the bot for a leadder game
The LeaderServer grade bot requires to accept few command line parameters (`--LeaderServer`, `--OpponentId`, `--GamePort`).

You can implement this yourself or you can simply extend your bot with premade wrapper for your main function.
Create new directory called `ex_main` next to your `main.rs` file.
```bash
mkdir -p src/ex_main
```

Put [this mod.rs]() file into the `ex_main` directory.
```bash
curl -o src/ex_main/mod.rs https://github.com
```

Add dependency required by the `ex_main` wrapper to the `Cargo.toml`:
```toml
[dependencies]
rust-sc2 = { git = "https://github.com/UltraMachine/rust-sc2" }
clap = { version = "4.5.21", features = ["derive"] }
```

Replace the main function in the main.rs file.

Replace this:
```rust
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
With this:
```rust
fn main() -> SC2Result<()> {
    ex_main::main(ReaperRushAI::default())
}
```

Depends on your IDE, you might need to import the `ex_main` function by adding this line to the top of the `main.rs` file:
```rust
mod ex_main;
```  

The `ex_main` function also extends the final executable by other command line arguments.
You can print the full help message with `--help` command line argument.

Run the build command with:
```bash
cargo build
```
It will create new directory `target` with another directory `debug` inside it. There should be a new binnary executable called `my_bot` (or `my_bot.exe` if you are on Windows).
This is the file that you will upload to the compatition.


You can find this code in the [Example rust bot](../../examples/rust) directory.
