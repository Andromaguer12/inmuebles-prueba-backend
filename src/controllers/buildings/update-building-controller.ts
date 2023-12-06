/* eslint-disable @typescript-eslint/no-explicit-any */
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

// @desc    update building
// @route   PUT /api/buildings/:id
// @access  Private/Admin
const updateBuilding = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { body }: { body: Partial<BuildingCard> } = req;
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error(errorInterface('invalid-id').ERROR_UPDATING_BUILDING);
  }

  if (!body) {
    res.status(400);
    throw new Error(errorInterface('there-is-no-data-to-update').ERROR_UPDATING_BUILDING);
  }

  const buildingCreated: any = await buildingRepository.updateBuilding(body, id);

  if (buildingCreated?.error) {
    res.status(400);
    throw new Error(errorInterface(buildingCreated?.message).ERROR_UPDATING_BUILDING);
  }

  res.status(201).json(buildingCreated);
});

export default updateBuilding;
