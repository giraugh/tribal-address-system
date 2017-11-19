const lerp = require('lerp')
const wordsArr = require('./words.js')
const wordsMatrice = require('./matrice.js')

const wordToCoords = (word) => {
  let {size} = wordsMatrice()
  let ind = wordsArr.indexOf(word)
  if (ind === -1) throw new Error(`No such word as ${word}`)

  let xInd = Math.floor(ind / size)
  let yInd = Math.floor(ind % size)
  let x = xInd / size
  let y = yInd / size
  let s = 1 / size

  return {x, y, s}
}

const bisectByWord = ([xmin, ymin, xmax, ymax], word) => {
  let {x, y, s} = wordToCoords(word)
  let cx = lerp(xmin, xmax, x)
  let cy = lerp(ymin, ymax, y)
  let ox = lerp(xmin, xmax, x + s)
  let oy = lerp(ymin, ymax, y + s)
  return [
    cx,
    cy,
    ox,
    oy
  ]
}

const wordInRegion = ([xmin, ymin, xmax, ymax], x, y) => {
  if (x >= xmin && x <= xmax && y >= ymin && y <= ymax) {
    let {size, matrice} = wordsMatrice()
    let xPercent = ((x - xmin) / (xmax - xmin))
    let yPercent = ((y - ymin) / (ymax - ymin))
    let xInd = Math.floor(xPercent * size)
    let yInd = Math.floor(yPercent * size)
    return matrice[xInd][yInd]
  } else {
    throw new Error(
      'Position outside of range: ' +
      `x(${xmin} <= ${x} <= ${xmax})` + ' ' +
      `y(${ymin} <= ${y} <= ${ymax})`
    )
  }
}

const addressToCoords = (address) => {
  let startRegion = [-90, -180, 90, 180]
  let region = address.reduce((region, word) => bisectByWord(region, word), startRegion)
  let [minLat, minLng, maxLat, maxLng] = region
  return {
    minLat,
    minLng,
    maxLat,
    maxLng,
    lat: lerp(minLat, maxLat, 0.5),
    lng: lerp(minLng, maxLng, 0.5)
  }
}

const coordsToAddress = ({lat, lng}, accuracy = 4) => {
  let region = [-90, -180, 90, 180]
  let words = []

  while (accuracy--) {
    let word = wordInRegion(region, lat, lng)
    region = bisectByWord(region, word)
    words.push(word)
  }

  return words
}

module.exports = {
  addressToCoords,
  coordsToAddress
}
