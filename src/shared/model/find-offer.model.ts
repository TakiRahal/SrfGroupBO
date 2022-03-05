import {IOffer} from "./offer.model";

export interface IFindOffer extends IOffer {
  id?: number;
  amount?: number | null;
}

export const defaultValue: Readonly<IFindOffer> = {};
