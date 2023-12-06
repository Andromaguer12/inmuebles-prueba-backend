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

// @desc    get all buildings
// @route   GET /api/buildings
// @access  Public
const getAllBuildings = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { page = 0, limit = 100, ...searchParams } = req.query;

  const newPage = Number(page);
  const newLimit = Number(limit);

  const [{ projects, total }]: { projects: BuildingCard[]; total: number }[] = await buildingRepository.getAllBuildings(
    {
      page: newPage ? newPage - 1 : newPage,
      limit: newLimit,
      ...searchParams,
    },
  );

  if (projects.length === 0) {
    res.status(400);
    throw new Error(errorInterface(projects.length.toString()).NOT_FOUND);
  }

  res.status(201).json({
    projects: projects,
    totalPages: Math.ceil(total / newLimit),
    currentPage: Number(newPage) + 1,
    totalResults: Number(total),
  });
});

export default getAllBuildings;
