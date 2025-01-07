import cron from 'node-cron';
import InstructorPaymentUseCase from '../../application/useCases/common/instructorPaymentUseCase.js';
import MongoInstructorPaymentRepository from '../databases/mongoDB/common/MongoInstructorPaymentRepository.js';

const instructorPaymentRepository = new MongoInstructorPaymentRepository();
const instructorPaymentUseCase = new InstructorPaymentUseCase(
  instructorPaymentRepository,
);

cron.schedule('* * * * *', async () => {
  // console.log('Running instructor payment processing job...');
  try {
    const orders = await instructorPaymentUseCase.fetchValidOrders();
    console.log(`Found ${orders.length} valid orders for processing.`);

    for (const order of orders) {
      const coursePromises = order.courses.map((course) =>
        instructorPaymentUseCase.updatePayment(
          String(course.courseId),
          String(order._id),
          course.price,
        ),
      );

      try {
        await Promise.all(coursePromises);
        console.log(`Processed order ${order._id} successfully.`);
      } catch (courseError) {
        console.error(
          `Error processing courses for order ${order._id}:`,
          courseError,
        );
      }
    }
  } catch (error) {
    console.error('Error in instructor payment processing job:', error);
  }
});
