const priceTicket = 50.00;

function calcTotal() {
    const quantity = document.getElementById('quantity').value;
    const total = (quantity * priceTicket).toFixed(2);
    document.getElementById('total').innerText = total;
}