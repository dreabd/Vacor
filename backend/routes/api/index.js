// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser); /*KEEP THIS FILE IN THE TOP */
// Allows all router to retrieve the current user on teh req obj as **req.user**
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null







module.exports = router;
