const { Filters } = require('./enums')
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

  const totalDiameter = await sumOfDiameter(filmId, answers.filters)

  console.log(`Total diameter: ${totalDiameter}`)
}

cli(filmId)
