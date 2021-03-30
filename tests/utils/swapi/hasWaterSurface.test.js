const { hasWaterSurface } = require('../../../utils/swapi')
const { planetWithWaterAndMountains, planetWithoutWater } = require('../../../mocks/swapi/planets')

describe('positiveNumberRegex tests', () => {
  it('should return for a planet with water', () => {
    // Given
    const planet = planetWithWaterAndMountains

    // When
    const result = hasWaterSurface(planet)

    // Then
    expect(result).toBeTruthy()
  })

  it('should return false for a planet without water', () => {
    // Given
    const planet = planetWithoutWater

    // When
    const result = hasWaterSurface(planet)

    // Then
    expect(result).toBeFalsy()
  })
})
