'use strict';

import express from 'express';
import { forEditor, protect } from '../middlewares/authMiddleware';
import registerBuilding from '../controllers/buildings/create-building-controller';
import getAllBuildings from '../controllers/buildings/get-all-building-controller';
import uploadToLocalStorage from '../config/multer/config';
import getSpecificBuildingById from '../controllers/buildings/get-specific-building-controller';
import deleteBuilding from '../controllers/buildings/delete-building-controller';
import updateBuilding from '../controllers/buildings/update-building-controller';
import { BUILDING_FILES } from '../config/multer/fieldsNames';
const router = express.Router();

router
  .route('/')
  .post(protect, forEditor, uploadToLocalStorage.fields([{ name: BUILDING_FILES, maxCount: 6 }]), registerBuilding)
  .get(getAllBuildings);

router
  .route('/:id')
  .get(getSpecificBuildingById)
  .post(protect, forEditor, updateBuilding)
  .delete(protect, forEditor, deleteBuilding);

export default router;
