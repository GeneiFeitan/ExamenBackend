import mongoose, { Schema } from 'mongoose';
const usuarioSchema = new Schema({
    email: { type: String, maxlength: 50, unique: true, required: true },
    nombre: { type: String, maxlength: 60, required: true },
    usuario: { type: String, maxlength: 60, unique: true, required: true },
    password: { type: String, maxlength: 64, required: true },
    ceatedAt: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;