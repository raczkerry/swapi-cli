const boxen = require('boxen')
const chalk = require('chalk')

exports.header = () => {
  console.log(
    boxen(
      `                STAR WARS
    Sum of planet diameters calculator !!!`,
      { padding: 1, margin: 1, borderStyle: 'double' }
    )
  )
  console.log(
    chalk.yellow(
      'This great CLI allows you to compute the total diameter of all planets from a specific film and matching divers criteria'
    )
  )
  console.log()
}
