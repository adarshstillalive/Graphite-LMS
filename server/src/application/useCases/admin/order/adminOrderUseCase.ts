import OrderRepository from '../../../../domain/repositories/admin/OrderRepository.js';

export interface Counts {
  courses: number;
  instructors: number;
  users: number;
  orders: number;
}

class AdminOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async handleReturnRequest(
    requestId: string,
    orderId: string,
    userId: string,
    status: string,
  ) {
    try {
      if (status === 'approve') {
        await this.orderRepository.approveReturnRequest(
          requestId,
          orderId,
          userId,
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error('Usecase Error: Handling return request');
    }
  }

  async fetchListingCounts() {
    try {
      return await this.orderRepository.fetchListingCounts();
    } catch (error) {
      console.log(error);
      throw new Error('Usecase Error: Fetching listing counts');
    }
  }
}

export default AdminOrderUseCase;
