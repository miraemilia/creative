const canvasSketch = require('canvas-sketch');
const { degToRad } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1200, 1200 ],
  animate: true
};

const params = {
  cell: 4,
  freq: 0.001,
  amp: 0.7,
  colorMin: 160,
  drawColor: 180,
  blue_contrast: 80,
  green_contrast: 50,
  speed: 7,
  moveX: 1,
  moveY: 0.5,
  url: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Vector_turtle.svg'
}

let img;

const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')

const sketch = ({ context, width, height }) => {

  const cols = width / params.cell
  const rows =  height / params.cell
  const numCells = cols*rows

  typeCanvas.width = cols
  typeCanvas.height = rows

  return ({ context, width, height, frame }) => {
  
    typeContext.fillStyle = 'white';
    typeContext.fillRect(0, 0, width, height);

    typeContext.drawImage(img, 0, 0)

    const imageData = typeContext.getImageData(0, 0, cols, rows).data

    let green = params.drawColor
    let step = 2

    for (let i = 0; i < numCells; i++) {

      const col = i % cols
      const row = Math.floor(i / cols)
      const x = col * params.cell
      const y = row * params.cell

      const n = random.noise3D(x, y, frame*params.speed, params.freq, params.amp)

      context.fillStyle = `rgb(0, ${70 + n*params.green_contrast}, ${155 + n*params.blue_contrast}`
          
      context.save()

      context.translate(x, y)
      context.fillRect(0, 0, params.cell, params.cell)
  
      context.restore()
      }


    for (let i = 0; i < numCells; i++) {

      const col = i % cols
      const row = Math.floor(i / cols)
      const x = col * params.cell
      const y = row * params.cell
      const tx = (x-width/2) + frame * params.moveX
      const ty = y + frame * params.moveY

      const r = imageData[i * 4 + 0]
      const g = imageData[i * 4 + 1]
      const b = imageData[i * 4 + 2]
      const a = imageData[i * 4 + 3]

      if (g < params.colorMin) {

        if (green > 220 || green < 150) {
          step = -step
        }
        green += step * (frame % 12)


        if (b > 35) {
          context.fillStyle = `rgb(${green - 50}, 240, 240)`
        } else {
          context.fillStyle = `rgb(0, ${green}, 250)`
        }

        context.save()
        context.translate(tx, ty)

        context.beginPath()
        context.arc(params.cell * .5, params.cell * .5, params.cell * .7, 0, Math.PI * 2)
        context.fill()

        context.restore()
      }

    }
  };
};

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.crossOrigin = 'Anonymous'
    img.src = url
  })
}

const start = async () => {
  const img = await loadImage(params.url)
  console.log(img)
}

start()
canvasSketch(sketch, settings);
