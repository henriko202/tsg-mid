// Create a function that counts the number of vowels in a string. The program should ask the
// user for a sentence and display how many vowels it has.

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const readLineInterface = readline.createInterface({ input, output })

function countVowels(sentence) {
  const vowelsArray = ['a', 'e', 'i', 'o', 'u']

  const vowels = sentence.split('').reduce((acc, letter) => {
    if (vowelsArray.includes(letter.toLowerCase())) {
      acc++
    }
    return acc
  }, 0)

  return vowels
}

async function main() {
  const inputSentence = await readLineInterface.question('Enter a sentence: ')
  console.log(`The sentence has ${countVowels(inputSentence)} vowels.`)
}

// We want to always close the interface, even if an error occurs.
main().finally(() => readLineInterface.close())
