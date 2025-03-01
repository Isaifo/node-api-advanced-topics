const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
 
const User = require('../models/User');
 
const EXPIRES = 86400;
 
function generateToken(params = {}, timeout = EXPIRES) {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: EXPIRES,
  });
}
 
router.post('/', async (req, res) => {
  // Definir o tempo de expiração do Token (Default = 86400 seg = 24 horas)
  const { 'token-timeout': timeout = EXPIRES } = req.headers;
 
  // Obter o usuário e senha enviado no corpo da requisição
  const { login, password } = req.body;
 
  try {
    const user = await User.findOne({ email: login, password });
 
    if (!user) return res.status(400).json({ message: 'User not found' });
 
    //if (!(await user.validPassword(password))) return res.status(400).json({ message: 'Invalid password' });
 
    user.password = undefined;
 
    const now = new Date();
    return res.json({
      token: generateToken({ id: user.id }),
      user,
      loggedIn: now,
      expiresIn: new Date(now.getTime() + timeout * 1000),
    });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});
 
 
module.exports = router;