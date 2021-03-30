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

  it("should return false for a planet where the surface_water property === 'unknown'", () => {
    // Given
    const planet = { ...planetWithoutWater, surface_water: 'unknown' }

    // When
    const result = hasWaterSurface(planet)

    // Then
    expect(result).toBeFalsy()
  })

  it("should return false for a planet that doesn't have a surface_water property", () => {
    // Given
    const planet = { ...planetWithoutWater, surface_water: undefined }

    // When
    const result = hasWaterSurface(planet)

    // Then
    expect(result).toBeFalsy()
  })
})
