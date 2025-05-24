const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./server/config/postgres');
require('./server/config/mongo');

const clientRoutes = require('./server/routes/clientRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
