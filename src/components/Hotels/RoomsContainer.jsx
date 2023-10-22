import styled from "styled-components";
import RoomCard from "./RoomCard";
import { useState } from "react";
import axios from "axios";

export default function HotelRooms( { rooms }) {
    const [roomSelected, setRoomSelected ] = useState(0);
    // const token = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : null;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3NywiaWF0IjoxNjk3ODg0Mzc2fQ.qeGMHn16gUHdp5Rc7bZ6Yobrqv8hzo3aiJ4sBs6mRXg";

    function submitRoomId(){
        if (roomSelected === 0) return;
        console.log(roomSelected, token);
        axios.post(import.meta.env.VITE_API_URL + `/booking`, { roomId: roomSelected }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log("Reserva feita com sucesso:", response.data)
        })
        .catch((error) => {
            console.error("Erro ao reservar quarto:", error)
        })
    }

    return (
        <RoomsContainer>
            <h2>Ótima pedida! Agora escolha seu quarto:</h2>
            <RoomsWrapper>
                {rooms.map((room) => 
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