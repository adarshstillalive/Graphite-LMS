import { Counts } from '../../../application/useCases/admin/order/adminOrderUseCase.js';

interface OrderRepository {
  approveReturnRequest(
    requestId: string,
    orderId: string,
    userId: string,
  ): Promise<void>;
  fetchListingCounts(): Promise<Counts>;
}

export default OrderRepository;
