import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DictionaryItemDto } from 'src/app/common/DictionaryItemDto';

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
  dictionaryValues?: UserDictionaryValues;
}

export interface UserDictionaryValues {
  eyesColor?: DictionaryItemDto;
  hairColor?: DictionaryItemDto;
  interest?: DictionaryItemDto[];
}

export interface UserFullDto {
  basic: UserDto;
  details: UsersDetailsDto;
}
