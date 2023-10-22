import styled from "styled-components";
import { BsFillPersonFill, BsPerson } from 'react-icons/bs';

export default function RoomCard({ room, setRoomSelected, roomSelected }) {
    function renderCapacityIcons(capacity, occupiedVacancies) {
        const isFull = capacity === occupiedVacancies;
        const selected = isSelected(room.id, roomSelected);

        const freeVacancies = capacity - occupiedVacancies;

        const iconElements = new Array(capacity).fill(null).map((_, index) => {
            if (index < freeVacancies - 1) {
                return <Icon key={index} />;
            } else if (index === freeVacancies - 1) {
                return selected ? <IconSelected key={index} selected={selected} /> : <Icon key={index} />;
            } else {
                return <IconSelected key={index} />;
            }
        });

        return <IconContainer>{iconElements}</IconContainer>;

    }

    function fullColor(capacity, occupiedVacancies) {
        if (capacity === occupiedVacancies) return "true";
        return "false";
    }
    function isSelected(id, roomSelected) {
        if (id == roomSelected) {
            return true;
        }
        return false;
    }
    function selectRoom() {
        if (room.capacity !== room.Booking.length) {
            if (room.id === roomSelected) return setRoomSelected(0);
            setRoomSelected(room.id);
        }
    }

    return (
        <CardRoom
            id={room.id}
            fullcapacity={fullColor(room.capacity, room.Booking.length)}
            selected={isSelected(room.id, roomSelected)}
            onClick={selectRoom}
        >
            <h1>{room.id}</h1>
            {renderCapacityIcons(room.capacity, room.Booking.length)}
        </CardRoom>
    );
}

export const CardRoom = styled.div`
    width: 190px;
    height: 45px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #CECECE;
    border-radius: 10px;
    cursor: pointer;

    > h1 {
        color: #454545;
        font-weight: 700;
        font-size: 20px;
    }

    background-color: ${(props) => (props.fullcapacity === "true" ? "#CECECE" : props.selected ? "#FFEED2" : "transparent")};
    color: ${(props) => (props.fullcapacity === "true" ? "#8C8C8C" : "#000000")};
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: end;
    width: auto;
`;

const IconSelected = styled(BsFillPersonFill)`
    font-size: 27px;
    color: ${(props) => (props.selected) ? "#FF4791" : "#000000"};
`;

const Icon = styled(BsPerson)`
    font-size: 27px;
`;