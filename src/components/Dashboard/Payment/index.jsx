import { useState } from "react";
import styled from "styled-components"

export function CardButton({price, text, setTicketType, setIncludesHotel, ticketType, includesHotel}) {
  function setData() {
    setIsTypeSelected(!isTypeSelected)
    if(text === 'Presencial'|| text === 'Online') setTicketType(text)
    if(text === 'Com hotel') setIncludesHotel(!includesHotel)
    if(text === 'Sem hotel') setIncludesHotel(!includesHotel)
  }

  const [isTypeSelected, setIsTypeSelected] = useState(false);
  return (
    <Card onClick={()=> setData()} selected={isTypeSelected}>
      <p>{text}</p>
      <span>R${price}</span>
    </Card>
  )
}

const Card = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 145px;
  height: 145px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #CECECE;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  cursor: pointer;
  background-color: ${props => props.selected  ? '#FFEED2' : 'transparent'};
  p{
    color: #454545;
    font-size: 16px;
  }

  span{
    color: #898989;
    font-size: 14px;
  }
`