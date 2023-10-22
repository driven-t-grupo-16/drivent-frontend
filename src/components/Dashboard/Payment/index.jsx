/* eslint-disable react/prop-types */
import { useEffect } from "react";
import styled from "styled-components"

export function CardButton({price, text, setTicketType, setIncludesHotel, ticketType, includesHotel, setTotal}) {

  const isSelected = ticketType === text || (text === 'Com hotel' && includesHotel === true) 
    || (text === 'Sem hotel' && includesHotel === false);

    function setData() {
      if (text === 'Presencial' || text === 'Online') {
        if (!isSelected) {
          setTicketType(text);
          setIncludesHotel(null);
        } else {
          setTicketType('');
        }
      } else if (text === 'Com hotel' || text === 'Sem hotel') {
        if (!isSelected) {
          setIncludesHotel(text === 'Com hotel' ? true : false);
        }
      }

    }

    useEffect(() => {
      let newTotal = 0;
  
      if (ticketType === 'Presencial') {
        newTotal += 250;
      } else if (ticketType === 'Online') {
        newTotal += 100;
      }
  
      if (includesHotel === true) {
        newTotal = 600;
      } else if (includesHotel === false) {
        newTotal = 250;
      }
  
      setTotal(newTotal);
    }, [ticketType, includesHotel, setTotal]);

  return (
    <Card onClick={()=> setData()} isSelected={isSelected} text={text}>
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
  background-color: ${props => props.isSelected ? '#FFEED2' : 'transparent'};
  p{
    color: #454545;
    font-size: 16px;
  }

  span{
    color: #898989;
    font-size: 14px;
  }
`