# Zombie Attack!

## How to play

- `git clone https://github.com/David-Else/typescript-zombie-attack`
- `npm` (or whatever package manager you use) `install`
- Build the JavaScript to run in the browser using the NPM script `build`
- Launch a dev server on `index.html` in the `dist` directory
- **Kill zombies!**

# Code Documentation

The game is built in TypeScript using OOP with an emphasis on composition. The [state pattern](https://gameprogrammingpatterns.com/state.html) is used for the different screens/levels. There are no dependencies, the engine has been written from scratch in an attempt to be as simple and maintainable as possible.

NPM Scripts are used to control the build process. Just run `build-watch` and Rollup will continuously monitor for changes to the source code and compile the entire game into `dist/mod.js`. You can run a dev server on `dist/index.html` to play the game and work on development.

## Overview

### src/mod.ts

The 'main' entry function is `mod.ts` which is loaded and run by `index.html`. It does the following:

- Imports the `GlobalState` class ready to be instantiated as `globalState`. This is where all mutable state lives, including all the on screen entities, key press states, all the sound/graphics assets, and the levels themselves contained inside `levelState: StatePattern`
- Imports the initial state `Init` for the state pattern. Each state can call the next state, and this one loads the assets and continues to the start screen
- Set the rendering context to the `"game-canvas"` element
- Decides the dimensions of the game screen based on the current browser `canvas.width`/`canvas.height`
- Adds the keyboard event listeners
- Starts the `gameLoop()`

### src/states

All the files in this directory are part of the state pattern and use `extends Base implements StatePattern`.They have a single abstract base class they inherit from called `base-class.ts` which contains:

`update()` which is responsible for updating all the entities and drawing them.
`keyHandler()` which deals with in-game key presses

## Screen Shot of Level 1

![screen shot](/assets/zombie-attack-screenshot.png)
hello
