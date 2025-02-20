// declare an array used to store the postings and the text input
let mySavedPostings = []
const inputEl = document.getElementById("input-el")
const buttonInput = document.getElementById("input-button")
const tabInput = document.getElementById("tab-button")
const clearInput = document.getElementById("clear-button")
const postingsList = document.getElementById("postings-list")

let localPostings = JSON.parse(localStorage.getItem("savedPostings"))

if (localPostings) {
  mySavedPostings = localPostings
  render(mySavedPostings)
}

// add the posting to the array to save it
buttonInput.addEventListener("click", function() {
  mySavedPostings.push(inputEl.value)
  inputEl.value = ""

  // declare local storage to save input data across extension
  localStorage.setItem("savedPostings", JSON.stringify(mySavedPostings))
  render(mySavedPostings)
})

// save the url of the current tab and add it to the list
tabInput.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError)
    }
    if (!tabs || tabs.length === 0) {
      console.error("No active tab found.");
      return;
    }
    
    mySavedPostings.push(tabs[0].url)
    localStorage.setItem("savedPostings", JSON.stringify(mySavedPostings))
    render(mySavedPostings)
  })
})

clearInput.addEventListener("dblclick", function() {
  mySavedPostings = []
  localStorage.clear()
  render(mySavedPostings)
})

// display the list of postings
function render(savedPostings) {
  let postings = ""
  for (const posting of savedPostings) {
    postings += `
      <li>
        <a target='_blank' href='${posting}'>${posting}</a>
      </li>`
  }
  postingsList.innerHTML = postings
}