const {
  createNewUser,
  login,
  renewToken,
} = require("../controllers/auth.controller");

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validarJwt");


router.post(
  "/login",
  [
    check("name", "Introduce un nombre valido").not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  login
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
