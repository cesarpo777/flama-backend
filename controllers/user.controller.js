const User = require("../models/Usuario");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");

const getAll = async (req, res) => {
  const users = await User.find();

  res.json({
    ok: true,
    users,
  });
};

const createUser = async (req, res = response) => {
  const { password, name } = req.body;

  try {
    let usuario = await User.findOne({ name });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una cuenta asociada a ese nombre",
      });
    }

    usuario = new User(req.body);

    // ENCRIPTAR PASSWORD
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  getAll,
  createUser
};
