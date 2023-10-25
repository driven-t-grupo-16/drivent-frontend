import { useEffect, useState } from "react";
import { HotelCard } from ".";


export function HotelCards({ hotel, hotelSelected, setHotelSelected }) {
  console.log(hotelSelected);
  const toggleSelection = (id) => {
    if (id == hotelSelected) return setHotelSelected(0);
    setHotelSelected(id);
  };

  const available = hotel.Rooms.reduce((total, room) => {
    const booked = room.Booking.length;
    return total + room.capacity - booked;
  }, 0);

  const roomTypes = hotel.Rooms.map((room) => room.capacity);
  let hotelType = '';
  
  if (roomTypes.includes(1)) hotelType += "Single";
  if (roomTypes.includes(2)) {
    if (roomTypes.includes(3)) {
        hotelType += (hotelType ? ", " : "") + "Double e Triple";
    } else {
        hotelType += (hotelType ? " e " : "") + "Double";
    }
  } else if (roomTypes.includes(3)) {
    hotelType += (hotelType ? " e " : "") + "Triple";
  }

  return (
    <HotelCard id={hotel.id} selected={hotelSelected} onClick={() => toggleSelection(hotel.id)}>
      <img src={hotel.image} />
      <h1>{hotel.name}</h1>
      <h2>Tipos de acomodação:</h2>
      <p>{hotelType}</p>
      <h2>Vagas disponíveis:</h2>
      <p>{available}</p>
    </HotelCard>
  );
}

