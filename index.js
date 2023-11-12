let searchBox = document.getElementById("search-box")
let searchBar = document.getElementById("search-bar")
let showMore  = document.getElementById("show-more")
let showResult= document.getElementById("result")
let final = document.getElementById("resultbutton")

const accessKey = "13h_XWtBSTbkEzhFMOwdxOXg6iXx7PlmRoyvovmrir0";

let keyword = ""
let pages = 1 

async function searchImages(){
    
    keyword = searchBar.value
    const url = `https://api.unsplash.com/search/photos?page=${pages}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    
    try{
        let response = await fetch(url);
        let data = await response.json();

    if(pages == 1)
    {
        showResult.innerHTML = ""
    }

    let results = data.results
    results.map((result) => {
        let image = document.createElement("img") 
        image.src = result.urls.small;
        let imageLink = document.createElement("a")
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        
        image.classList.add("w-full")
        image.classList.add("h-60")
        image.classList.add("object-cover")
        image.classList.add("rounded-lg")
        
        imageLink.appendChild(image);
        showResult.appendChild(imageLink)
    
    })
    showMore.style.display = "block"
        

}catch(error){
    showResult.innerHTML="There is something Wrong !"
    showResult.classList.add("text-lg")
    showResult.classList.add("mx-auto")
    console.log(error);
}
}


let typed;
// Function to start a Typed.js animation
function startTypedAnimation() {
    const searchValue = searchBar.value + " !"; // Add an exclamation mark to the search term

    // Clear any existing Typed.js instance
    if (typed) {
        typed.destroy();
    }
    
    // Initialize Typed.js with the current search term
    typed = new Typed('#element', {
    strings: [searchValue],
    typeSpeed: 10,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
  });

}

// Add an event listener to the search button
searchBox.addEventListener("click", () => {
    // Create a new span element
    const spanElement = document.createElement("span");
    spanElement.id = "element";
    
    // Append the span element to the document
    final.appendChild(spanElement);
    // Declare a variable to hold the Typed.js instance
    startTypedAnimation();
    
    
    pages = 1; // Reset the page for the new search
    searchImages()  
});


 
showMore.addEventListener("click", () => {
    pages++;
    searchImages()
})
