import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth';


const router = routerx();

router.post('/add', usuarioController.add);
router.post('/login', usuarioController.login);
router.get('/query', usuarioController.query);
router.get('/list', auth.verifyUsuario, usuarioController.list);
router.put('/update', auth.verifyUsuario, usuarioController.update);
router.delete('/remove', auth.verifyUsuario, usuarioController.remove);


export default router;