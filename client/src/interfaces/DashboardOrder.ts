import { ICourse } from './Course';
import { IUser } from './User';

export interface IDashboardOrder {
  _id: string;
  orderId: string;
  userId: IUser;
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  isInstructorPaymentCompleted: boolean;
  createdAt: Date;
  courses: ICourse[];
}
