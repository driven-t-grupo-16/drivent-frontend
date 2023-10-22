import styled from "styled-components";
import { HotelsContainer, StyledTypography } from "../../pages/Dashboard/Hotel";
import { HotelCard } from "./HotelCards";
import { SubmitRoom } from "./RoomsContainer";

export function MyReservation({hotel}){
    
    function changeRoom(){
        console.log("MUDAR");
    }
    
    return (
        <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <HotelsContainer>
          <h2>Você já escolheu seu quarto:</h2>
          <HotelCard id={hotel.id}>
            <img src={hotel.img} />
            <h1>{hotel.name}</h1>
            <h2>Quarto reservado</h2>
            <p>101 (Double)</p>
            <h2>Pessoas no seu quarto</h2>
            <p>Você e mais 1</p>
          </HotelCard>
          <EditButton onClick={changeRoom}>TROCAR DE QUARTO</EditButton>
        </HotelsContainer>
      </>
    );
}

export const EditButton = styled(SubmitRoom)`
  font-size: 14px;
  font-weight: 700;
  color: #000000;
`