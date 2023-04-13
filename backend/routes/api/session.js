const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

/* -------------------- Log In--------------------*/

router.post('/', async (req, res, next) => {
  // Gets the crediential and password from the user
  const { credential, password } = req.body;

  // Finds a user that matches either the email or the username
  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential
      }
    }
  });
  // if there is a no user found or if password is not the same throws an error
  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = { credential: 'The provided credentials were invalid.' };
    return next(err);
  }

  // Creates the object to be sent
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  // creates cookie
  await setTokenCookie(res, safeUser);
  return res.json({
    user: safeUser
  });
});

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

router.get('/', (req, res) => {
  // Get the user from the request
  const { user } = req;
  // if the user exists return all their info
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return res.json({
      user: safeUser
    });
  }
  // Otherwise return nul
  else return res.json({ user: null });
});


module.exports = router;
