/* global describe, it */

const tribal = require('../index.js')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

const {
  coordsToAddress,
  addressToCoords,
  wordsArr
} = tribal

let testAddress = ['make', 'be', 'be', 'be']
let testCoords = {
  lat: 9.998999999999999,
  lng: 0.018000000000000002,
  maxLat: 10.008,
  maxLng: 0.036000000000000004,
  minLat: 9.989999999999998,
  minLng: 0
}

describe('wordsArr', () => {
  it('Is of a square size', () => {
    (Math.sqrt(wordsArr.length) % 1).should.equal(0)
  })
})

describe('coordsToAddress', () => {
  it('Returns an array of strings', () => {
    coordsToAddress(testCoords).should.be.an('array')
  })

  it('Returns the correct accuracy address', () => {
    [1, 2, 3, 4, 5, 6, 7].every(accuracy =>
      coordsToAddress(testCoords, accuracy).should.have.lengthOf(accuracy)
    )
  })

  it('Returns the correct address', () => {
    coordsToAddress(testCoords, testAddress.length).should.deep.equal(testAddress)
  })
})

describe('addressToCoords', () => {
  it('Returns correctly formatted object', () => {
    addressToCoords(testAddress).should.have.keys(
      'lat',
      'lng',
      'minLat',
      'minLng',
      'maxLat',
      'maxLng'
    )
  })

  it('Returns the correct coords', () => {
    addressToCoords(testAddress).should.deep.equal(testCoords)
  })
})
