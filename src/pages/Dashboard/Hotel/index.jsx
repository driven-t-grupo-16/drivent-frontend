import { useState, useEffect } from 'react';
import { HotelCards } from '../../../components/Hotels/HotelCards';
import HotelRooms from '../../../components/Hotels/RoomsContainer';
import { MyReservation } from '../../../components/Hotels/MyReservation';
import axios from 'axios';
import { ErrorContainer, HotelsContainer, HotelsWrapper, StyledTypography } from '../../../components/Hotels';


export default function Hotel() {
    const [hotels, setHotels] = useState([]);
    const [hotelSelected, setHotelSelected] = useState(0);
    const [paymentConfirmed, setPaymentConfirmed] = useState(true);
    const [includesHotel, setIncludesHotel] = useState(true);
    const [haveHotel, setHaveHotel] = useState(undefined);

    const fetchHotels = async () => {
        try {
            const token = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : null;

            const res = await axios.get(import.meta.env.VITE_API_URL + `/hotels`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.booking) {
                setHaveHotel(res.data.booking);
            }

            const data = res.data.hotels;

            const mappedHotels = await Promise.all(
                data.map(async (hotel) => {
                    const hotelRes = await axios.get(import.meta.env.VITE_API_URL + `/hotels/${hotel.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return hotelRes.data;
                })
            );
            setHotels(mappedHotels);
        } catch (error) {
            console.error("Erro ao buscar hotéis:", error);
            if (error.response.data === `You must purchase a ticket!` ||
                error.response.data === `You must finish enrolling!` ||
                error.response.data === `You must confirm payment before booking!`) setPaymentConfirmed(false);
            if (error.response.data === `Your ticket doesn't require a hotel!`) setIncludesHotel(false);
        }
    }

    useEffect(() => {
        fetchHotels();
    }, [])


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
            <MyReservation data={haveHotel} hotels={hotels} fetchHotels={fetchHotels} />
        );
    }

    return (
        <>
            <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
            <HotelsContainer>
                <h2>Primeiro, escolha seu hotel</h2>
                <HotelsWrapper>
                    {hotels.map((hotel) => <HotelCards key={hotel.id} hotel={hotel} setHotelSelected={setHotelSelected} hotelSelected={hotelSelected} />)}
                </HotelsWrapper>
            </HotelsContainer>
            {(hotelSelected != 0) && (
                <HotelRooms rooms={hotels.find((hotel) => hotel.id === hotelSelected).Rooms} fetchHotels={fetchHotels} bookingId={0} />
            )}
        </>
    );

}