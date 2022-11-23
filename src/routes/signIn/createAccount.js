const {Router} = require('express');
const { check } = require('express-validator');
const pool = require('../../database');
const router = Router();
const helpers = require('../../lib/helpers');

router.post('/', async (req, res)=>{
    try {
        const { usuario_nombre, usuario_apellido, usuario_numero, usuario_email, usuario_password, usuario_token, usuario_create, usuario_update } = req.body;
        const user = {
            usuario_nombre,
            usuario_apellido,
            usuario_numero,
            usuario_email,
            usuario_password,
            usuario_token,
            usuario_create,
            usuario_update,
        }

        /*
        check('usuario_dni')
        .length(8)
        .isString()
        .isNumeric()
        */

        user.usuario_create = await helpers.getDateNow();
        
        user.usuario_update = await helpers.getDateNow();

        user.usuario_password = await helpers.encrypPassword(usuario_password);
    
        user.usuario_token = undefined;
    
        user.usuario_token = await helpers.getToken(user);

    
        await pool.query('INSERT INTO usuario set ?', [user]);
    
        res.send("user");
        
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;