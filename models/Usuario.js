const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UsuarioSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Usuario", UsuarioSchema);
