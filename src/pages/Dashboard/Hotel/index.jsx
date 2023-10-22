import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { HotelCards } from '../../../components/Hotels/HotelCards';
import HotelRooms from '../../../components/Hotels/RoomsContainer';

const genericObject = [
  {
    id: 1,
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/8d/a8/29/grand-oca-maragogi-resort.jpg?w=700&h=-1&s=1",
    name: "Driven Resort",
    type: "Single e Double",
    availableVacancies: 60
  },
  {
    id: 2,
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/8d/a8/29/grand-oca-maragogi-resort.jpg?w=700&h=-1&s=1",
    name: "Driven Resort2",
    type: "Single",
    availableVacancies: 80
  },
  {
    id: 3,
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/8d/a8/29/grand-oca-maragogi-resort.jpg?w=700&h=-1&s=1",
    name: "Driven Resort",
    type: "Single e Double",
    availableVacancies: 54
  }
];

export default function Hotel() {
  
  const [hotelSelected, setHotelSelected] = useState(0);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <HotelsContainer>
        <h2>Primeiro, escolha seu hotel</h2>
        <HotelsWrapper>
          {genericObject.map((hotel)=><HotelCards key={hotel.id} hotel={hotel} setHotelSelected={setHotelSelected} hotelSelected={hotelSelected} />)}
        </HotelsWrapper>
      </HotelsContainer>
      {(hotelSelected != 0) && <HotelRooms/>} 
    </>
  );
}



const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

export const HotelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;

  > h2 {
    font-weight: 400;
    font-size: 20px;
    margin: 10px 0;
    color: #8E8E8E;
  }

`;

export const HotelsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 15px;
`;


