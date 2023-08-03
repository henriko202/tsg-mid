// Create a program that takes a student's grades in three different subjects and calculates the
// average of the grades. Then display the calculated average.
// The grades are in the table below
//   Letter Grade   Percentage  GPA
//   A    	        90–100%	    4.0
//   B    	        80–89%	    3.0
//   C    	        70–79%	    2.0
//   D    	        60–69%	    1.0
//   F    	        0–59%	      0.0
// Available from https://en.wikipedia.org/wiki/Academic_grading_in_the_United_States

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const NUMBER_OF_SUBJECTS = 3

/**
 * Returns the ordinal of a number.
 * @param {number} number The number to get the ordinal of.
 * @returns {string} The ordinal of the number.
 * @example
 * getOrdinal(1) // '1st'
 * getOrdinal(2) // '2nd'
 * getOrdinal(11) // '11th'
 */
function getOrdinal(number) {
  const ordinal = ['st', 'nd', 'rd']
  const specialCases = [11, 12, 13]

  if (specialCases.includes(number)) {
    return `${number}th`
  }

  const lastDigit = number % 10
  const lastTwoDigits = number % 100

  if (lastDigit <= 3 && lastTwoDigits !== 11 && lastTwoDigits !== 12 && lastTwoDigits !== 13) {
    return `${number}${ordinal[lastDigit - 1]}`
  }

  return `${number}th`
}

/**
 * Returns the letter grade of a given average.
 * @param {number} average The average of the grades.
 * @returns {string} The letter grade of the average.
 * @example
 * getLetterGrade(97) // 'A'
 * A -> average from 90 to 100
 * B -> average from 80 to 89
 * C -> average from 70 to 79
 * D -> average from 60 to 69
 * F -> average from 0 to 59
 */
function getLetterGrade(average) {
  const gradeRanges = {
    A: [90, 100],
    B: [80, 89],
    C: [70, 79],
    D: [60, 69],
    F: [0, 59],
  }

  for (const [grade, range] of Object.entries(gradeRanges)) {
    average = Math.ceil(average)
    if (average >= range[0] && average <= range[1]) {
      return grade
    }
  }

  return 'Invalid grade'
}

/**
 * Returns the gpa of a given letter grade.
 * @param {string} letterGrade The letter grade to get the gpa of.
 * @returns {number} The gpa of the letter grade.
 * @example
 * getGPA('A') // 4
 * A -> 4.0
 * B -> 3.0
 * C -> 2.0
 * D -> 1.0
 * F -> 0.0
 */
function getGPA(letterGrade) {
  const gradeRanges = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  }

  return gradeRanges[letterGrade]
}

/**
 * Checks if the input is valid, i.e., if it is a number and if it is not empty.
 * @param {string} inputGrade The input to check.
 * @returns {boolean} Whether the input is valid or not.
 */
function checkInput(inputGrade) {
  return isNaN(inputGrade) || inputGrade === ''
}
const readLineInterface = readline.createInterface({ input, output })

async function main() {
  /**
   * @type {Object.<string, { grades: number[], average: number, grade: string, gpa: number }>}
   * @property {number[]} grades The grades of the subject.
   * @property {number} average The average of the grades.
   * @property {string} grade The letter grade of the average.
   * @property {number} gpa The gpa of the average.
   * @example
   * {
   *  '1st subject': {
   *   grades: [90, 80, 70],
   *   average: 80,
   *   grade: 'B-',
   *   gpa: 3,
   *  }
   * }
   */
  const subjects = {}
  for (let i = 1; i <= NUMBER_OF_SUBJECTS; i++) {
    subjects[`${getOrdinal(i)} subject`] = {
      grades: [],
      average: NaN,
      grade: '',
      gpa: NaN,
    }
  }

  for (const [subject, { grades }] of Object.entries(subjects)) {
    for (let i = 1; i <= NUMBER_OF_SUBJECTS; i++) {
      let inputGrade = NaN

      while (checkInput(inputGrade)) {
        inputGrade = await readLineInterface.question(`Enter the ${getOrdinal(i)} grade of the ${subject}: `)

        if (checkInput(inputGrade)) {
          console.log('The input is not a number.')
        }

        if (inputGrade < 0 || inputGrade > 100) {
          console.log('The input is not a valid grade, it should be between 0 and 100.')
          inputGrade = NaN
        }
      }

      grades.push(Number(inputGrade).toFixed(2) * 1)
    }

    const average = Number((grades.reduce((a, b) => a + b) / grades.length).toFixed(2))
    const grade = getLetterGrade(average)
    const gpa = getGPA(grade)

    subjects[subject].average = average
    subjects[subject].grade = grade
    subjects[subject].gpa = gpa
  }

  let gpaAverage = 0
  for (const [subject, { average, grade, gpa }] of Object.entries(subjects)) {
    console.log(`The average of the ${subject} is ${average}, the grade is ${grade}, and the GPA is ${gpa}.`)
    gpaAverage += gpa
  }

  gpaAverage = (gpaAverage / NUMBER_OF_SUBJECTS).toFixed(2) * 1
  console.log(`The average GPA is ${gpaAverage}.`)
}

// We want to always close the interface, even if an error occurs.
main().finally(() => readLineInterface.close())
