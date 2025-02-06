



 let counter = 1;

        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById("quotation-date").valueAsDate = new Date();
        });

        function addRow() {
            const tableBody = document.getElementById("quotation-body");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${counter++}</td>
                <td><input type="text" class="description" placeholder="Description"></td>
                <td><input type="number" class="quantity" placeholder="Quantity" oninput="updateAmount(this)"></td>
                <td><input type="number" class="rate" placeholder="Rate"  oninput="updateAmount(this)"></td>
               <td class="amount">0.00</td>
                <td><button onclick="startSpeechRecognition(this)">🎤</button></td>
				  <td><button onclick="removeRow(this)">Remove</button></td>
            `;
            tableBody.appendChild(row);
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
    row.remove();`
    updateTotal();
}
        function startSpeechRecognition(button) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                alert("Your browser does not support speech recognition.");
                return;
            }
            const recognition = new SpeechRecognition();
            recognition.lang = "en-US";
            recognition.start();

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                button.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.querySelector("input").value = transcript;
            };
        }

        function printPage() {
             let buttonContainer = document.querySelector(".button-container");
    buttonContainer.style.display = "none"; // Hide buttons

    window.print();

    setTimeout(() => {
        buttonContainer.style.display = "flex"; // Restore buttons
    }, 1000);
        }

        function shareWhatsApp() {
            const message = encodeURIComponent("Here is your quotation. Please check the details.");
            const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;
            window.open(whatsappURL, '_blank');
        }