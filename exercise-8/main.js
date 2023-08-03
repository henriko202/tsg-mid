// Create a function that calculates the final value of an investment based on initial capital,
// interest rate, and investment time (in months). The program must prompt the user for these
// values and display the final value.

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

/**
 * Returns the final value of an investment based on initial capital, interest rate, and investment
 * time.
 * @param {number} initialCapital The initial capital of the investment.
 * @param {number} interestRate The interest rate of the investment (in percentage).
 * @param {number} investmentTime The investment time of the investment (in months).
 * @returns {number} The final value of the investment.
 * @example
 * getFinalValue(1000, 10, 1) // 1100
 */
function getFinalValue(initialCapital, interestRate, investmentTime) {
  return (initialCapital * (1 + interestRate / 100) ** investmentTime).toFixed(2)
}

/**
 * Checks if the input is valid, i.e., if it is a number and if it is not negative.
 * @param {string} input The input to check.
 * @returns {boolean} Whether the input is valid or not.
 */
function checkInput(input) {
  if (isNaN(input) || input === '' || input < 0) {
    return false
  }

  return true
}

const readLineInterface = readline.createInterface({ input, output })

async function main() {
  let initialCapital = NaN
  let interestRate = NaN
  let investmentTime = NaN

  while (checkInput(initialCapital) === false) {
    initialCapital = await readLineInterface.question('Enter the initial capital: U$')

    if (isNaN(initialCapital) || initialCapital === '') {
      console.log('The input is not a number.')
    }

    if (initialCapital < 0) {
      console.log('The initial capital cannot be negative.')
    }
  }

  while (checkInput(interestRate) === false) {
    interestRate = await readLineInterface.question('Enter the interest rate (in percentage): ')

    if (isNaN(interestRate) || interestRate === '') {
      console.log('The input is not a number.')
    }

    if (interestRate < 0) {
      console.log('The interest rate cannot be negative.')
    }
  }

  while (checkInput(investmentTime) === false) {
    investmentTime = await readLineInterface.question('Enter the investment time (in months): ')

    if (isNaN(investmentTime) || investmentTime === '') {
      console.log('The input is not a number.')
    }

    if (investmentTime < 0) {
      console.log('The investment time cannot be negative.')
    }
  }

  console.log(`The final value is U$${getFinalValue(initialCapital, interestRate, investmentTime)}.`)
}

// We want to always close the interface, even if an error occurs.
main().finally(() => readLineInterface.close())
