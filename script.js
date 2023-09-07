const searchResults= document.getElementById("searchresults");
const showMoreButton= document.getElementById("more-button");
const form= document.querySelector("form")
const searchInput= document.getElementById("input")

let inputData = ""
let page = 1;

async function searchImages() {
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=vWrPU-oau7m0tkX1Kw249Y0zIWE4ZHobwdbtSFpEWoA`;
  const response = await fetch(url)
  const data = await response.json();
  if (page === 1) {
    searchResults.innerHTML = "";
  }
  const results = data.results

  results.map((result) => {
    const imagecontainer= document.createElement("div")
    imagecontainer.classList.add("search-result")
    const image = document.createElement("img")
    const imageLink = document.createElement("a");
    image.src = result.urls.small
    image.alt = result.alt_description
    imageLink.textContent = result.alt_description;
    imagecontainer.appendChild(image)
    imagecontainer.appendChild(imageLink)
    searchResults.appendChild(imagecontainer)
  });
  page++;

  if (page > 1) {
    showMoreButton.style.display = "block"
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
})
showMoreButton.addEventListener("click", () => {
  searchImages();
});
