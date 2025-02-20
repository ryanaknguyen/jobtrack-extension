// declare an array used to store the postings and the text input
let mySavedPostings = []
const inputEl = document.getElementById("input-el")
const buttonInput = document.getElementById("input-button")
const postingsList = document.getElementById("postings-list")

let localPostings = JSON.parse(localStorage.getItem("savedPostings"))

if (localPostings) {
  mySavedPostings = localPostings
  renderPostings()
}

// add the posting to the array to save it
buttonInput.addEventListener("click", function() {
  mySavedPostings.push(inputEl.value)
  inputEl.value = ""

  // declare local storage to save input data across extension
  localStorage.setItem("savedPostings", JSON.stringify(mySavedPostings))
  renderPostings()
})

// display the list of postings
function renderPostings() {
  let postings = ""
  for (const posting of mySavedPostings) {
    postings += `
      <li>
        <a target='_blank' href='${posting}'>${posting}</a>
      </li>`
  }
  postingsList.innerHTML = postings
}