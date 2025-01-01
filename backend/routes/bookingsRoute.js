const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");
const booking = require("../models/booking");

router.post("/bookroom", async (req, res) => {
    const {
        room,
        roomid,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays
    } = req.body;

    try {
        const newBooking = new Booking({
            status: "Booked",
            room: room.name,
            roomid,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays
        })
        const booking = await newBooking.save();
        await Room.updateOne(
            { code: room.code },
            {
                $push: {
                    currentbookings: {
                        bookingId: booking._id,
                        status: booking.status,
                        userId: booking.userid,
                        fromDate: booking.fromdate,
                        toDate: booking.todate,
                    }
                }
            }
        );

        return res.send("Room booked successfully!");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getuserbookings", async (req, res) => {
    try {
        const bookings = await Booking.find({ status: "Booked" });
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.post("/canceluserbooking", async (req, res) => {
    const { bookingId } = req.body;

    try {
        await Booking.updateOne(
            { _id: bookingId },
            { $set: { status: "Cancelled" } }
        );

        const deleteResult = await Booking.findByIdAndDelete(bookingId);
        if (deleteResult) {
            return res.status(200).json({ message: "Booking cancelled and removed", bookingId });
        } else {
            return res.status(500).json({ error: "Failed to remove booking" });
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

module.exports = router;
