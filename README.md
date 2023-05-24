# Creative coding

## Description

This repository consists of visuals made in the Domestica course [Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript) using [canvas-sketch](https://github.com/mattdesl/canvas-sketch/tree/master).

### Blobfish - Pixel manipulation

This is one of the course exercises where pixel information is read from a picture and rendered as a new picture. Part of the values are randomly generated which means that refreshing the browser will render a different image each time. There is a Tweakpane visible in the browser where you can adjust some of the parameters used to render the picture.

The original picture: [Wikimedia commons](https://commons.wikimedia.org/wiki/File:Psychrolutes_marcidus.jpg)

### Turtle - Final project

My final project is an animation where the techniques learned in the course are applied. The wavy background is implemented with [Simplex Noise](https://www.npmjs.com/package/simplex-noise).

The original picture: [Wikimedia commons](https://commons.wikimedia.org/wiki/File:Vector_turtle.svg)

## Technologies
- Node.js
- [canvas-sketch](https://github.com/mattdesl/canvas-sketch/tree/master)
- [Tweakpane](https://cocopon.github.io/tweakpane/)

## Prerequisites for running the project:
- install [Node.js](https://nodejs.org/en)
- a browser (preferably [Google Chrome](https://www.google.com/chrome/))

## How to run the project?
- clone the project
- navigate to a sketch directory
- run with `canvas-sketch *filename* --open`