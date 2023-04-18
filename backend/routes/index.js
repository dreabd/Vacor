const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/', apiRouter);

router.get('/hello/world', (req,res)=>{
  // Sets up cookie for CSRF
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!')
})

router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;
