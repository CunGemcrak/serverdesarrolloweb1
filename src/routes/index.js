const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const usuarioPhpController = require('../controllers/usuarioPhpController');
const adminPhpController   = require('../controllers/adminPhpController')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//Lo que desarrolla el usuario
router.post('/crear', usuarioPhpController.crear);
router.get('/leer', usuarioPhpController.leer);
router.put('/actualizar/:id', usuarioPhpController.actualizar);
router.delete('/eliminar/:id', usuarioPhpController.eliminar);

//adquirir usuario 
router.post('/reserva', usuarioPhpController.crearreserva);
router.get('/verreserva', usuarioPhpController.verreserva);
router.put('/actualizarreserva/:id', usuarioPhpController.actualizarreserva);
router.delete('/eliminarreserva/:id', usuarioPhpController.eliminarreserva);

//Administrador
router.post('/crearpaquete', adminPhpController.crearpaquete);
router.get('/verpaquetes', adminPhpController.verpaquetes);
router.put('/administradoractualizarpaquete/:id', adminPhpController.administradoractualizarpaquete);

router.put('/estadousuarioactivar/:cont/:estado', adminPhpController.estadoreservas);





router.delete('/eliminarpaquete/:id', adminPhpController.eliminarpaquete);
router.get('/listausuarioall', adminPhpController.leerusuariosAll);

router.get('/listareservasall', adminPhpController.listareservasall);



router.put('/estadousuariobloquear/:id', adminPhpController.estadousuariobloquear);
router.put('/estadousuarioactivar/:id', adminPhpController.estadousuarioactivar);




router.get('/leerusuarios', adminPhpController.leerusuarios);
router.get('/verreservaAll', adminPhpController.verreservaAll);
router.delete('/eliminarusuario/:id', adminPhpController.eliminarusuario);





module.exports = router;
