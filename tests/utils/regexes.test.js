const { positiveNumberRegex } = require('../../utils/regexes')

describe('positiveNumberRegex tests', () => {
  it('should return true with a number > 0', () => {
    // Given
    const number = 3

    // When
    const result = positiveNumberRegex.test(number)

    // Then
    expect(result).toBeTruthy()
  })

  it('should return false with a number < 0', () => {
    // Given
    const number = -1

    // When
    const result = positiveNumberRegex.test(number)

    // Then
    expect(result).toBeFalsy()
  })

  it('should return false with 0', () => {
    // Given
    const number = 0

    // When
    const result = positiveNumberRegex.test(number)

    // Then
    expect(result).toBeFalsy()
  })

  it('should return true with a string representing a number > 0', () => {
    // Given
    const number = '555'

    // When
    const result = positiveNumberRegex.test(number)

    // Then
    expect(result).toBeTruthy()
  })

  it('should return false witha string representing a number < 0', () => {
    // Given
    const number = '-155'

    // When
    const result = positiveNumberRegex.test(number)

    // Then
    expect(result).toBeFalsy()
  })

  it('should return false with a string representing the number 0', () => {
    // Given
    const number = '0'

    // When
    const result = positiveNumberRegex.test(number)

    // Then
    expect(result).toBeFalsy()
  })

  it('should return false with a string that is not representing a number', () => {
    // Given
    const number = 'abc'

    // When
    const result = positiveNumberRegex.test(number)

    // Then
    expect(result).toBeFalsy()
  })

  it('should return false with NaN', () => {
    // Given
    const number = NaN

    // When
    const result = positiveNumberRegex.test(number)

    // Then
    expect(result).toBeFalsy()
  })
})
