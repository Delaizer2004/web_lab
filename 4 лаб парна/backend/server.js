require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./db');
const routes = require('./routes');
const cors = require('cors');
const flowerRouter = require('./routes/flowerRouter');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');


const { authenticateToken } = require('./middleware/authMiddleware');

// Функція перевірки ролі адміністратора
// const authorizeAdmin = (req, res, next) => {
//   if (req.user.role !== 'ADMIN') {
//     return res.status(403).send("Access denied. You do not have rights to access this page.");
//   }
//   next();
// };

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Обслуговування статичних файлів із папки "frontend"
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// app.get('/admin', authenticateToken, authorizeAdmin, (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'admin.html'));
// });

app.use('/api', routes);
app.use('/api/flowers', flowerRouter);
app.use('/api/cart', cartRouter);
app.use('/api/users', userRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
