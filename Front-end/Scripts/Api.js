
// Function to fetch and display food items
async function fetchAndDisplayFood() {
//localStorage.clear();
    try {
        const response = await fetch("http://localhost:8080/api/food"); // Adjust the URL if needed
        const foodItems = await response.json();
        displayFoodItems(foodItems);
    } catch (error) {
        console.error("Error fetching food items:", error);
    }
}

// Function to dynamically display food items in HTML
function displayFoodItems(foodItems) {
    const foodContainer = document.getElementById("Food"); // Get the #Food container

    foodItems.forEach((item) => {
        // Create a new div element for each food item
        const foodDiv = document.createElement("div");
        foodDiv.classList.add("hotFoodItem");

        // Set inner HTML for the food item with the specified structure
        foodDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p><b><strong>${item.name}</strong></b></p>
            <p>${item.description}</p>
            <p>${item.price}</p>
        `;

        // Append the new div to the food container with category wise like hotfood or drinks or specials
        let specificChild;
        switch (item.category) {
            case "hotFood":
                specificChild = document.getElementById("Combosid"); 
                foodContainer.insertBefore(foodDiv, specificChild);
                break;
            case "combos":
                specificChild = document.getElementById("chickenid"); 
                foodContainer.insertBefore(foodDiv, specificChild);
                break
            case "freshchicken":
                specificChild = document.getElementById("drinksid"); 
                foodContainer.insertBefore(foodDiv, specificChild);
                break
            case "Drinks":
                foodContainer.appendChild(foodDiv);
                break
            default:
                console.log("category didnt match")
                break;
        
        

    }});

    foodContainer.addEventListener("click", function(event) {
        if (event.target.closest(".hotFoodItem")) {
            const foodDiv = event.target.closest(".hotFoodItem");
            const item = {
                image: foodDiv.querySelector("img").src,
                name: foodDiv.querySelector("strong").textContent,
                description: foodDiv.querySelector("p:nth-of-type(2)").textContent,
                price: foodDiv.querySelector("p:nth-of-type(3)").textContent
            };
            displaySelectedItem(item);
        }
    });
    
    
}


function displaySelectedItem(item) {
    const viewItemDiv = document.querySelector(".viewitem");
    const selectedItemImg = document.querySelector("#selecteditem #a img");
    const selectedItemName = document.querySelector("#selecteditem #b p strong");
    const selectedItemDesc = document.querySelector("#selecteditem #b p:nth-of-type(2)");
    const selectedItemPrice = document.querySelector("#selecteditem #b p:nth-of-type(3)");
    const selectedItemCost = document.getElementById("cost")

    

    // Update the view item div with the clicked item's details
    selectedItemImg.src = item.image;
    selectedItemImg.alt = item.name;
    selectedItemName.textContent = item.name;
    selectedItemDesc.textContent = item.description;
    selectedItemPrice.textContent = item.price;

  
    let match = item.price.match(/\$(\d+(\.\d+)?)/);
 selectedItemCost.textContent = match[1];  
        

    // Show the .viewitem div
    viewItemDiv.style.visibility = "visible";
    document.querySelector("#quantityDisplay").textContent="1";
}


document.querySelector("#e #goback").addEventListener("click", ()=> {
        const viewItemDiv = document.querySelector(".viewitem");
        viewItemDiv.style.visibility= "hidden";
         document.querySelector("#quantityDisplay").textContent="1";
        
    } );


    document.querySelector("#minusicon").addEventListener("click", () => {
        const quantityDisplay = document.querySelector("#quantityDisplay");
        const costtext = document.getElementById("cost");
        let quantity = parseInt(quantityDisplay.textContent, 10);
    
        // Extract price as a float number
        const selectedItemPrice = document.querySelector("#selecteditem #b p:nth-of-type(3)");
        let initialPrice = parseFloat(selectedItemPrice.textContent.match(/\$(\d+(\.\d+)?)/)[1]);
    
        // Decrement quantity and update display and cost
        if (quantity > 1) { // Adjust limit as needed (1 or 0)
            quantity -= 1;
            quantityDisplay.textContent = quantity;
    
            let costvalue = parseFloat(costtext.textContent);
            costtext.textContent = (costvalue - initialPrice).toFixed(2); // Update cost display
        }
    });
    

document.querySelector("#plusicon").addEventListener("click", () => {
    const quantityDisplay = document.querySelector("#quantityDisplay");
    const costtext = document.getElementById("cost");
    let quantity = parseInt(quantityDisplay.textContent, 10);

    // Extract price as a float number
    const selectedItemPrice = document.querySelector("#selecteditem #b p:nth-of-type(3)");
    let initialPrice = parseFloat(selectedItemPrice.textContent.match(/\$(\d+(\.\d+)?)/)[1]);

    // Increment quantity and update display and cost
    if (quantity >= 1) {
        quantity += 1;
        quantityDisplay.textContent = quantity;

        let costvalue = parseFloat(costtext.textContent);
        costtext.textContent = (costvalue + initialPrice).toFixed(2); // Update cost display
    }
});


const addToCart = document.querySelector("#addToCart");

addToCart.addEventListener("click", () => {
    const selecteditem = document.querySelector(".viewitem");
    const selectedItemPrice = document.querySelector("#selecteditem #b p:nth-of-type(3)");
    let initialP = parseFloat(selectedItemPrice.textContent.match(/\$(\d+(\.\d+)?)/)[1]);
    const item = {
        image: selecteditem.querySelector("#a img").src,
        name: selecteditem.querySelector("p strong").textContent,
        description: selecteditem.querySelector("p:nth-of-type(2)").textContent,
        price: selecteditem.querySelector("#d #cost").textContent,
        quantity: selecteditem.querySelector("#c #quantityDisplay").textContent,
        initialPrice: initialP
    };

    // Retrieve the current cart items from localStorage, or initialize as an empty array
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);

    if (existingItemIndex !== -1) {
        // If item exists, increase the quantity
        // If item exists, increase the quantity and update the price as float
cartItems[existingItemIndex].price = parseFloat(cartItems[existingItemIndex].price) + parseFloat(item.price);
cartItems[existingItemIndex].quantity = parseInt(cartItems[existingItemIndex].quantity)+ parseInt(item.quantity);

    } else {
        // If item does not exist, add it to the cart
        cartItems.push(item);
    }

    // Save the updated cart array back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    console.log("Item added to cart:", item);

    // Display an alert message when the item is added to the cart
    alert(`${item.name} added to cart!`); 
});




// Call the function on page load
document.addEventListener("DOMContentLoaded", fetchAndDisplayFood);





