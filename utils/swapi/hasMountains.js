const hasMountains = planet => planet.terrain && planet.terrain.split(', ').includes('mountains')

module.exports = { hasMountains }
