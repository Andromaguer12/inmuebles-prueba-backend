/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import currentErrorInterface from '../errors/buildings/errors';
import buildingRepository from '../../shared/repositories/buildingRepository';
import { UserDocument } from '../../typesDefs/models/users/types';
import { BUILDING_IMAGE, BUILDING_VIDEO } from '../../config/multer/fieldsNames';
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

// @desc    Create building
// @route   POST /api/buildings
// @access  Private/Admin
const registerBuilding = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { address, name, description, price, squareMeters }: Partial<BuildingCard> = req.body;
  const buildingImages = req.files[BUILDING_IMAGE];
  const buildingVideos = req.files[BUILDING_VIDEO];
  const currImages = buildingImages.map((file) => ({
    link: file.filename as string,
    mediaType: 'image',
    name: file.originalname as string,
  }));
  const videos = buildingVideos.map((file) => ({
    link: file.filename as string,
    mediaType: 'video',
    name: file.originalname as string,
  }));

  const images: any[] = currImages.concat(videos);

  const fileDeleter = (array: any) => {
    array.forEach((file) => {
      const pathToFiles = path.join(
        __dirname,
        '../',
        '../',
        '../',
        'public',
        'assets',
        file.mediaType === 'video' ? 'videos' : 'images',
        'buildings',
        file.link,
      );
      if (fs.existsSync(pathToFiles)) {
        fs.unlinkSync(pathToFiles);
      }
    });
  };

  if (!address && !name && !description && !price && !squareMeters) {
    res.status(400);
    fileDeleter(images);
    throw new Error(errorInterface('Invalid parameters').INVALID_DATA);
  }

  const buildingCreated: any = await buildingRepository.createBuilding(
    address,
    name,
    description,
    price,
    squareMeters,
    images && images.length > 0 ? images : [],
  );

  if (buildingCreated?.error) {
    res.status(400);
    fileDeleter(images);
    throw new Error(errorInterface(buildingCreated?.message).ERROR_CREATING_BUILDING);
  }

  res.status(201).json(buildingCreated);
});

export default registerBuilding;
