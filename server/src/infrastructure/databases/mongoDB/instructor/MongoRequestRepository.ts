import InstructorRequest from '../../../../domain/entities/InstructorRequest.js';
import RequestRepository from '../../../../domain/repositories/instructor/RequestRepository.js';
import InstructorRequestModel from '../models/InstructorRequest.js';

class MongoRequestRepository implements RequestRepository {
  async sendRequest(request: InstructorRequest): Promise<InstructorRequest> {
    try {
      const requestData = new InstructorRequestModel(request);
      await requestData.save();
      return requestData.toObject();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in sending request', error);

      throw new Error(error);
    }
  }

  async fetchRequest(userId: string): Promise<InstructorRequest> {
    try {
      const requestData = await InstructorRequestModel.findOne({
        userId: userId,
      });
      if (!requestData) {
        throw new Error('No request available');
      }
      return requestData;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Error in fetching requests', error);

      throw new Error(error);
    }
  }
}

export default MongoRequestRepository;
