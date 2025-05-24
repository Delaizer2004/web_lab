const express = require('express');
const router = express.Router();
const Client = require('../models/Client'); 
const Log = require('../models/Log');       
const ClientInfo = require('../models/ClientInfo'); 

// ➤ Додати клієнта (Create)
router.post('/add-client', async (req, res) => {
    try {
        const newClient = await Client.create(req.body);
        
        await Log.create({
            user_id: newClient.id,
            action: 'Created client',
            details: { client_name: `${newClient.first_name} ${newClient.last_name}`, operation: 'Create' }
        });

        res.status(201).json({ message: 'Клієнт доданий успішно', client: newClient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Отримати всіх клієнтів (Read)
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Отримати одного клієнта за ID
router.get('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Клієнта не знайдено' });

        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Оновити клієнта (Update)
router.put('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Клієнта не знайдено' });

        await client.update(req.body);
        
        await Log.create({
            user_id: client.id,
            action: 'Updated client',
            details: { client_name: `${client.first_name} ${client.last_name}`, operation: 'Update' }
        });

        res.json({ message: 'Клієнт оновлений успішно', client });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Видалити клієнта (Delete)
router.delete('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Клієнта не знайдено' });

        await Log.create({
            user_id: client.id,
            action: 'Deleted client',
            details: { client_name: `${client.first_name} ${client.last_name}`, operation: 'Delete' }
        });

        await client.destroy();
        res.json({ message: 'Клієнт видалений успішно' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
