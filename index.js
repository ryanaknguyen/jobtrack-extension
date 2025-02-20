// declare an array used to store the postings and the text input
let mySavedPostings = []
const inputEl = document.getElementById("input-el")
const tabInput = document.getElementById("tab-button")
const clearInput = document.getElementById("clear-button")
const postingsList = document.getElementById("postings-list")

let localPostings = JSON.parse(localStorage.getItem("savedPostings"))

if (localPostings) {
  mySavedPostings = localPostings
  render(mySavedPostings)
}

// save the url of the current tab and the text box entry, adding it to the list
tabInput.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError)
    }
    if (!tabs || tabs.length === 0) {
      console.error("No active tab found.");
      return;
    }
    
    mySavedPostings.push([inputEl.value, tabs[0].url])
    inputEl.value = ""
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
        <a target='_blank' href='${posting[1]}'>${posting[0]}</a>
      </li>`
  }
  postingsList.innerHTML = postings
}