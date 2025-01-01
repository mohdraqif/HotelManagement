import React from 'react';
import { Link } from "react-router-dom";
import moment from "moment";

interface RoomProps {
    room: {
        imageurls: string[];
        name: string;
        location: string;
        description: string;
        type: string;
        code: string;
    };
    startDate?: Date | null;
    endDate?: Date | null;
}

const Room: React.FC<RoomProps> = ({ room, startDate, endDate }) => {
    return (
        <div className='room-card'>
            <div className='room-image'>
                <img src={room.imageurls[0]} className='smallimg' alt='Hotel Room' width={"320px"} />
            </div>

            <div className='room-details'>
                <p id='room-name'>{room.name}</p>
                <p>Location: {room.location}</p>
                <p>{room.description}</p>
                <p>{room.type}</p>
                {startDate && endDate && (
                    <div style={{ float: "right" }}>
                        <Link to={`/book/${room.code}/${moment(startDate).format("DD-MM-YYYY")}/${moment(endDate).format("DD-MM-YYYY")}`}>
                            <button className='btn-book'>Book Now</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Room;
