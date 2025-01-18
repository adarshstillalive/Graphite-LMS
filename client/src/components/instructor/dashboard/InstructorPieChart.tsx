import { useState, useEffect } from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Label, Pie, PieChart } from 'recharts';
import { IDashboardOrder } from '@/interfaces/DashboardOrder';

const chartConfig = {
  totalOrders: {
    label: 'Total Orders',
    color: 'gray',
  },
  completedPayments: {
    label: 'Payments Completed',
    color: 'black',
  },
} satisfies ChartConfig;

interface ITransformedData {
  category: string;
  visitors: number;
  fill: string;
}

interface IInstructorPieChartProps {
  orders: IDashboardOrder[];
}

const InstructorPieChart: React.FC<IInstructorPieChartProps> = ({ orders }) => {
  const [chartData, setChartData] = useState<ITransformedData[]>([]);

  useEffect(() => {
    const transformedData = [
      {
        category: 'Payments Pending',
        visitors: orders.filter(
          (order: IDashboardOrder) => !order.isInstructorPaymentCompleted
        ).length,
        fill: chartConfig.totalOrders.color,
      },
      {
        category: 'Payments Completed',
        visitors: orders.filter(
          (order: IDashboardOrder) => order.isInstructorPaymentCompleted
        ).length,
        fill: chartConfig.completedPayments.color,
      },
    ];
    setChartData(transformedData);
  }, [orders]);

  return (
    <div className="flex flex-col max-w-[200px] space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold md:text-2xl">Sales Statistics</h2>
      </div>
      <div className="w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-md"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="category"
              innerRadius="50%"
              outerRadius="80%"
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl md:text-3xl font-bold"
                        >
                          {orders.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm md:text-base"
                        >
                          Order(s)
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground md:text-base">
          Total orders and completed payments
        </p>
      </div>
    </div>
  );
};

export default InstructorPieChart;
