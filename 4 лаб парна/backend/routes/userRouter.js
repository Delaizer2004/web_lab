const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

//const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';



// Реєстрація нового користувача
router.post('/register', userController.register);

// Логін користувача (авторизація)
router.post('/login', userController.login);

// Отримання профілю користувача (захищений маршрут)
router.get('/me', authenticateToken, userController.getUser);

// Отримання списку всіх користувачів (для адміністратора)
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.findAll({ attributes: ['id', 'email', 'role'] });
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
