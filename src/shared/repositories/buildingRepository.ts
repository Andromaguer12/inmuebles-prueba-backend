/* eslint-disable @typescript-eslint/no-explicit-any */
import Building from '../../config/mongoose/models/buildingsModel';
import mongoose from 'mongoose';
import { BuildingCard, BuildingMediaCard } from '../../typesDefs/models/buildings/buildings';

const ObjectId: any = mongoose.Types.ObjectId;

/**
 * saves an building instance
 * @param {Object} building
 * @returns building
 */
async function saveBuilding(building: any) {
  return building.save();
}

/**
 * used for get a single building by email
 * @param {String} id
 * @returns a single building or an error
 */
async function getBuildingByEmail(
  email?: string,
): Promise<Partial<BuildingCard> | { error: boolean; message: string }> {
  const building = await Building.findOne({ email });

  if (!building) return { error: true, message: 'Error: error getting the building' };

  return building;
}

/**
 * used for get a single building by email and authenticates with password
 * @param {String} id
 * @returns a single building or an error
 */
async function findBuildingByEmail(email: string, password: string) {
  const building: any = await Building.findOne({ email });

  if (!building) return { error: true, message: 'Error: error getting the building image' };

  if (building && (await building.matchPassword(password))) {
    delete building.password;
    return building;
  }

  return null;
}

/**
 * This function create a building note
 * @param {String} owner
 * @param {String} body
 * @returns
 */
async function createBuilding(
  address: string,
  name: string,
  description: string,
  price: number,
  squareMeters: number,
  media: BuildingMediaCard[],
): Promise<Partial<BuildingCard> | { error: boolean; message: string }> {
  const currentData: Partial<BuildingCard> = {
    address,
    name,
    description,
    price,
    squareMeters,
    media,
  };

  const buildingCreated = new Building(currentData);

  const validationError = buildingCreated.validateSync();
  if (validationError) {
    return { error: true, message: validationError.message };
  }

  const saved = await saveBuilding(buildingCreated);

  return saved;
}

/**
 * function to update a single building
 * @param {Object} body
 * @param {String} id
 * @returns updated data
 */
async function updateBuilding(body: Partial<BuildingCard>, id: string) {
  try {
    return Building.updateOne({ _id: id }, body);
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

/**
 * function to push images to the images array
 * @param {String} buildingId
 * @param {Array} array
 * @returns updated data
 */
async function pushImageToImageArray(buildingId: string, array: BuildingMediaCard[]) {
  try {
    return Building.updateOne({ _id: buildingId }, { $push: { images: { $each: array } } });
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

/**
 * function to delete a single building
 * @param {String} id
 * @returns object
 */
async function deleteBuilding(id: string) {
  try {
    return Building.deleteOne({ _id: id });
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

/**
 *
 * @param id
 * @param imageId
 * @returns
 */
async function deleteBuildingImage(id: string, imageId: string) {
  try {
    return Building.updateOne({ _id: id }, { $pull: { images: { _id: imageId } } });
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

async function findBuildingExist(id: string) {
  const exists = await Building.exists({ _id: id });

  if (!exists) return { error: true, message: 'Error: error getting the building' };

  return;
}

async function getAllBuildings({ page, limit }) {
  return Building.aggregate([
    {
      $sort: {
        aproxDate: 1,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
            },
          },
        ],
        projects: [{ $skip: Number(limit * page) }, { $limit: Number(limit) }],
      },
    },
    {
      $project: {
        projects: {
          _id: 1,
          address: 1,
          name: 1,
          description: 1,
          price: 1,
          squareMeters: 1,
          media: 1,
          createdAt: 1,
        },
        total: { $arrayElemAt: ['$metadata.total', 0] },
      },
    },
  ]);
}

async function getBuildingById(id: string): Promise<BuildingCard> {
  const _id = new ObjectId(id);

  const query = await Building.aggregate([
    {
      $match: {
        _id,
      },
    },
    {
      $project: {
        _id: 1,
        address: 1,
        name: 1,
        description: 1,
        price: 1,
        squareMeters: 1,
        media: 1,
        createdAt: 1,
      },
    },
  ]);

  return query[0] ?? null;
}

export default {
  createBuilding,
  deleteBuilding,
  deleteBuildingImage,
  findBuildingByEmail,
  findBuildingExist,
  getAllBuildings,
  getBuildingByEmail,
  getBuildingById,
  pushImageToImageArray,
  updateBuilding,
};
