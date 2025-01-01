import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

interface Room {
    code: string;
    name: string;
    imageurls: string[];
    rentperday: number;
    maxcount: number;
}

interface Params {
    [key: string]: string | undefined
}

const Bookingscreen: React.FC = () => {
    const params = useParams<Params>();
    const [loading, setloading] = useState<boolean>(true);
    const [error, seterror] = useState<boolean>(false);
    const [room, setroom] = useState<Room | undefined>();

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                const data = (await axios.post("/rooms/getroombyid", { roomid: params.roomid })).data;
                setroom(data.room[0]);
                setloading(false);
            } catch (error) {
                setloading(false);
                seterror(true);
            }
        }
        fetchData();
    }, [params.roomid]);

    const calculateDays = (): number => {
        const start = moment(params.startDate, 'DD-MM-YYYY');
        const end = moment(params.endDate, 'DD-MM-YYYY');
        return end.diff(start, 'days') + 1;
    };

    const generateUserId = (): string => {
        const uuid = uuidv4();
        return uuid.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15);
    };

    const userId = generateUserId();

    const bookRoom = async () => {
        if (!room) return;
        const bookingDetails = {
            room,
            roomid: room.code,
            userid: userId,
            fromdate: params.startDate,
            todate: params.endDate,
            totalamount: calculateDays() * room.rentperday,
            totaldays: calculateDays(),
        };
        try {
            await axios.post('/bookings/bookroom', bookingDetails);
            alert("Booked successfully! Return to homepage.");
        } catch (error) {
            seterror(true);
        }
    };

    return (
        <div className="info-page">
            <div className="home-btn">
                <button className="btn-book"><a href="/">Back to home</a></button>
            </div>
            {loading ? <Loader /> : room ? (
                <div className="room-info-card">
                    <div className="amount">
                        <h2 id="room-name">{room.name}</h2>
                    </div>
                    <div className="room-info">
                        <div className="room-info-image">
                            <img src={room.imageurls[0]} className="bigimg" alt="Hotel Room" />
                        </div>
                        <div className="amount">
                            <h2>Booking Details</h2>
                            <hr />
                            <p>Room ID: {params.roomid}</p>
                            <p>From Date: {params.startDate}</p>
                            <p>To Date: {params.endDate}</p>
                            <p>Max count: {room.maxcount} </p>
                        </div>
                        <div className="amount">
                            <h2>Amount</h2>
                            <p>Total Days: {calculateDays()}</p>
                            <p>Rent per day: {room.rentperday}</p>
                            <p>Total Amount: {calculateDays() * room.rentperday}</p>
                            <button className="btn-book book-now" onClick={bookRoom}>Book Now</button>
                        </div>
                    </div>
                </div>
            ) : (<Error />)}
        </div>
    );
};

export default Bookingscreen;
