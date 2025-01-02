import OrderRepository from '../../../domain/repositories/instructor/OrderRepository.js';

class InstructorOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async fetchInstructorOrders(instructorId: string) {
    try {
      return await this.orderRepository.fetchInstructorOrders(instructorId);
    } catch (error) {
      console.log(error);
      throw new Error('Usecase Error: Fetching instructor orders');
    }
  }
}

export default InstructorOrderUseCase;
