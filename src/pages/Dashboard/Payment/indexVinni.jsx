import Typography from '@mui/material/Typography';
import useEnrollment from '../../../hooks/api/useEnrollment';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import useTicket from '../../../hooks/api/useTicket';
import Cards from 'react-credit-cards-2';
import React, { useState } from 'react';
import styled from 'styled-components';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();

  const ticketMock = {
    id: 1,
    status: "RESERVED",
    ticketTypeId: 1,
    enrollmentId: 1,
    TicketType: {
      id: 1,
      name: "string",
      price: 15000,
      isRemote: false,
      includesHotel: true,
      createdAt: new Date().getDay(),
      updatedAt: new Date().getDay(),
    },
    createdAt: new Date().getDay(),
    updatedAt: new Date().getDay(),
  }

  function teste() {
    console.log("oiii");
    console.log(enrollment)
    console.log(ticket)
  }

  const PaymentForm = () => {
    const [state, setState] = useState({
      number: '',
      expiry: '',
      cvc: '',
      name: '',
      focus: '',
    });

    const handleInputChange = (evt) => {
      const { name, value } = evt.target;

      setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
      setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    return (
      <div style={{ display: "flex", flexDirection: 'row', width: '290px' }} >
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <form style={{
          padding: "10px",
          display: 'flex',
          flexWrap: 'wrap',
          gap: "10px"
        }}>

          <input
            style={{
              width: '250px',
              height: '30px',
              border: '1px lightgray solid',
              borderRadius: '8px',
              paddingLeft: '10px'
            }}
            type="number"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />

          <p
            style={{
              width: '250px',
              color: 'gray',
              fontSize: '12px'
            }}>
            E.g.: 49..., 51..., 36..., 37...
          </p>

          <input
            style={{
              width: '250px',
              height: '30px',
              border: '1px lightgray solid',
              borderRadius: '8px',
              paddingLeft: '10px'
            }}
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />

          <input
            style={{
              width: '140px',
              height: '30px',
              border: '1px lightgray solid',
              borderRadius: '8px',
              paddingLeft: '10px'
            }}
            type="number"
            name="expiry"
            placeholder="Valid Thru"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            style={{
              width: '100px',
              height: '30px',
              border: '1px lightgray solid',
              borderRadius: '8px',
              paddingLeft: '10px'
            }}
            type="number"
            name="cvc"
            placeholder="CVC"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </form>
      </div>
    );
  }

  return (
    ticketMock.status === "RESERVED" ?
      <>
        <SubTitle> Ingresso escolhido </SubTitle>
        <Card_Selected>
          <p>{!ticketMock.TicketType.isRemote ? (ticketMock.TicketType.includesHotel ? "Presencial + Com hotel" : "Presencial + Sem hotel") : "Online"}</p>
          <span>R$ {(ticketMock.TicketType.price) / 100}</span>
        </Card_Selected>
        <SubTitle> Pagamento </SubTitle>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <PaymentForm></PaymentForm>
        </div>

      </> :
      (enrollment ?
        <>
          <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
          <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
          <ContainerCard>
            <Card onClick={() => teste()}>
              <p>Presencial</p>
              <span>R$ 200</span>
            </Card>
            <Card>
              <p>Online</p>
              <span>R$ 100</span>
            </Card>
          </ContainerCard>
          <SubTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitle>
          <ContainerCard>
            <Card>
              <p>Sem Hotel</p>
              <span>+R$ 0</span>
            </Card>
            <Card>
              <p>Com Hotel</p>
              <span>+R$ 150</span>
            </Card>
          </ContainerCard>
          <SubTitle>Fechado! O total ficou em <span>R$ 600</span>. Agora é só confirmar:</SubTitle>
          <ConfirmButton>
            <TextButton>RESERVAR INGRESSO</TextButton>
          </ConfirmButton>
        </>
        :
        <>
          <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
          <ContainerText>
            <SubTitle>
              Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
            </SubTitle>
          </ContainerText>

        </>

      ));
}


const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const ContainerText = styled.div`
margin: auto;
height: 400px;
text-align: center;
display: flex;
align-items: center
`;

const SubTitle = styled(Typography)`
  color: #8E8E8E;
  font-size:  20px !important;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  span{
    font-weight: 700;
  }
`;

const ContainerCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap:24px;
  margin-top: 17px;
  margin-bottom: 44px;
`

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 142px;
  height: 145px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #CECECE;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  cursor: pointer;

  p{
    color: #454545;
    font-size: 16px;
  }

  span{
    color: #898989;
    font-size: 14px;
  }
`

const Card_Selected = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 290px;
  height: 145px;
  flex-shrink: 0;
  border-radius: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  background-color: #FFEED2;

  p{
    color: #454545;
    font-size: 16px;
  }

  span{
    color: #898989;
    font-size: 14px;
  }
`
const ConfirmButton = styled.button`
  width: 162px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;
  margin-top: 28px;
`

const TextButton = styled(Typography)`
  font-size: 13px!important;
`