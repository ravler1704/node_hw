const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  res.status(201);
  res.json({
    id: 1,
    mail: "test@test.ru",
  });
});

module.exports = router;
