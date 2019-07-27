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
