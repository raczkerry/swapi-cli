const axios = require('axios')

const SWAPI = 'https://swapi.dev/api'

const getFilm = async filmId => {
  try {
    const { data } = await axios.get(`${SWAPI}/films/${filmId}`)

    return data
  } catch (error) {
    return null
  }
}

const getPlanet = async planetUrl => {
  try {
    const { data } = await axios.get(planetUrl)

    return data
  } catch (error) {
    return null
  }
}

module.exports = { getFilm, getPlanet }
