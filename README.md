# SC2AI - StarCraft II AI Development

So you want to create an AI bot for StarCraft II huh?

You've come to the right place! This repository is a beginner-friendly
guide to setting up your environment, connecting to StarCraft II via WebSocket, and implementing basic bot logic.

To do so, you have to do 2 things:

1. [Get & Configure StarCraft II](#1-get--configure-starcraft-ii)
    - [Linux](./tutorials/setup-linux/README.md)
    - Windows
    - MacOS
2. [Write your bot using your favorite programming language (or the one which has the best API)](#2-write-your-bot)
    - [Choose the right api](#choose-the-right-api-for-you)
    - [Tutorial](#make-your-first-bot-running)

## 1. Get & Configure StarCraft II

All you need is to have a way how to run StarCraft II on your Linux machine and pass it the necessary arguments.
Depending on your operating system, your next steps will vary:

### Linux

The recommended way is to install StarCraft II using [Heroic Games Launcher](https://heroicgameslauncher.com/). It's a
great tool that allows you to install and manage games on Linux and do all the necessary magic to
make it work (Wine/Proton etc.).

Complete guide how to prepare your Linux machine for StarCraft II can be found [here](./tutorials/setup-linux/README.md).

### Windows 

TBD
### MacOS

TBD

## 2. Write your bot

Bot is a piece of code that connects to the StarCraft II game and sends commands to it. You can write your bot in any
programming language you like, but some languages may have libraries that make it easier to interact with the game.

### Choose the right API for you

So your next step is to choose a programming language and a library that you will use to write your bot.

Here are some options:

- Node:
    - [node-sc2 (tested)](https://github.com/node-sc2/core/tree/wip_0.1.0) (tested)
    - [s2client-api-typescript](https://github.com/Zamiell/s2client-api-typescript) (not tested)
- Python:
    - [python-sc2](https://github.com/BurnySc2/python-sc2) (tested)
- Rust:
    - [rust-sc2](https://github.com/UltraMachine/rust-sc2) (not tested)
- Go:
    - [gp-sc2ai](https://github.com/chippydip/go-sc2ai) (not tested)
- Java:
    - [ocraft-s2client](https://github.com/ocraft/ocraft-s2client) (not tested)
- C++:
    - [cpp-sc2](https://github.com/cpp-sc2/cpp-sc2) (not tested)


### Make your first bot running

Once you've chosen your language and library, you can start developing your bot by setting up the development environment
and installing the necessary dependencies.

We have prepared tutorials for some of the most popular languages:

- [Node & node-sc2](./tutorials/bot-node/README.md)
- others TBD


Big UP to [AI Arena](https://github.com/aiarena/awesome-sc2-ai)
