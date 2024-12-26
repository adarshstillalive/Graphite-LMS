import OrderRepository from '../../../../domain/repositories/admin/OrderRepository.js';

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
}

export default AdminOrderUseCase;
