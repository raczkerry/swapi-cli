const { MiscellaneousFilters } = require('../enums')
const { hasTerrains, hasWaterSurface } = require('./swapi')
const API = require('../api')
const chalk = require('chalk')

// The filter property is an object of type { terrains: string[]; miscellaneous: sring[] }
exports.sumOfDiameter = async (filmId, filters) => {
  if (!filmId || !filters || !Array.isArray(filters.terrains) || !Array.isArray(filters.miscellaneous)) return

  const film = await API.Swapi.getFilm(filmId)
  if (!film) {
    console.log(chalk.red('An error occured while retreiving the film information'))
    console.log(chalk.red('Please ensure that the film id is correct and that you internet connection is working'))

    return
  }

  const planets = await Promise.all(film.planets.map(planetUrl => API.Swapi.getPlanet(planetUrl)))
  if (planets.some(planet => !planet)) {
    console.log(chalk.red('An error occured while retreiving the planets information'))
    console.log(chalk.red('This could be a problem with the swapi API, try later'))

    return
  }

  const totalDiameter = planets.reduce(
    (sum, planet) =>
      hasTerrains(planet, filters.terrains) &&
      (filters.miscellaneous.includes(MiscellaneousFilters.surface_water) ? hasWaterSurface(planet) : true)
        ? sum + Number(planet.diameter)
        : sum,
    0
  )

  return totalDiameter
}
