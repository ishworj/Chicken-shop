
// Function to fetch and display food items
async function fetchAndDisplayFood() {
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
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", fetchAndDisplayFood);
