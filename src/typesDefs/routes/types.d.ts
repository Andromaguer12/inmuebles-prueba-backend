/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { EndpointsRequestMethods } from './enums';
import { UserDocument } from '../models/users/types';

export type CustomRoutesProps = {
  isPriv: string | null;
};

export type EndpointsRouteType = {
  rootUrl: string;
  module: any;
  routeId: string;
};

export interface EndpointsRoutes {
  epRoute: string;
  controller: Promise<void> | void;
  method: EndpointsRequestMethods;
  isPrivate: boolean;
}
