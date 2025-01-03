import OrderRepository from '../../../../domain/repositories/admin/OrderRepository.js';
export interface Counts {
  courses: number;
  instructors: number;
  users: number;
  orders: number;
}

export interface ChartLineData {
  label: string;
  value: number;
}

export interface MatchCondition {
  createdAt: {
    $gte: Date;
  };
}

export interface GroupCondition {
  _id: {
    $dateToString: {
      format: '%Y-%m-%d' | '%Y-%U' | '%Y-%m' | '%Y';
      date: string;
    };
  };
  totalOrders: {
    $sum: number;
  };
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

  async fetchOrdersForChartLine(
    filter: 'day' | 'week' | 'month' | 'year',
  ): Promise<ChartLineData[]> {
    const now = new Date();
    let matchCondition: MatchCondition;
    let groupCondition: GroupCondition;
    let limit = 7; // Default to 7 days or weeks

    switch (filter) {
      case 'day':
        {
          matchCondition = {
            createdAt: { $gte: new Date(now.setDate(now.getDate() - 7)) },
          };
          groupCondition = {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
            },
            totalOrders: { $sum: 1 },
          };
        }
        break;
      case 'week':
        {
          matchCondition = {
            createdAt: { $gte: new Date(now.setDate(now.getDate() - 49)) },
          }; // 7 weeks
          groupCondition = {
            _id: {
              $dateToString: { format: '%Y-%U', date: '$createdAt' }, // Group by week of year
            },
            totalOrders: { $sum: 1 },
          };
        }
        limit = 7;
        break;
      case 'month':
        {
          matchCondition = {
            createdAt: { $gte: new Date(now.setMonth(now.getMonth() - 12)) },
          }; // 12 months
          groupCondition = {
            _id: {
              $dateToString: { format: '%Y-%m', date: '$createdAt' }, // Group by month
            },
            totalOrders: { $sum: 1 },
          };
        }
        limit = 12;
        break;
      case 'year':
        {
          matchCondition = {
            createdAt: {
              $gte: new Date(now.setFullYear(now.getFullYear() - 5)),
            },
          }; // 5 years
          groupCondition = {
            _id: {
              $dateToString: { format: '%Y', date: '$createdAt' }, // Group by year
            },
            totalOrders: { $sum: 1 },
          };
          limit = 5;
        }
        break;
      default:
        {
          matchCondition = {
            createdAt: {
              $gte: new Date(now.setFullYear(now.getFullYear() - 5)),
            },
          }; // 5 years
          groupCondition = {
            _id: {
              $dateToString: { format: '%Y', date: '$createdAt' }, // Group by year
            },
            totalOrders: { $sum: 1 },
          };
          limit = 5;
        }
        break;
    }

    try {
      return await this.orderRepository.fetchOrdersForChartLine(
        matchCondition,
        groupCondition,
        limit,
      );
    } catch (error) {
      console.error('Error fetching chart line data:', error);
      throw new Error('Usecase Error: Fetching orders for chart line');
    }
  }
}

export default AdminOrderUseCase;
