const mongoose = require('mongoose');
const express = require("express");
const app = express();
const cors = require('cors')
const roomsRoute = require("./routes/roomsRoute");
const bookingsRoute = require("./routes/bookingsRoute");
require('dotenv').config({ path: './env/.env' });

app.use(cors())
app.use(express.json())
app.use("/rooms", roomsRoute);
app.use("/bookings", bookingsRoute);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));