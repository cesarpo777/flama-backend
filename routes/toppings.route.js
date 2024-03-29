const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJwt");
const { check } = require("express-validator");
const router = Router();
const {
  getToppings,
  createTopping,
  editTopping,
  deleteTopping,
} = require("../controllers/toppings.controller");
const { validarCampos } = require("../middlewares/validar-campos");

router.get("/", getToppings);

router.use(validarJWT);

router.post(
  "/",
  [
    check("description", "El campo description no puede estar vacío ")
      .not()
      .isEmpty(),
    check("type", "Se necesita saber si es un topping flama o es un clásico")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  createTopping
);

// Editar toppings

router.put("/:id", editTopping);

// Borrar topping

router.delete("/:id", deleteTopping);

module.exports = router;
