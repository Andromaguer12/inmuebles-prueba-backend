'use strict';

import { Router } from 'express';
import userRoutes from './userRoutes';
import buildingsRoutes from './buildingsRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/buildings', buildingsRoutes);

export default router;
