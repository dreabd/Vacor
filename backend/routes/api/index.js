const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser); /*KEEP THIS FILE IN THE TOP */
// Allows all router to retrieve the current user on teh req obj as **req.user**
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});



module.exports = router;
