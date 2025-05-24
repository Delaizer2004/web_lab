const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.register = async (req, res) => {
  try {
    const { email, password/*, role */} = req.body;
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword/*, role */});
    res.status(201).json(user/*{
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, role: user.role },
    }*/);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      { userId: user.id, email: user.email/*, role: user.role */},
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    // req.user встановлюється у middleware аутентифікації (наприклад, authenticateToken)
    const user = await User.findByPk(req.user.userId/*, { attributes: ['id', 'email', 'role'] }*/);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({ attributes: ['id', 'email', 'role'] });
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
