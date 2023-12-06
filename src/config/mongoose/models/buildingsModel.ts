/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck: here are no errors
import { model, Schema } from 'mongoose';
import { BuildingCard } from '../../../typesDefs/models/buildings/buildings';

// creating schema
const buildingsSchema = new Schema(
  {
    address: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    squareMeters: {
      type: Number,
    },
    media: [
      {
        mediaType: {
          type: String,
        },
        link: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

export default model<Partial<BuildingCard>>('Buildings', buildingsSchema);
