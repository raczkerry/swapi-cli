const { positiveNumberRegex } = require('./utils/regexes')
const { hasMountains, hasWaterSurface } = require('./utils/swapi')
const API = require('./api')
const chalk = require('chalk')

const filmId = process.argv[2]

if (!positiveNumberRegex.test(filmId)) {
  console.log(chalk.red('The first argument must be a whole number greater than 0'))

  process.exit(1)
}

const sumOfDiameter = async filmId => {
  const film = await API.Swapi.getFilm(filmId)
  if (!film) {
    console.log(chalk.red('An error occured while retreiving the film information'))
    console.log(chalk.red('Please ensure that the film id is correct'))

    process.exit(1)
  }

  const planets = await Promise.all(film.planets.map(planetUrl => API.Swapi.getPlanet(planetUrl)))
  if (planets.some(planet => !planet)) {
    console.log(chalk.red('An error occured while retreiving the planets information'))
    console.log(chalk.red('This could be a problem with the swapi API, try later'))

    process.exit(1)
  }

  const sumOfDiameter = planets.reduce(
    (sum, planet) => (hasMountains(planet) && hasWaterSurface(planet) ? sum + Number(planet.diameter) : sum),
    0
  )

  console.log(`Total diameter: ${sumOfDiameter}`)
}

sumOfDiameter(filmId)
