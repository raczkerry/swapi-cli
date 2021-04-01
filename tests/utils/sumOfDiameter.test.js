const { film6 } = require('../../mocks/swapi/films')
const { planetWithWaterAndMountains } = require('../../mocks/swapi/planets')
const { MiscellaneousFilters, Terrains } = require('../../enums')
const { sumOfDiameter } = require('../../utils')
const API = require('../../api')

// MOCKS
const getFilmMock = jest.spyOn(API.Swapi, 'getFilm')
getFilmMock.mockImplementation(() => film6)

const getPlanetMock = jest.spyOn(API.Swapi, 'getPlanet')
getPlanetMock.mockImplementation(() => planetWithWaterAndMountains)

describe('positiveNumberRegex tests', () => {
  // Given
  const filmId = 6
  const filters = {
    terrains: [Terrains.mountains],
    miscellaneous: [MiscellaneousFilters.surface_water]
  }
  const numberOfPlanetsInFilm6 = film6.planets.length

  it('should the sum of all matching planets diameter', async () => {
    // When
    const result = await sumOfDiameter(filmId, filters)

    // Then
    expect(result).toEqual(numberOfPlanetsInFilm6 * planetWithWaterAndMountains.diameter)
  })

  it('should have called the getFilm function once', async () => {
    expect(getFilmMock).toHaveBeenCalledTimes(1)
  })

  it('should have called the getPlanet function for every planets', async () => {
    expect(getPlanetMock).toHaveBeenCalledTimes(numberOfPlanetsInFilm6)
  })
})
