'use client';

import { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, Bar, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { fetchOrdersForChartLine } from '@/services/admin/orderService';
import { TrendingUp } from 'lucide-react';

type FilterType = 'day' | 'week' | 'month' | 'year';

interface ChartDataItem {
  label: string;
  value: number;
}

interface FormattedChartDataItem extends ChartDataItem {
  originalLabel?: string;
}

export function ChartLine() {
  const [chartData, setChartData] = useState<FormattedChartDataItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('day');

  const formatChartData = (data: ChartDataItem[]): FormattedChartDataItem[] => {
    const dayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return data.map((item) => ({
      ...item,
      originalLabel: item.label,
      label:
        filter === 'day'
          ? dayNames[new Date(item.label).getDay()]
          : filter === 'week'
            ? `Week ${item.label}`
            : filter === 'month'
              ? monthNames[new Date(item.label).getMonth()]
              : `Year ${item.label}`,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOrdersForChartLine(filter);
        setChartData(formatChartData(response.data));
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterType);
  };

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>Order Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="day">Last 7 Days</option>
            <option value="week">Last 7 Weeks</option>
            <option value="month">Last 12 Months</option>
            <option value="year">Last 5 Years</option>
          </select>
        </div>
        <ChartContainer
          config={{ desktop: { label: 'Orders', color: 'black' } }}
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 12, left: 12, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="value"
              fill="black"
              radius={[4, 4, 0, 0]}
              barSize={60}
            />
          </BarChart>
        </ChartContainer>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Total orders purchased <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total orders on {filter} basis
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
