import dayjs from 'dayjs';
import {IUser} from "./user.model";

export interface INotification {
  id?: number;
  dateCreated?: string | null;
  content?: string | null;
  module?: string | null;
  isRead?: boolean | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<INotification> = {
  isRead: false,
};
