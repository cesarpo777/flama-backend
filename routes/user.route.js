const { Router } = require("express");
// const { validarJWT } = require('../middlewares/validarJwt')
const { check } = require('express-validator');
const router = Router();
const { getAll, createUser } = require("../controllers/user.controller");
const { validarCampos } = require('../middlewares/validar-campos');


router.get("/", getAll);

router.post(
    "/register",
    [
      check("name", "El campo nombre es obligatorio").not().isEmpty(),
      check("correo", "Introduce un correo vàlido").isEmail(),
      check(
        "password",
        "La contraseña debe tener al menos 6 caracteres"
      ).isLength({ min: 6 }),
      validarCampos,
    ],
    createUser
  );

module.exports = router;
