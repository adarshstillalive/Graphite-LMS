import InstructorPaymentRepository from '../../../domain/repositories/admin/InstructorPaymentRepository.js';

class InstructorPaymentUseCase {
  constructor(
    private instructorPaymentRepository: InstructorPaymentRepository,
  ) {}

  async fetchValidOrders() {
    try {
      return await this.instructorPaymentRepository.fetchValidOrders();
    } catch (error) {
      console.log(error);
      throw new Error('Usecase Error: Fetching valid orders');
    }
  }

  async updatePayment(courseId: string, orderId: string, totalAmount: number) {
    try {
      const creditAmount = (totalAmount * 80) / 100;
      await this.instructorPaymentRepository.updatePayment(
        courseId,
        orderId,
        creditAmount,
        totalAmount,
      );
    } catch (error) {
      console.log(error);
      throw new Error('Usecase Error: Updating payment');
    }
  }
}

export default InstructorPaymentUseCase;
