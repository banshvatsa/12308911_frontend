const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const bookings = require('./hotel_bookings_1000.json');

app.get('/', (req, res) => {
  res.send('Welcome to the Hotel Booking API! Use /api/bookings to get bookings data.');
});

app.get('/api/bookings', (req, res) => {
  const { startDate, endDate } = req.query;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const filteredBookings = bookings.filter(booking => {
    const checkInDate = new Date(booking.check_in_date);
    const checkOutDate = new Date(booking.check_out_date);
    return (checkInDate <= end && checkOutDate >= start);
  });

  res.json(filteredBookings);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
