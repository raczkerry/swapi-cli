const hasMountains = planet => planet.terrain.split(', ').includes('mountains')

const hasWaterSurface = planet => Number(planet.surface_water) !== NaN && planet.surface_water > 0

module.exports = { hasMountains, hasWaterSurface }