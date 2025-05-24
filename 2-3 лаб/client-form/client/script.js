const form = document.getElementById('clientForm');
const clientsList = document.getElementById('clientsList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:5000/api/add-client', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        e.target.reset();
        loadClients();
    } catch (err) {
        alert('❌ Помилка при додаванні клієнта');
        console.error(err);
    }
});

// Отримати всіх клієнтів
async function loadClients() {
    clientsList.innerHTML = '';

    try {
        const response = await fetch('http://localhost:5000/api/clients');
        const clients = await response.json();

        clients.forEach(client => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${client.first_name} ${client.last_name} - ${client.email}
                <button onclick="editClient(${client.id})">✏️ Редагувати</button>
                <button onclick="deleteClient(${client.id})">❌ Видалити</button>
            `;
            clientsList.appendChild(li);
        });
    } catch (err) {
        console.error('Помилка завантаження клієнтів:', err);
    }
}

// Видалити клієнта
async function deleteClient(id) {
    if (!confirm('Ви впевнені, що хочете видалити цього клієнта?')) return;

    try {
        await fetch(`http://localhost:5000/api/clients/${id}`, { method: 'DELETE' });
        alert('Клієнта видалено');
        loadClients();
    } catch (err) {
        console.error('Помилка видалення клієнта:', err);
    }
}

// Редагувати клієнта
async function editClient(id) {
    const newName = prompt('Введіть нове ім\'я');
    if (!newName) return;

    try {
        await fetch(`http://localhost:5000/api/clients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: newName })
        });

        alert('Клієнта оновлено');
        loadClients();
    } catch (err) {
        console.error('Помилка редагування клієнта:', err);
    }
}

loadClients();
