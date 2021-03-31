const { MiscellaneousFilters, Terrains } = require('./enums')
const { sumOfDiameter } = require('./utils')
const { positiveNumberRegex } = require('./utils/regexes')
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
      message: 'Select the terrains properties you want to apply',
      name: 'terrains',
      choices: Object.values(Terrains),
      validate: () => true
    },
    {
      type: 'checkbox',
      message: 'Select the miscellaneous properties you want to apply',
      name: 'miscellaneous',
      choices: Object.values(MiscellaneousFilters),
      validate: () => true
    }
  ])

  if (!answers || !answers.terrains || !answers.miscellaneous) {
    console.log(chalk.red('Something bad happened with the inquired module'))

    process.exit(1)
  }

  const totalDiameter = await sumOfDiameter(filmId, {
    terrains: answers.terrains,
    miscellaneous: answers.miscellaneous
  })
  if (totalDiameter === undefined) process.exit(1)

  console.log(
    totalDiameter === 0
      ? 'There are no planets corresponding to all these criteria'
      : `Total diameter: ${totalDiameter}`
  )
}

cli(filmId)
