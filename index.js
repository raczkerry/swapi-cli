const { positiveNumberRegex } = require('./utils/regexes')

const filmNumber = process.argv[2]

if (!positiveNumberRegex.test(filmNumber)) {
  console.log('The first argument must be a whole number greater than 0')

  process.exit(1)
}

console.log('OK')
