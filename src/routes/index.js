const {Router} = require('express');
const router = Router();

router.use('/signIn', require('./signIn/createAccount.js'));

module.exports = router;