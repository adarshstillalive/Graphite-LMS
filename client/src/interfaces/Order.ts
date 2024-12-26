import { ICourse } from './Course';

export interface IProduct {
  courseId: ICourse;
  price: number;
  returned: string;
  returnedDate?: Date;
  returningReason?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
