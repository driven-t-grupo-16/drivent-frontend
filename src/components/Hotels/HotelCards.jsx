import { useEffect, useState } from "react";
import styled from "styled-components";


export function HotelCards({ hotel, hotelSelected, setHotelSelected }) {
  console.log(hotelSelected);
  const toggleSelection = (id) => {
    if (id == hotelSelected) return setHotelSelected(0);
    setHotelSelected(id);
  };

  return (
    <HotelCard id={hotel.id} selected={hotelSelected} onClick={() => toggleSelection(hotel.id)}>
      <img src={hotel.img} />
      <h1>{hotel.name}</h1>
      <h2>Tipos de acomodação:</h2>
      <p>{hotel.type}</p>
      <h2>Vagas disponíveis:</h2>
      <p>{hotel.availableVacancies}</p>
    </HotelCard>
  );
}

export const HotelCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => (props.selected == undefined) ? "#FFEED2" : (props.selected == props.id) ? '#FFEED2' : '#EBEBEB'};
  width: 196px;
  height: 264px;
  padding: 16px 14px 0;
  border-radius: 10px;
  cursor: ${props => (props.selected == props.id) ? 'default' : 'pointer'};
  
  > img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    object-fit: cover;
  }

  > h1 {
    color: #343434;
    font-weight: 400;
    font-size: 20px;
    margin: 10px 0;
  }
  > h2 {
    color: #3C3C3C;
    font-weight: 700;
    font-size: 12px;
  }
  > p {
    color: #3C3C3C;
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 14px;
  }
`;