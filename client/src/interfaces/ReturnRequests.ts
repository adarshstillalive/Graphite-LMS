import { ICourse } from './Course';
import { IOrder } from './Order';
import { IUser } from './User';

export interface IPopulatedReturnRequests {
  orderId: IOrder;
  userId: IUser;
  itemId: ICourse;
  price: number;
  reason: string;
  isApproved: boolean;
  isRejected: boolean;
  createdAt: Date;
  updatedAt: Date;
}
