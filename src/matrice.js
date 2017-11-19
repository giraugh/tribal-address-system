const wordsArr = require('./words.js')
const _ = require('lodash')

const wordsMatrice = () => {
  let size = Math.floor(Math.sqrt(wordsArr.length))
  let matrice = _.times(size, () => _.times(size, _.constant([])))
  wordsArr.forEach((word, i) => {
    matrice[Math.floor(i / size)][i % size] = word
  })

  return {matrice, size}
}

module.exports = wordsMatrice
