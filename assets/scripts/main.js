const btnSubmit = document.getElementById('btn-submit')
/* Inputs */
const dayInput = document.getElementById('day-input')
const monthInput = document.getElementById('month-input')
const yearInput = document.getElementById('year-input')
/* Outputs */
const dayOutput = document.getElementById('day-output')
const monthOutput = document.getElementById('month-output')
const yearOutput = document.getElementById('year-output')
/* Errors */
const errorList = document.getElementsByClassName('error-message')

dayInput.addEventListener('focusout', () => {
  validateDay(parseInt(dayInput.value))
})

monthInput.addEventListener('focusout', () => {
  validateMonth(parseInt(monthInput.value))
})

yearInput.addEventListener('focusout', () => {
  validateYear(parseInt(yearInput.value))
})

btnSubmit.addEventListener('click', displayInput)

function highlightFields(state) {
  const fields = [dayInput, monthInput, yearInput]
  for (const input of fields) {
    if (state === true) {
      input.style.borderColor = 'var(--color-light-red)'
    } else {
      input.style.borderColor = 'var(--color-lightgray)'
    }
  }
}

function highlightFieldById(id, state) {
  if (state === true) {
    id.style.borderColor = 'var(--color-light-red)'
  } else {
    id.style.borderColor = 'var(--color-lightgray)'
  }
}

function displayError(id, state) {
  for (const e of errorList) {
    if (e.id === id) {
      if (state === true) {
        e.style.display = 'block'
      } else {
        e.style.display = 'none'
      }
      break
    }
  }
}

function clearErrors() {
  for (const e of errorList) {
    e.style.display = 'none'
  }
}

function calculateDifference(date) {
  const currentDate = new Date()
  const difference = currentDate - date

  const day = new Date(difference).getDate() - new Date(0).getDate()
  const month = new Date(difference).getMonth() - new Date(0).getMonth()
  const year = new Date(difference).getFullYear() - new Date(0).getFullYear()

  const result = {
    day: day,
    month: month,
    year: year,
  }

  return result
}

function displayDifference(date) {
  dayOutput.textContent = `${date.day}`
  monthOutput.textContent = `${date.month}`
  yearOutput.textContent = `${date.year}`
}

function validateDay(dd) {
  if (dd > 31 || dd < 1) {
    displayError('error-day', true)
    highlightFieldById(dayInput, true)
    return false
  } else {
    displayError('error-day', false)
    highlightFieldById(dayInput, false)
    return true
  }
}

function validateMonth(mm) {
  if (mm > 12 || mm < 1) {
    displayError('error-month', true)
    highlightFieldById(monthInput, true)
    return false
  } else {
    displayError('error-month', false)
    highlightFieldById(monthInput, false)
    return true
  }
}

function validateYear(yyyy) {
  if (yyyy > new Date().getFullYear() || yyyy < 1) {
    displayError('error-year', true)
    highlightFieldById(yearInput, true)
    return false
  } else {
    displayError('error-year', false)
    highlightFieldById(yearInput, false)
    return true
  }
}

function validateInput(dd, mm, yyyy) {
  return validateDay(dd) && validateMonth(mm) && validateYear(yyyy)
}

function validateDate(date, day, month) {
  if (
    parseInt(date.getDate()) === day ||
    parseInt(date.getMonth()) === month - 1
  ) {
    displayError('error-generic', false)
    highlightFields(false)
    return true
  } else {
    displayError('error-generic', true)
    highlightFields(true)
    return false
  }
}

function displayInput() {
  const day = parseInt(dayInput.value)
  const month = parseInt(monthInput.value)
  const year = parseInt(yearInput.value)

  if (validateInput(day, month, year)) {
    const selectedDate = new Date(year, month - 1, day)
    if (validateDate(selectedDate, day, month)) {
      clearErrors()
      let difference = calculateDifference(selectedDate)
      displayDifference(difference)
    }
  }
}
