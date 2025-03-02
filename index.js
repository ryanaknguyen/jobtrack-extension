// declare an array used to store the postings and the text input
let mySavedPostings = []
const inputEl = document.getElementById("input-el")
const tabInput = document.getElementById("tab-button")
const doneInput = document.getElementById("done-button")
const clearInput = document.getElementById("clear-button")
const postingsList = document.getElementById("postings-list")
const applicationCounter = document.getElementById("application-counter")
const date = new Date()

let localPostings = JSON.parse(localStorage.getItem("savedPostings"))
let localDate = JSON.parse(localStorage.getItem("savedDate"))
let dailyCompletedApps = JSON.parse(localStorage.getItem("dailyCompletedApps"))

// if there are any saved postings in local storage, fetch those ones
if (localPostings) {
  mySavedPostings = localPostings
  render(mySavedPostings)
}

// fetch the date of the last time JobTrack has been opened and reset daily value if date is different
if (localDate) {
  const currentDay = date.getDate()
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()

  const savedDate = new Date(localDate)
  const savedDay = savedDate.getDate()
  const savedMonth = savedDate.getMonth()
  const savedYear = savedDate.getFullYear()

  if (currentDay != savedDay || currentMonth != savedMonth || currentYear != savedYear) {
    localStorage.setItem("dailyCompletedApps", JSON.stringify(0))
  }
  render(mySavedPostings)
}

localStorage.setItem("savedDate", JSON.stringify(date))

// save the url of the current tab and the text box entry, adding it to the list
tabInput.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError)
    }
    if (!tabs || tabs.length === 0) {
      console.error("No active tab found.")
      return
    }
    if (inputEl.value.length == 0) {
      alert("The text field is empty. Please try again.")
      return
    }
    
    mySavedPostings.push([inputEl.value, tabs[0].url])
    inputEl.value = ""
    localStorage.setItem("savedPostings", JSON.stringify(mySavedPostings))
    render(mySavedPostings)
  })
})

// clears the job postings that have already been checked off
doneInput.addEventListener("click", function() {
  const checkboxes = document.getElementsByName('post')
  let checkedCount = 0
  for(let i = checkboxes.length - 1; i > 0; i--) {
    if (checkboxes[i].checked) {
      mySavedPostings.splice(i, 1)
      checkedCount++
    } 
  }

  if (checkedCount == 0) {
    alert ("Please check finished applications before clicking DONE.")
  }

  const count = JSON.parse(localStorage.getItem("dailyCompletedApps"))
  localStorage.setItem("dailyCompletedApps", JSON.stringify(count + checkedCount))
  localStorage.setItem("savedPostings", JSON.stringify(mySavedPostings))
  render(mySavedPostings)
})

// clears the entire list when the button is double-clicked
clearInput.addEventListener("dblclick", function() {
  clearInput.innerHTML = `CLEAR ALL`
  mySavedPostings = []
  localStorage.removeItem("savedPostings")
  render(mySavedPostings)
})

clearInput.addEventListener("click", function() {
  clearInput.innerHTML = `DOUBLE CLICK`
  setTimeout(function() {
    clearInput.innerHTML = `CLEAR ALL`
  }, 1000)
})

// display the list of postings
function render(savedPostings) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError)
    }
    if (!tabs || tabs.length === 0) {
      console.error("No active tab found.")
      return
    }

    let currentSite = tabs[0].url

    let postings = ""
    for (const posting of savedPostings) {
      if (posting[1] == currentSite) {
        postings += `
        <div class='posting'>
          <input type='checkbox' name='post' id='${posting[1]}' class='complete'>
          <label for='${posting[1]}'>
            <a target='_blank' href='${posting[1]}'>
              <strong>${posting[0]} (currently viewing)</strong>
            </a>
          </label>
        </div>
        `
      } else {
        postings += `
        <div class='posting'>
          <input type='checkbox' name='post' id='${posting[1]}' class='complete'>
          <label for='${posting[1]}'>
            <a target='_blank' href='${posting[1]}'>
              ${posting[0]}
            </a>
          </label>
        </div>
        `
      }
    }
    postingsList.innerHTML = postings
  })

  const count = JSON.parse(localStorage.getItem("dailyCompletedApps"))

  // if there are completed apps today, get that number and set it
  if (count >= 0) {
    if (count == 0) {
      applicationCounter.innerHTML = `
        <p class='counter-text'>You completed ${count} applications today.</p>
      `
    } else if (count == 1) {
      applicationCounter.innerHTML = `
        <p class='counter-text'>You completed ${count} application today!</p>
      `
    } else {
      applicationCounter.innerHTML = `
        <p class='counter-text'>You completed ${count} applications today!</p>
      `
    }
  } else {
    localStorage.setItem("dailyCompletedApps", JSON.stringify(0))
  }
}