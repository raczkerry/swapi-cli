const { hasTerrains } = require('../../../utils/swapi')
const { planetWithWaterAndMountains, planetWithoutMountains } = require('../../../mocks/swapi/planets')
const { Terrains } = require('../../../enums')

describe('positiveNumberRegex tests', () => {
  it('should return for a planet with mountains', () => {
    // Given
    const planet = planetWithWaterAndMountains

    // When
    const result = hasTerrains(planet, [Terrains.mountains])

    // Then
    expect(result).toBeTruthy()
  })

  it('should return false for a planet without mountains', () => {
    // Given
    const planet = planetWithoutMountains

    // When
    const result = hasTerrains(planet, [Terrains.mountains])

    // Then
    expect(result).toBeFalsy()
  })

  it("should return false for a planet that doesn't have a terrain property", () => {
    // Given
    const planet = { ...planetWithoutMountains, terrain: undefined }

    // When
    const result = hasTerrains(planet)

    // Then
    expect(result).toBeFalsy()
  })

  it('should return false if we dont pass an array as second argument', () => {
    // Given
    const planet = planetWithWaterAndMountains

    // When
    const result = hasTerrains(planet, Terrains.mountains)

    // Then
    expect(result).toBeFalsy()
  })
})
