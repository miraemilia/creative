const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: false
};

let params = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Psychrolutes_marcidus.jpg/320px-Psychrolutes_marcidus.jpg',
  fontFamily: 'serif',
  cellSize: 3,
  glyphDistance: 80,
  backgroundColor: 'black',
  glyphs: '#"-*',
  fontMin: 5,
  fontMax: 20,
  greyMax: 180,
  shadeGrey: 130,
  shadeWhite: 150,
  rotate: 45
}

let img;

const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')

const sketch = ({ context, width, height }) => {
  const cell = params.cellSize
  const cols = Math.floor(width / cell)
  const rows = Math.floor(height / cell)
  const numCells = cols * rows

  typeCanvas.width = cols
  typeCanvas.height = rows

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'white';
    typeContext.fillRect(0, 0, width, height);

    ix = (cols - img.width) * 0.5
    iy = (rows - img.height) * 0.5

    typeContext.save()
    typeContext.translate(ix, iy)
    typeContext.drawImage(img, 0, 0)
    typeContext.restore()
    typeContext.save()
    //typeContext.translate(cols/2, rows/2)
    //typeContext.rotate(params.rotate)

    //context.drawImage(typeCanvas, 0, 0)

    const imageData = typeContext.getImageData(0, 0, cols, rows).data

    context.fillStyle = params.backgroundColor
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = col * cell
      const y = row * cell

      const r = imageData[i * 4 + 0]
      const g = imageData[i * 4 + 1]
      const b = imageData[i * 4 + 2]
      const a = imageData[i * 4 + 3]

      if (r > params.greyMax && i % (numCells/ 100) == 0) {

        const dist = params.glyphDistance
        const gx = x + random.range(-dist, dist)
        const gy = y + random.range(-dist, dist)
        
        context.fillStyle = getColor(i, numCells)
          const glyphs = params.glyphs.split('')
          const glyph = random.pick(glyphs)

        context.font = `${cell * (random.range(params.fontMin, params.fontMax))}px ${params.fontFamily}`
        
        context.save()
        context.translate(gx, gy)
        context.translate(cell * 0.5, cell * 0.5)

        context.fillText(glyph, 0, 0)
        
      } 
      
      if (r <= params.greyMax) {

        context.fillStyle = getShade(r)
      
        context.save()
        context.translate(x, y)
        context.translate(cell * 0.5, cell * 0.5)

        //squares
        context.fillRect(0, 0, cell, cell)

        //circles
        //context.beginPath()
        //context.arc(0, 0, cell * 0.5, 0, Math.PI * 2)
        //context.fill()
      }

      context.restore()

  
    }
  };
};

const getColor = (i, numCells)  => {
  if (i < numCells * 0.25) return 'purple'
  if (i < numCells * 0.5) return 'blue'
  if (i < numCells * 0.75) return 'green'
  return 'yellow'
}

const getShade = (r) => {
  if (r > params.shadeWhite) return 'grey'
  if (r > params.shadeGrey) return 'lightgrey'
  return 'white'
}

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

const createPane = () => {
  const pane = new Tweakpane.Pane()
  let folder;

  folder = pane.addFolder({title: ''})
  folder.addInput(params, 'cellSize', {min: 1, max: 20, step: 1})
  folder.addInput(params, 'fontMin', {min: 2, max: 30, step: 1})
  folder.addInput(params, 'fontMax', {min: 2, max: 30, step: 1})
  folder.addInput(params, 'fontFamily', {options: {serif: 'serif', arial: 'arial'}})
  folder.addInput(params, 'backgroundColor', {options: {black: 'black', white: 'white'}})
  folder.addInput(params, 'greyMax', {min: 100, max: 220, step: 10})
  folder.addInput(params, 'shadeWhite', {min: 100, max: 220, step: 5})
  folder.addInput(params, 'shadeGrey', {min: 100, max: 220, step: 5})
  folder.addInput(params, 'rotate', {min: -100, max: 100, step: 5})
  folder.addInput(params, 'glyphs')

  //pane.on('change', () => {
  //  console.log(params)
  //});
}


start()

createPane()
canvasSketch(sketch, settings)
