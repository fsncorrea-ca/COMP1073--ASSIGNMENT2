// app.js

console.log("Arquivo app.js carregado!");

// Function to load the JSON
async function loadSmoothieData() {
    const response = await fetch('js/smoothie.json');
    const smoothies = await response.json();

    const ingredientsSelect = document.getElementById('ingredients');
    const smoothieImagesDiv = document.querySelector('.smoothie-images');

    // Add the options of ingredients and images
    smoothies.forEach(smoothie => {
        // Add options on select
        const option = document.createElement('option');
        option.value = smoothie.value;
        option.textContent = smoothie.name;
        ingredientsSelect.appendChild(option);

        // Creating item of image
        const smoothieItemDiv = document.createElement('div');
        smoothieItemDiv.classList.add('smoothie-item');

        const image = document.createElement('img');
        image.src = smoothie.image;
        image.alt = `Smoothie de ${smoothie.name}`;

        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${smoothie.value}"> ${smoothie.name}`;

        smoothieItemDiv.appendChild(image);
        smoothieItemDiv.appendChild(label);

        smoothieImagesDiv.appendChild(smoothieItemDiv);
    });
}

// Smoothie Class to represent the smoothie order
class Smoothie {
    constructor(size, base, ingredients, sweetness, topping) {
        this.size = size;
        this.base = base;
        this.ingredients = ingredients;
        this.sweetness = sweetness;
        this.topping = topping;
    }

    // Method to calculate the price
    calculatePrice() {
        const basePrices = {
            small: 5,
            medium: 7,
            large: 9
        };

        const ingredientPrices = {
            banana: 1,
            strawberry: 1.5,
            blueberry: 1.5,
            vanilla: 1,
            acai: 2,
            rasberry: 1.5,
        };

        const toppingPrices = {
            none: 0,
            granola: 1.5,
            coconut_flakes: 1.5,
            almonds: 2,
            berries: 2
        };

        let price = basePrices[this.size] + toppingPrices[this.topping];
        this.ingredients.forEach(ingredient => {
            price += ingredientPrices[ingredient];
        });

        return price.toFixed(2);
    }

    // Method to get the description
    getDescription() {
        return `
            Size: ${this.size.charAt(0).toUpperCase() + this.size.slice(1)} <br>
            Base: ${this.base.charAt(0).toUpperCase() + this.base.slice(1)} <br>
            Ingredients: ${this.ingredients.join(', ')} <br>
            Sweetness Level: ${this.sweetness} <br>
            Topping: ${this.topping.charAt(0).toUpperCase() + this.topping.slice(1)}
        `;
    }
}

// Send to form
document.getElementById('smoothie-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values fro  form
    const size = document.getElementById('size').value;
    const base = document.getElementById('base').value;
    const ingredients = Array.from(document.getElementById('ingredients').selectedOptions).map(option => option.value);
    const sweetness = document.getElementById('sweetness').value;
    const topping = document.getElementById('topping').value;

    // To create an object
    const smoothie = new Smoothie(size, base, ingredients, sweetness, topping);

    // Display order
    document.getElementById('smoothie-description').innerHTML = smoothie.getDescription();
    document.getElementById('smoothie-price').innerHTML = `Total Price: $${smoothie.calculatePrice()}`;
    document.getElementById('order-summary').style.display = 'block';
});

// Load the JSON datas
window.onload = loadSmoothieData;
