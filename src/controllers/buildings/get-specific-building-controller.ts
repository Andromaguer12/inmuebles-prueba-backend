'use strict';

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import currentErrorInterface from '../errors/buildings/errors';
import buildingRepository from '../../shared/repositories/buildingRepository';
import { UserDocument } from '../../typesDefs/models/users/types';
import { BuildingCard } from '../../typesDefs/models/buildings/buildings';

const errorInterface = (flag: string) => currentErrorInterface({ flag });

interface CustomRequest extends Request {
  user: UserDocument;
}

// @desc    get specific building by id
// @route   GET /api/buildings/:id
// @access  Public
const getSpecificBuildingById = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const building: BuildingCard = await buildingRepository.getBuildingById(id);

  if (!building) {
    res.status(400);
    throw new Error(errorInterface('Not found').NOT_FOUND);
  }

  res.status(201).json(building);
});

export default getSpecificBuildingById;
