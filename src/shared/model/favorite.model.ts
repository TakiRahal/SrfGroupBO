import dayjs from 'dayjs';
import {IUser} from "./user.model";

export interface IFavorite {
  id?: number;
  favoriteDate?: string | null;
  currentUser?: IUser | null;
  favoriteUser?: IUser | null;
}

export const defaultValue: Readonly<IFavorite> = {};
