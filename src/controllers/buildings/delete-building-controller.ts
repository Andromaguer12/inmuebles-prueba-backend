/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import currentErrorInterface from '../errors/buildings/errors';
import buildingRepository from '../../shared/repositories/buildingRepository';
import { UserDocument } from '../../typesDefs/models/users/types';
import path from 'path';
import fs from 'fs';
import { BuildingCard } from '../../typesDefs/models/buildings/buildings';

const errorInterface = (flag: string) => currentErrorInterface({ flag });

interface CustomRequest extends Request {
  user: UserDocument;
  files: {
    buildingImage: any[];
  };
}

// @desc    deletes a building with id
// @route   DELETE /api/buildings/:id
// @access  Private/Admin
const deleteBuilding = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const fileDeleter = (array: any) => {
    array.forEach((file) => {
      const pathToFiles = path.join(
        __dirname,
        '../',
        '../',
        '../',
        'public',
        'assets',
        'images',
        'buildings',
        file.link,
      );
      if (fs.existsSync(pathToFiles)) {
        fs.unlinkSync(pathToFiles);
      }
    });
  };

  if (!id) {
    res.status(400);
    throw new Error(errorInterface('THE ID IS REQUIRED').INVALID_DATA);
  }

  const building: BuildingCard = await buildingRepository.getBuildingById(id);

  if (building.media && building.media.length) {
    fileDeleter(building.media);
  }

  const buildingUpdated: any = await buildingRepository.deleteBuilding(id);

  if (buildingUpdated?.error) {
    res.status(400);
    throw new Error(errorInterface(buildingUpdated?.message).ERROR_UPDATING_BUILDING);
  }

  res.status(201).json(updatedBuilding);
});

export default deleteBuilding;
