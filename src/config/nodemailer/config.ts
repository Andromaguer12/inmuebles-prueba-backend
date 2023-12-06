/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeMailerConfig } from '../constants/constants-config';
import nodemailer from 'nodemailer';

export const nodeMailerTransporterHandler = async (
  config: NodeMailerConfig,
): Promise<{ sendMail: (mailConfig: any) => any }> => {
  let transporterToReturn = null;

  if (config) {
    const transporter = nodemailer.createTransport(config);

    const mailerStatus = await transporter.verify();

    if (mailerStatus) transporterToReturn = transporter;
  }

  return transporterToReturn;
};
