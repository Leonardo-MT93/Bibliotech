import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { response } from 'express';



export const validateJWT = async(req, res = response, next) => {
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            "msg": 'No hay token de autenticacion'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_PRIVATEKEY);
        const user = await User.findById(uid);
        req.user = user;
        if(!user){
            return res.status(401).json({
                "msg": "Token no valido - Usuario inexistente"
            })
        }
        next();
    } catch (error) {
        res.status(401).json({
            "msg": 'Token inválido'
        })
    }
}
