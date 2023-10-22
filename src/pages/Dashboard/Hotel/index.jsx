import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { HotelCards } from '../../../components/Hotels/HotelCards';
import HotelRooms from '../../../components/Hotels/RoomsContainer';
import { MyReservation } from '../../../components/Hotels/MyReservation';
import axios from 'axios';


export default function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [hotelSelected, setHotelSelected] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(true);
  const [includesHotel, setIncludesHotel] = useState(true);
  const [haveHotel, setHaveHotel] = useState(undefined); // genericObject[0]


  if (!paymentConfirmed || !includesHotel) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <ErrorContainer>
          {
            (paymentConfirmed) ?
              (!includesHotel) && <h2>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</h2>
              : <h3>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h3>
          }
        </ErrorContainer>
      </>
    );
  }

  if (haveHotel) {
    return (
      <MyReservation hotel={haveHotel} />
    );
  }

  useEffect(() => {
    const fetchHotels = async() => {
        try {
            // const token = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : null;
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3NywiaWF0IjoxNjk3ODg0Mzc2fQ.qeGMHn16gUHdp5Rc7bZ6Yobrqv8hzo3aiJ4sBs6mRXg";
  
            const res = await axios.get(import.meta.env.VITE_API_URL + `/hotels`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res.data;

            const hotels = await Promise.all(
                data.map(async (hotel) => {
                    const hotelRes = await axios.get(import.meta.env.VITE_API_URL + `/hotels/${hotel.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return hotelRes.data;
                })
            );
            setHotels(hotels);
        } catch (error) {
            console.error("Erro ao buscar hotéis:", error);
        }
    }

    fetchHotels();
  }, [])

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <HotelsContainer>
        <h2>Primeiro, escolha seu hotel</h2>
        <HotelsWrapper>
          {hotels.map((hotel)=><HotelCards key={hotel.id} hotel={hotel} setHotelSelected={setHotelSelected} hotelSelected={hotelSelected} />)}
        </HotelsWrapper>
      </HotelsContainer>
      {(hotelSelected != 0) && (
        <HotelRooms rooms={hotels.find((hotel) => hotel.id === hotelSelected).Rooms} />
      )} 
    </>
  );

}

export const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

export const HotelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;

  > h2 {
    width: 464px;
    font-weight: 400;
    font-size: 20px;
    margin: 10px 0 15px;
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

export const ErrorContainer = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  color: #8E8E8E;

  > h2 {
    width: 550px;
  }
  > h3 {
    width: 480px;
  }
`;