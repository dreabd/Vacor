const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  // Gets the infor from req.body
  const { email, password, username } = req.body;
  // Hashes the password
  const hashedPassword = bcrypt.hashSync(password);
  // creates and saves a new instance of user
  const user = await User.create({ email, username, hashedPassword });

  // creates obj for set token cookie function
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  // creates a cookie for the user
  await setTokenCookie(res, safeUser);

  // sends the info 
  return res.json({
    user: safeUser
  });
}
);

module.exports = router;
