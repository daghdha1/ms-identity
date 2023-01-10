import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTrackingDto {
  @IsString()
  courier: any;
  @IsString()
  trackingNumber: string;
  @IsString()
  zipCode: string;
  @IsOptional()
  destinationCountryIso3?: any;
  @IsArray()
  notificationPlatform: string[];
  @IsString()
  recipientNotification: string;
  @IsString()
  recipient: string;
  @IsString()
  email: string;
  @IsString()
  street: string;
  @IsString()
  city: string;
  @IsString()
  phone: string;
  @IsOptional()
  languageIso3?: any;
}
