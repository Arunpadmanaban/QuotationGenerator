let rowCount = 0;

function addRow() {
    rowCount++;
    let table = document.getElementById("quotationTable").getElementsByTagName("tbody")[0];
    let row = table.insertRow();

    row.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="description"></td>
        <td><input type="number" class="quantity" oninput="updateAmount(this)"></td>
        <td><input type="number" class="rate" oninput="updateAmount(this)"></td>
        <td class="amount">0.00</td>
        <td><button onclick="removeRow(this)">Remove</button></td>
    `;
}

function updateAmount(input) {
    let row = input.closest("tr");
    let quantity = row.querySelector(".quantity").value || 0;
    let rate = row.querySelector(".rate").value || 0;
    let amount = (quantity * rate).toFixed(2);

    row.querySelector(".amount").textContent = amount;
    updateTotal();
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll(".amount").forEach(cell => {
        total += parseFloat(cell.textContent);
    });
    document.getElementById("totalAmount").textContent = total.toFixed(2);
}

function removeRow(button) {
    let row = button.closest("tr");
    row.remove();
    updateTotal();
}

function printQuotation() {
    let buttonContainer = document.querySelector(".button-container");
    buttonContainer.style.display = "none"; // Hide buttons

    window.print();

    setTimeout(() => {
        buttonContainer.style.display = "flex"; // Restore buttons
    }, 1000);
}

function shareOnWhatsApp() {
    let message = "Quotation Details:\n\n";
    document.querySelectorAll("#quotationTable tbody tr").forEach(row => {
        let description = row.querySelector(".description").value;
        let quantity = row.querySelector(".quantity").value;
        let rate = row.querySelector(".rate").value;
        let amount = row.querySelector(".amount").textContent;
        message += `📌 ${description} | Qty: ${quantity} | Rate: ${rate} | Amount: ${amount}\n`;
    });

    message += `\nTotal: ${document.getElementById("totalAmount").textContent}`;

    let whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
}
