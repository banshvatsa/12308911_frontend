import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Chart from 'react-apexcharts';
import { BookingData, BookingsResponse } from '../types/dataTypes';

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [data, setData] = useState<BookingsResponse>([]);

  useEffect(() => {
    if (startDate && endDate) {
      axios.get<BookingsResponse>('http://localhost:5000/api/bookings', {
        params: { 
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString() 
        }
      })
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
    }
  }, [startDate, endDate]);

  const timeSeriesOptions = {
    chart: { id: 'visitors-time-series' },
    xaxis: { type: 'datetime' as const },
  };

  const columnOptions = {
    chart: { type: 'bar' as const },
    xaxis: { categories: data.map((item: BookingData) => item.customer_name) },
    series: [{ name: 'Price', data: data.map((item: BookingData) => item.price) }]
  };

  const adultSparkOptions = {
    chart: { type: 'line' as const, sparkline: { enabled: true } },
  };
  const adultSparkSeries = [{ name: 'Adults', data: data.map((item: BookingData) => item.price) }];

  const childrenSparkOptions = {
    chart: { type: 'line' as const, sparkline: { enabled: true } },
  };
  const childrenSparkSeries = [{ name: 'Children', data: data.map((item: BookingData) => item.price) }];

  return (
    <div>
      <h2>Hotel Booking Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          selectsStart
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          selectsEnd
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          minDate={startDate ?? undefined}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Visitors Over Time</h3>
        <Chart
          options={timeSeriesOptions}
          series={[{
            name: 'Visitors',
            data: data.map((item: BookingData) => ({
              x: new Date(item.check_in_date).getTime(),
              y: item.price
            }))
          }]}
          type="line"
          height={300}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Visitors by Customer</h3>
        <Chart
          options={columnOptions}
          series={columnOptions.series}
          type="bar"
          height={300}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div>
          <h4>Adult Visitors</h4>
          <Chart
            options={adultSparkOptions}
            series={adultSparkSeries}
            type="line"
            height={100}
            width={150}
          />
        </div>
        <div>
          <h4>Children Visitors</h4>
          <Chart
            options={childrenSparkOptions}
            series={childrenSparkSeries}
            type="line"
            height={100}
            width={150}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
