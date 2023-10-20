/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components"

export function CardButton({price, text, setTicketType, setIncludesHotel, ticketType, includesHotel}) {
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  
  function setData() {
    if(text === 'Presencial'|| text === 'Online') {
      if(ticketType === '') {
        if(text === 'Presencial') {
        setTicketType('Presencial');
        setIsTypeSelected(true)
        }
        else if (text === 'Online') {
          setTicketType('Online');
          setIsTypeSelected(true);
        }
      }

      if(ticketType === 'Presencial') {
        if(text === 'Presencial' && includesHotel !== null) {
          setTicketType('');
          setIsTypeSelected(false);
          setIncludesHotel(null)
        }
        else if (text === 'Online' ) {
          setTicketType('Online');
          setIsTypeSelected(true);
          setIncludesHotel(null)
        }
      }

      if(ticketType === 'Online'){
        if (text === 'Presencial') {
          setTicketType('Presencial');
          setIsTypeSelected(true);
        }
        else if (text === 'Online') {
          setTicketType('');
          setIsTypeSelected(false);
        }
      }
      
      else if(text === 'Online' && ticketType === 'Presencial') {
        setTicketType('Online');
        setIsTypeSelected(true);
      }
    }
    else {
      if(text === 'Com hotel' && includesHotel === null) {
        setIncludesHotel(true)
        setIsTypeSelected(true)
      }
      else if(text === 'Com hotel' && includesHotel === true) {
        setIncludesHotel(null)
        setIsTypeSelected(true)
      }
      else if(text === 'Com hotel' && includesHotel === false) {
        setIncludesHotel(true)
      }
      else if(text === 'Sem hotel' && includesHotel === null) {
        setIncludesHotel(false)
      }
      else if(text === 'Sem hotel' && includesHotel === false) {
        setIncludesHotel(null)
      }
      else if(text === 'Sem hotel' && includesHotel === true) {
        setIncludesHotel(false)
      }
    }
  }
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