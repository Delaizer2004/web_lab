document.addEventListener("DOMContentLoaded", () => {
    loadClients();
});

async function loadClients() {
    let response = await fetch("/clients");
    let clients = await response.json();
    let clientList = document.getElementById("clientList");
    clientList.innerHTML = "";
    
    clients.forEach(client => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.first_name}</td>
            <td>${client.last_name}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td>${client.city}</td>
            <td>
                <button onclick="editClient(${client.id})">✏️</button>
                <button onclick="deleteClient(${client.id})">🗑️</button>
            </td>
        `;
        clientList.appendChild(row);
    });
}

document.getElementById("clientForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let clientData = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value
    };

    await fetch("/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientData)
    });

    loadClients();
});

async function deleteClient(clientId) {
    await fetch(`/clients/${clientId}`, { method: "DELETE" });
    loadClients();
}

async function editClient(clientId) {
    let newEmail = prompt("Введіть новий email:");
    if (!newEmail) return;

    await fetch(`/clients/${clientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail })
    });

    loadClients();
}
