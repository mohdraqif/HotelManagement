import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader";

// Define interfaces for the booking data
interface Booking {
    _id: string;
    room: string;
    fromdate: string;
    todate: string;
    totalamount: number;
    status: string;
}

function UserBookings() {
    const [userBookings, setUserBookings] = useState<Booking[]>([]); // Specify the type of userBookings
    const [loading, setLoading] = useState<boolean>(false); // Specify that loading is a boolean
    const [error, setError] = useState<Error | null>(null); // Error type is Error or null

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.post('/bookings/getuserbookings');
                setUserBookings(response.data); // Response data is assumed to match the Booking type
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error as Error); // Explicitly casting error to Error type
            }
        }
        fetchData();
    }, []);

    const cancelledUserBooking = async (bookingId: string) => { // Specify bookingId type as string
        try {
            setLoading(true);
            await axios.post("/bookings/canceluserbooking", { bookingId });
            setUserBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
        alert("Booking cancelled! Return to homepage.");
    };

    return (
        <div className='user-bookings'>
            <div className="home-btn flex">
                <h1>My bookings</h1>
                <button className="btn-book"><a href="/">Back to home</a></button>
            </div>
            {loading && <Loader />}
            {userBookings.length === 0 && <div><h1>You have no bookings!</h1></div>}
            {userBookings.map((booking) => {
                return (
                    <div className='booking-card' key={booking._id}>
                        <p>Room Name: {booking.room}</p>
                        <p>CheckIn Date: {booking.fromdate}</p>
                        <p>Checkout Date: {booking.todate}</p>
                        <p>Amount: {booking.totalamount}</p>
                        <p>Status: {booking.status === "Booked" ? "Confirmed" : "Cancelled"}</p>
                        <div className='cancel-booking'>
                            <button onClick={() => cancelledUserBooking(booking._id)}>Cancel booking</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default UserBookings;
