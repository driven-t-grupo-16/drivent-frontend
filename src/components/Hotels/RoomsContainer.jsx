import RoomCard from "./RoomCard";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { RoomsContainer, RoomsWrapper, SubmitRoom } from ".";

export default function HotelRooms({ rooms, fetchHotels, bookingId, changing, setChanging }) {
  const navigate = useNavigate();
  const [roomSelected, setRoomSelected] = useState(0);
  const token = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : null;

  function submitRoomId(bookingId) {
    if (roomSelected === 0) {
      return toast('Selecione um quarto para fazer sua reserva!');
    }
    const url = bookingId !== 0 ? import.meta.env.VITE_API_URL + `/booking/${bookingId}` : import.meta.env.VITE_API_URL + `/booking`;
    const method = bookingId !== 0 ? 'put' : 'post';

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

      <SubmitRoom onClick={() => submitRoomId(bookingId)}>{bookingId !== 0 ? "ATUALIZAR RESERVA" : "RESERVAR QUARTO"}</SubmitRoom>
    </RoomsContainer>
  );
}