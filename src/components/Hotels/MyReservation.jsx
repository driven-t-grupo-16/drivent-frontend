import styled from "styled-components";
import { HotelsContainer, StyledTypography, HotelsWrapper } from "../../pages/Dashboard/Hotel";
import { HotelCard, HotelCards } from "./HotelCards";
import HotelRooms, { SubmitRoom } from "./RoomsContainer";
import { useState } from "react";

export function MyReservation({ data, hotels, fetchHotels }) {
  console.log(data);
  const hotel = data.booking.Room.Hotel;
  let occupants = "Você";
  if (data.others.length > 0) occupants += ` e mais ${data.others.length}`
  let roomType;
  switch (data.booking.Room.capacity) {
    case 1:
      roomType = "Single";
      break;
    case 2:
      roomType = "Double";
      break;
    case 3:
      roomType = "Triple";
      break;
    default:
      roomType = "Special";
      break;
  }

  const [changing, setChanging] = useState(false);
  const [hotelSelected, setHotelSelected] = useState(0);
  function toggleChange() {
    if (changing === true) setHotelSelected(0);
    setChanging(!changing);
  }


  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <HotelsContainer>
        <h2>Você já escolheu seu quarto:</h2>
        {changing ? (
          <HotelsWrapper>
            {hotels.map((hotel) => <HotelCards key={hotel.id} hotel={hotel} setHotelSelected={setHotelSelected} hotelSelected={hotelSelected} />)}
          </HotelsWrapper>
        ) : (
          <HotelsWrapper>
            <HotelCard id={hotel.id}>
              <img src={hotel.image} />
              <h1>{hotel.name}</h1>
              <h2>Quarto reservado</h2>
              <p>{data.booking.Room.name} ({roomType})</p>
              <h2>Pessoas no seu quarto</h2>
              <p>{occupants}</p>
            </HotelCard>
          </HotelsWrapper>
        )}

        <EditButton onClick={toggleChange}>TROCAR DE QUARTO</EditButton>

        {(hotelSelected != 0 && changing) && (
          <HotelRooms rooms={hotels.find((hotel) => hotel.id === hotelSelected).Rooms}
            bookingId={data.booking.id}
            fetchHotels={fetchHotels}
            changing={changing}
            setChanging={setChanging}
          />
        )}
      </HotelsContainer>
    </>
  );
}

export const EditButton = styled(SubmitRoom)`
  font-size: 14px;
  font-weight: 700;
  color: #000000;
`