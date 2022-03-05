import {IOffer} from "./offer.model";

export interface IOfferFavoriteUser {
  offer?: IOffer;
  myFavoriteUser?: boolean;
}

export const defaultValueOFU: Readonly<IOfferFavoriteUser> = {};
