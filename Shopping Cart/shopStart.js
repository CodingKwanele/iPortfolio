/*
@ author : Kwanele Dladla 
@ JavaScript Version : 10.11.1
Hi, I'm Kwanele Dladla, a young aspiring data scientist/machine learning engineer/indoda enemali.

Welcome to My Code
*/


let itemIds = [1, 2, 3, 4];
let items = ["Coke", "Kit Kat", "Bar One", "Fanta"];
let prices = [7.5, 9.5, 8.5, 7.5];
let quantities = [0, 0, 0, 0];
let totals = [0.0, 0.0, 0.0, 0.0];
let totalOrderAmt = 0;

function addItemToCart(index) {
    quantities[index]++;
    totals[index] = prices[index] * quantities[index];
    totalOrderAmt += prices[index];
    display_all();
}

function removeItemFromCart(index) {
    if (quantities[index] > 0) {
        quantities[index]--;
        totals[index] = prices[index] * quantities[index];
        totalOrderAmt -= prices[index];
    } else {
        alert("No " + items[index] + " in the cart.");
    }
    display_all();
}

function checkout() {
    let checkoutCard = "<div class='checkout-card'><h2>Checkout Summary</h2><ul>";
    for (let i = 0; i < items.length; i++) {
        if (quantities[i] > 0) {
            checkoutCard += `<li>${quantities[i]} x ${items[i]} - $${totals[i].toFixed(2)}</li>`;
        }
    }
    checkoutCard += `</ul><p><strong>Total: $${totalOrderAmt.toFixed(2)}</strong></p></div>`;
    document.getElementById("demo").innerHTML = checkoutCard;
}

function createTableRow(item, index) {
    return `
        <tr>
            <td>${itemIds[index]}</td>
            <td>${item}</td>
            <td>${prices[index]}</td>
            <td>${quantities[index]}</td>
            <td>${totals[index]}</td>
            <td><button onclick='addItemToCart(${index})'>Add</button></td>
            <td><button ${quantities[index] === 0 ? 'disabled' : ''} onclick='removeItemFromCart(${index})'>Remove</button></td>
        </tr>
    `;
}

function display_all() {
    let myTable = `
        <table>
            <th>Num</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Add</th>
            <th>Remove</th>
            ${items.map(createTableRow).join('')}
        </table>
        <p>Total: ${totalOrderAmt}</p>
        <button onclick='checkout()'>Checkout</button>
    `;
    document.getElementById("demo").innerHTML = myTable;
}

window.onload = display_all;
