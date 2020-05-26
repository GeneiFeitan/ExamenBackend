import routerx from 'express-promise-router';
import usuarioRouter from './usuario';


const router = routerx();

// La variable router cuando haga refrerencia al primer parametro(categoria,articulo...)
//usara las rutas del segundo parametro

router.use('/usuario', usuarioRouter);

export default router;