import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface RoomType {
    code: string;
    name: string;
    location: string;
    type: string;
    imageurls: string[];
    rentperday: number;
    maxcount: number;
    description: string;
}

const Homescreen: React.FC = () => {
    const [rooms, setrooms] = useState<RoomType[]>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [error, seterror] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [availableRooms, setAvailableRooms] = useState<RoomType[]>([]);
    const [searchKey, setSearchKey] = useState<string>('');
    const [roomType, setRoomType] = useState<string>('all');

    const filterByLocation = () => {
        if (searchKey.trim() === "") {
            setrooms(availableRooms);
        } else {
            const filteredRooms = availableRooms.filter(room =>
                room.location.trim().toLowerCase() === searchKey.trim().toLowerCase()
            );
            setrooms(filteredRooms);
        }
    };

    const filterByType = (e: string) => {
        setRoomType(e);
        if (e !== 'all') {
            const filteredRooms = availableRooms.filter(room =>
                room.type.toLowerCase() === e.toLowerCase()
            );
            setrooms(filteredRooms);
        } else {
            setrooms(availableRooms);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                const data = (await axios.get('/rooms/getAllRooms')).data;
                setrooms(data.rooms);
                setAvailableRooms(data.rooms);
                setloading(false);
            } catch (error) {
                seterror(true);
                setloading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='homescreen'>
            <div className='inner-home'>
                <h1>Hotel Booking</h1>
                <div className='user-options'>
                    <div className='row'>
                        <DatePicker placeholderText='Check-In Date' selected={startDate} onChange={(date) => setStartDate(date)} />
                        <DatePicker placeholderText='Check-Out Date' selected={endDate} onChange={(date) => setEndDate(date)} />
                    </div>
                    <div className='row'>
                        <input type='text' className='form-control' placeholder='Search by location'
                            value={searchKey} onChange={(e) => setSearchKey(e.target.value)} onKeyUp={filterByLocation} />
                    </div>
                    <div className='row'>
                        <select value={roomType} onChange={(e) => { filterByType(e.target.value) }}>
                            <option value="all">All</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="non-deluxe">Non-Deluxe</option>
                        </select>
                    </div>

                    <div className='navbar'>
                        <button><a href='/bookings'>My Bookings</a></button>
                    </div>
                </div>

                <div className='container-item'>
                    {loading ? <Loader /> : (
                        rooms.map(room => {
                            return <Room room={room} startDate={startDate} endDate={endDate} key={room.code} />
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default Homescreen;
