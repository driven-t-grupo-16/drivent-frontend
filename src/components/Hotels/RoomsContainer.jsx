import styled from "styled-components";
import RoomCard from "./RoomCard";
import { useState } from "react";

const genericRooms = [
    {
        id: 1,
        number: "101",
        capacity: 2,
        occupiedVacancies: 0,
    },
    {
        id: 2,
        number: "101",
        capacity: 2,
        occupiedVacancies: 0,
    },
    { 
        id: 3,
        number: "101",
        capacity: 1,
        occupiedVacancies: 0,
    },
    {
        id: 4,
        number: "101",
        capacity: 2,
        occupiedVacancies: 0,
    },
    {
        id: 5,
        number: "101",
        capacity: 1,
        occupiedVacancies: 0,
    },
    {
        id: 6,
        number: "101",
        capacity: 2,
        occupiedVacancies: 1,
    },
    {
        id: 7,
        number: "101",
        capacity: 3,
        occupiedVacancies: 2,
    },
    {
        id: 8,
        number: "101",
        capacity: 2,
        occupiedVacancies: 2,
    },

]

export default function HotelRooms() {
    const [roomSelected, setRoomSelected ] = useState(0);

    function submitRoomId(){
        console.log(roomSelected);
    }

    return (
        <RoomsContainer>
            <h2>Ótima pedida! Agora escolha seu quarto:</h2>
            <RoomsWrapper>
                {genericRooms.map((room) => 
                    <RoomCard 
                        key={room.id} room={room} 
                        setRoomSelected={setRoomSelected} roomSelected={roomSelected} 
                    />
                    )}
            </RoomsWrapper>
            
            <SubmitRoom onClick={submitRoomId}>RESERVAR QUARTO</SubmitRoom>
        </RoomsContainer>
    );
}

export const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > h2 {
    font-weight: 400;
    font-size: 20px;
    margin: 10px 0;
    color: #8E8E8E;
  }
`;

export const RoomsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 17px;
  margin-top: 15px;
`;

export const SubmitRoom = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  background-color: #E0E0E0;
  font-size: 14px;
  font-weight: 400;
  align-items: center;
  border: none;
  box-shadow: 4px 4px 10px rgba(224, 224, 224, 0.5);
  cursor: pointer;
  margin-top: 30px;
`;