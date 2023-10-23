import styled from "styled-components";
import RoomCard from "./RoomCard";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function HotelRooms({ rooms, bookingId, fetchHotels, changing, setChanging }) {
  const navigate = useNavigate();
  const [roomSelected, setRoomSelected] = useState(0);
  const token = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : null;

  function submitRoomId(bookingId) {
    if (roomSelected === 0) {
      return toast('Selecione um quarto para fazer sua reserva!');
    }
    const url = bookingId ? import.meta.env.VITE_API_URL + `/booking/${bookingId}` : import.meta.env.VITE_API_URL + `/booking`;
    const method = bookingId ? 'put' : 'post';

    axios[method](url, { roomId: roomSelected }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log("Reserva feita com sucesso:", response.data);
        fetchHotels();
        if (changing) {
          setChanging(false);
          toast("Reserva atualizada com sucesso!");
        } else {
          toast("Reserva feita com sucesso!");
        }
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

      <SubmitRoom onClick={submitRoomId}>{bookingId ? "ATUALIZAR RESERVA" : "RESERVAR QUARTO"}</SubmitRoom>
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