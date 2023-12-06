import { MessagesSubjects } from './enums';

export interface ContactFormRequest {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  messageSubject: MessagesSubjects[];
}

export interface SendEmailEndpointPayload extends ContactFormRequest {
  whatsapp: string;
  linkedin: string;
  tiktok: string;
  instagram: string;
  date?: string;
  en: boolean;
}
