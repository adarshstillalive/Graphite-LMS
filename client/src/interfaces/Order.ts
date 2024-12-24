import { ICourse } from './Course';

export interface IProduct {
  courseId: ICourse;
  price: number;
  returned: boolean;
}

export interface IOrder {
  orderId: string;
  userId: string;
  courses: IProduct[];
  totalAmount: number;
  coupon?: string;
  orderStatus?: string;
  paymentMethod: string;
  cancelledDate?: Date;
  cancellingReason?: string;
  returnedDate?: Date;
  returningReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
