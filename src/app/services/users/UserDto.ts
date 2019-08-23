import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface UserCreateDto {
  userDto?: UserDto;
  password?: string;
  birthDate?: NgbDate;
}

export interface UserDto {
  id?: number;
  name?: string;
  displayName?: string;
  birthDate?: string;
  gender?: string;
}

export interface UsersDetailsDto {
  id?: number;
  width?: number;
  height?: number;
  region?: string;
  city?: string;
  tatoos?: string;
  eyesColor?: number;
  hairColor?: number;
  interes?: number[];
}

export interface UserFullDto {
  basic: UserDto;
  details: UsersDetailsDto;
}