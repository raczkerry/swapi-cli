const { Filters } = require('./enums')
const { hasMountains, hasWaterSurface } = require('./utils/swapi')
const { positiveNumberRegex } = require('./utils/regexes')
const API = require('./api')
const chalk = require('chalk')
const inquirer = require('inquirer')

const filmId = process.argv[2]

if (!positiveNumberRegex.test(filmId)) {
  console.log(chalk.red('The first argument must be a whole number greater than 0'))

  process.exit(1)
}

const cli = async filmId => {
  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select the filters you want to apply',
      name: 'filters',
      choices: Object.values(Filters),
      validate: () => true
    }
  ])

  if (!answers && !answers.filters) {
    console.log(chalk.red('Something bad happened with the inquired module'))

    process.exit(1)
  }

  sumOfDiameter(filmId, answers.filters)
}

cli(filmId)

const sumOfDiameter = async (filmId, filters) => {
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
    (sum, planet) =>
      (filters.includes(Filters.mountains) ? hasMountains(planet) : true) &&
      (filters.includes(Filters.water) ? hasWaterSurface(planet) : true)
        ? sum + Number(planet.diameter)
        : sum,
    0
  )

  console.log(`Total diameter: ${sumOfDiameter}`)
}
