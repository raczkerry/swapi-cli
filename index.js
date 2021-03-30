const { positiveNumberRegex } = require('./utils/regexes')
const { hasMountains, hasWaterSurface } = require('./utils/swapi')
const API = require('./api')

const filmId = process.argv[2]

if (!positiveNumberRegex.test(filmId)) {
  console.log('The first argument must be a whole number greater than 0')

  process.exit(1)
}

const sumOfDiameter = async filmId => {
  const film = await API.Swapi.getFilm(filmId)
  if (!film) {
    console.log('An error occured while retreiving the film informations')
    console.log('Please ensure that the film id is correct')

    process.exit(1)
  }

  const planets = await Promise.all(film.planets.map(planetUrl => API.Swapi.getPlanet(planetUrl)))
  if (!planets.some(planet => !planet)) {
    console.log('An error occured while retreiving the planets informations')
    console.log('This could be a problem with the swapi API, try later')

    process.exit(1)
  }

  const sumOfDiameter = planets.reduce(
    (sum, planet) => (hasMountains(planet) && hasWaterSurface(planet) ? sum + Number(planet.diameter) : sum),
    0
  )

  console.log(`Total diameter: ${sumOfDiameter}`)
}

sumOfDiameter(filmId)
