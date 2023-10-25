import { CardRoom, Icon, IconContainer, IconSelected } from ".";

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
            <h1>{room.name}</h1>
            {renderCapacityIcons(room.capacity, room.Booking.length)}
        </CardRoom>
    );
}