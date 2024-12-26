interface OrderRepository {
  approveReturnRequest(
    requestId: string,
    orderId: string,
    userId: string,
  ): Promise<void>;
}

export default OrderRepository;
