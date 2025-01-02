import { IProduct } from '../../infrastructure/databases/mongoDB/models/OrderModel.js';

class Order {
  constructor(
    public userId: string,
    public courses: IProduct[],
    public totalAmount: number,
    public paymentMethod: string,
    public coupon?: string,
    public orderStatus?: string,
    public cancelledDate?: Date,
    public cancellingReason?: string,
    public returnedDate?: Date,
    public returningReason?: string,
    public isInstructorPaymentCompleted?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

export default Order;
