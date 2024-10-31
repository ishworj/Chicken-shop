// Change icon based on input in the search box
function switchIcon() {
    const searchbox = document.getElementById('searchbox');
    const searchicon = document.getElementById('searchicon');
    
    // Check if searchbox has any text
    if (searchbox.value.trim() !== "") {
        // If there is text, set the icon to the "x-mark" image
        searchicon.src = "./Images/order-Online-img/x-mark.png";
    } else {
        // If empty, revert to the default search icon
        searchicon.src = "./Images/order-Online-img/search-icon.png";
    }

    searchicon.addEventListener('click', () => {
        const searchbox = document.getElementById('searchbox');
        searchbox.value = "";
        switchIcon(); 
        searchAndDisplay(searchbox)// Call switchIcon to update the icon back to the default
    });
}

// Real-time search function with feedback
function searchAndDisplay(searchbox) {
    const searchTerm = searchbox.value.toLowerCase();
    const listOfProducts = document.querySelectorAll('.hotFoodItem,.combos');
    let found = false;

    const searchedItemDiv = document.getElementById('searcheditem');
    searchedItemDiv.style.display = 'none';  
    searchedItemDiv.innerHTML = ''; 
    searchedItemDiv.style.display = 'block';

    listOfProducts.forEach(product => {
        const productName = product.querySelector('p').innerText.toLowerCase();

        if (productName.includes(searchTerm)) {
            const imageSrc = product.querySelector('img').src;
            const description = product.querySelectorAll('p')[1].innerText;
            const price = product.querySelectorAll('p')[2].innerText;

            searchedItemDiv.innerHTML = `
                <img src="${imageSrc}" alt="${productName}">
                <p><b><strong>${productName}</strong></b></p>
                <p>${description}</p>
                <p>${price}</p>
            `;
            found = true;
        }
    });

    // If no match was found, update to "Item not found"
    if (!found && searchTerm) {
        searchedItemDiv.innerHTML = "<p>Item not found</p>";
    }

    // Hide the search message if the box is empty
    if (!searchTerm) {
        searchedItemDiv.style.display = 'none';
    }
}

// Add the event listener for real-time search
const searchbox = document.getElementById('searchbox');
searchbox.addEventListener('input', function() {
    searchAndDisplay(searchbox);
    switchIcon()
});



searcheditem.addEventListener(click, ()=>{
    
})



function fooddetails(){

}