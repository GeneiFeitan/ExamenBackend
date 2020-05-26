import models from '../models';
import bcrypt from 'bcryptjs';

import token from '../services/token'
export default {
    add: async(req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'El correo ya existe'
            });
            next(e);
        }
    },
    query: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findOne({ email: req.query.email });
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.find({ $or: [{ 'nombre': new RegExp(valor, 'i') }, { 'email': new RegExp(valor, 'i') }] }, { createdAt: 0 })
                .sort({ 'createdAt': -1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    update: async(req, res, next) => {

        try {
            let pas = req.body.password;
            // console.log(req.body._id);
            const reg0 = await models.Usuario.findOne({ _id: req.body._id });
            if (pas != reg0.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);

            }

            const reg = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, { nombre: req.body.nombre, usuario: req.body.usuario, email: req.body.email, password: req.body.password });
            // res.status(200).json(reg);
            res.status(200).send({
                message: 'Usuario editado'
            });

        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }

    },
    remove: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({ _id: req.body._id });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    login: async(req, res, next) => {

        try {
            let user = await models.Usuario.findOne({ email: req.body.email });
            if (user) {
                // Existe un usuario con ese email

                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(404).send({
                        message: 'Email o contraseña incorrectos'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'No existe el usuario'
                })
            }

        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    }

}