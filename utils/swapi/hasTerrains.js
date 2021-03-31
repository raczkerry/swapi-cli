exports.hasTerrains = (planet, terrains) =>
  planet.terrain && Array.isArray(terrains) && terrains.every(terrain => planet.terrain.split(', ').includes(terrain))
