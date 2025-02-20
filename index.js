// declare an array used to store the postings and the text input
let mySavedPostings = []
const inputEl = document.getElementById("input-el")
const tabInput = document.getElementById("tab-button")
const doneInput = document.getElementById("done-button")
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

// clears the job postings that have already been checked off
doneInput.addEventListener("click", function() {
  const checkboxes = document.getElementsByName('post')
  for(let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      mySavedPostings.splice(i, 1)
    } 
  }

  localStorage.setItem("savedPostings", JSON.stringify(mySavedPostings))
  render(mySavedPostings)
})

// clears the entire list when the button is double-clicked
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
      <div>
        <input type='checkbox' name='post' id='${posting[1]}'>
        <label for='${posting[1]}'>
          <a target='_blank' href='${posting[1]}'>
            ${posting[0]}
          </a>
        </label>
      </div>
      `
  }
  postingsList.innerHTML = postings
}