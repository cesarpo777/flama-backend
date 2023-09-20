const { Router } = require("express");
// const { validarJWT } = require('../middlewares/validarJwt')
// const { check } = require('express-validator');
const router = Router();
const { getAll } = require("../controllers/user.controller");
// const { validarCampos } = require('../middlewares/validar-campos');

// obtener pizzas
router.get("/", getAll);

module.exports = router;
