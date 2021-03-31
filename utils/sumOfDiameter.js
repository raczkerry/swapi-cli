const { Filters } = require('../enums')
const { hasMountains, hasWaterSurface } = require('./swapi')
const API = require('../api')
const chalk = require('chalk')

exports.sumOfDiameter = async (filmId, filters) => {
  const film = await API.Swapi.getFilm(filmId)
  if (!film) {
    console.log(chalk.red('An error occured while retreiving the film information'))
    console.log(chalk.red('Please ensure that the film id is correct'))

    return null
  }

  const planets = await Promise.all(film.planets.map(planetUrl => API.Swapi.getPlanet(planetUrl)))
  if (planets.some(planet => !planet)) {
    console.log(chalk.red('An error occured while retreiving the planets information'))
    console.log(chalk.red('This could be a problem with the swapi API, try later'))

    return null
  }

  const totalDiameter = planets.reduce(
    (sum, planet) =>
      (filters.includes(Filters.mountains) ? hasMountains(planet) : true) &&
      (filters.includes(Filters.water) ? hasWaterSurface(planet) : true)
        ? sum + Number(planet.diameter)
        : sum,
    0
  )

  return totalDiameter
}
