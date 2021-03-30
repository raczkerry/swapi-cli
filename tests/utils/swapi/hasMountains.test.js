const { hasMountains } = require('../../../utils/swapi')
const { planetWithWaterAndMountains, planetWithoutMountains } = require('../../../mocks/swapi/planets')

describe('positiveNumberRegex tests', () => {
  it('should return for a planet with mountains', () => {
    // Given
    const planet = planetWithWaterAndMountains

    // When
    const result = hasMountains(planet)

    // Then
    expect(result).toBeTruthy()
  })

  it('should return false for a planet without mountains', () => {
    // Given
    const planet = planetWithoutMountains

    // When
    const result = hasMountains(planet)

    // Then
    expect(result).toBeFalsy()
  })
})
