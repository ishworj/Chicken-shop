document.getElementById("search-button").addEventListener("click", function() {
    const searchInput = document.getElementById("search-input").value;

    // Simulating a search result with an image
    let searchResultImage = "./Images/sample-product.jpg";  // Replace with actual search result image path

    // Displaying the image in the search result area
    document.getElementById("search-result").innerHTML = `<img src="${searchResultImage}" alt="Search Result">`;
});
