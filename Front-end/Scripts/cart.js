document.addEventListener("DOMContentLoaded", () => {
    loadCartContent();
    updateOrderDetails();
});

function loadCartContent() {
    const itemsContainer = document.querySelector(".items");

    // Clear the container before loading items
    itemsContainer.innerHTML = "";

    // Retrieve the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if there are items in the cart and display them
    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            // Create the main div for each item
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item");

            // Create item image section
            const imgContainer = document.createElement("div");
            imgContainer.id = "cartitemimg";
            const imgElement = document.createElement("img");
            imgElement.src = item.image;
            imgElement.alt = item.name;
            imgElement.width = 80;
            imgElement.height = 80;
            imgContainer.appendChild(imgElement);

            // Create item info section
            const cartItemInfo = document.createElement("div");
            cartItemInfo.classList.add("cartiteminfo");

            const nameElement = document.createElement("p");
            const nameStrong = document.createElement("strong");
            nameStrong.textContent = item.name;
            nameElement.appendChild(nameStrong);

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = item.description;

            const customizerRemoveDiv = document.createElement("div");
            customizerRemoveDiv.classList.add("customiseremove");

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => removeItem(item.name));
            customizerRemoveDiv.appendChild(removeButton);

            cartItemInfo.appendChild(nameElement);
            cartItemInfo.appendChild(descriptionElement);
            cartItemInfo.appendChild(customizerRemoveDiv);

            // Create price and quantity section
            const plusMinusContainer = document.createElement("div");
            plusMinusContainer.classList.add("plusminus");
            const minusButton = document.createElement("button");
            minusButton.textContent = "-";
            minusButton.addEventListener("click", () => updateCostQuantity(item.name,"minus"));

            const quantityElement = document.createElement("p");
            quantityElement.textContent = item.quantity;

            const plusButton = document.createElement("button");
            plusButton.textContent = "+";
            plusButton.addEventListener("click", () => updateCostQuantity(item.name,"plus"));

            plusMinusContainer.appendChild(minusButton);
            plusMinusContainer.appendChild(quantityElement);
            plusMinusContainer.appendChild(plusButton);

            const price = document.createElement("p");
            price.textContent = `$ ${item.price}`;

            // Append everything to the item div
            itemDiv.appendChild(imgContainer);
            itemDiv.appendChild(cartItemInfo);
            itemDiv.appendChild(plusMinusContainer);
            itemDiv.appendChild(price);

            // Insert the new item into the container
            itemsContainer.appendChild(itemDiv);

            const orderDetails = document.querySelector(".orderDetails");
            orderDetails.style.display="inline-block"
        });
    } else {
        // If no items in the cart, show a message
        const emptyCartImg = document.querySelector(".mycarttext img");
        if (emptyCartImg) {
            emptyCartImg.style.display = "inline-block";
            orderDetails.style.display="none"
        }
    }
}

function removeItem(name) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(cartitem => cartitem.name === name);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    updateOrderDetails();
}

function updateCostQuantity(name, action) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(cartItem => cartItem.name === name);

    if (itemIndex !== -1) {
        const item = cartItems[itemIndex];
        let quantity = parseInt(item.quantity, 10); // Parse quantity to an integer
        
        // Update quantity based on the action
        if (action === "minus" && quantity > 1) {
            item.quantity = (quantity - 1).toString(); // Decrement and convert back to string
        } else if (action === "plus") {
            item.quantity = (quantity + 1).toString(); // Increment and convert back to string
        }
        
        // Update the price based on the new quantity
        item.price = (parseFloat(item.initialPrice) * parseInt(item.quantity, 10)).toFixed(2);

    }

    // Save updated cart back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
updateOrderDetails();
    
}



function updateOrderDetails(){
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let totalPrice = 0.0;
    let totalQuantity = 0;  


    cartItems.forEach(item => {
        totalQuantity+=parseInt(item.quantity)
        totalPrice+=parseFloat(item.price)
    });

    if (totalQuantity===0) {
        const orderDetails = document.querySelector(".orderDetails");
            orderDetails.style.display="none"
            return;
    }

    const quantity = document.querySelector(".orderDetails h1");
    const price = document.querySelector(".orderDetails h2");
    const priceParagraph = document.querySelector("#toCheckout p");
    
    // Update the content
    quantity.textContent = `${totalQuantity} Items`;
    price.textContent = `Sub Total $${totalPrice.toFixed(2)}`; 
    priceParagraph.textContent = `$${totalPrice.toFixed(2)}`;  

    loadCartContent();

}

