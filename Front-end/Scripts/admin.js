
document.addEventListener("DOMContentLoaded",getFood
)

async function getFood(){
    try {
        const response = await fetch("http://localhost:8080/api/food");
        const fooditems = await response.json();
        displayInTable(fooditems)
    } catch (error) {
        console.log("erroe while fetching data",error)
    }    
}

function displayInTable(fooditems){

    const tableBody = document.querySelector(".foodtable tbody");

    fooditems.forEach((item,index) => {
        const foodRow = document.createElement('tr');

        foodRow.innerHTML= `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>
            <img height="50px" width="50px" src="${item.image}" alt="${item.name}">
        </td>
        <td>
            <p>${item.category}</p>
        </td>
        <td>
            <button>Delete</button>
            <button>Edit</button>
        </td>
    `;
        tableBody.appendChild(foodRow);
    });
}