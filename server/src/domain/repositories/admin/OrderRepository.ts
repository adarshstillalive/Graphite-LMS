import {
  ChartLineData,
  Counts,
  GroupCondition,
  MatchCondition,
} from '../../../application/useCases/admin/order/adminOrderUseCase.js';

interface OrderRepository {
  approveReturnRequest(
    requestId: string,
    orderId: string,
    userId: string,
  ): Promise<void>;
  fetchListingCounts(): Promise<Counts>;
  fetchOrdersForChartLine(
    matchCondition: MatchCondition,
    groupCondition: GroupCondition,
    limit: number,
  ): Promise<ChartLineData[]>;
}

export default OrderRepository;
