/* eslint-disable react-hooks/rules-of-hooks */
import { CardButton } from '../../../components/Dashboard/Payment';
import useEnrollment from '../../../hooks/api/useEnrollment';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { createTicket } from '../../../services/ticketApi';
import { createPayment } from "../../../services/paymentApi"
import Typography from '@mui/material/Typography';
import { FaCheckCircle } from 'react-icons/fa';
import useToken from '../../../hooks/useToken';
import Cards from 'react-credit-cards-2';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [ticketType, setTicketType] = useState('');
  const [includesHotel, setIncludesHotel] = useState(null);
  const [total, setTotal] = useState(0);
  const token = useToken();
  const [ticket, setTicket] = useState();

  useEffect(() => {
    console.log(ticket)
  }, [ticket])

  async function bookTicket() {
    if (ticketType === 'Online') {
      const newTicket  = await createTicket(token, 1);
      setTicket(newTicket)

    } else if (ticketType === 'Presencial' && includesHotel === false) {
      const newTicket = await createTicket(token, 2);
      setTicket(newTicket);

    } else if (ticketType === 'Presencial' && includesHotel === true) {
      const newTicket  = await createTicket(token, 3);
      setTicket(newTicket)
    }
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

    const handlePayment = (e) => {
      e.preventDefault();
      if (state.number.length !== 16) { return toast('Por favor use 16 dígitos para o cartão') }
      if (state.name === '') { return toast('Por favor Insira seu nome') }
      if (state.expiry.length !== 4) { return toast('Por favor use 4 dígitos para a data de vencimento') }
      if (Number(state.expiry.substring(0, 2)) <= 0 || Number(state.expiry.substring(0, 2)) >= 13) {
        return toast('Mês invalido para data de vencimento');
      }
      if (Number(state.expiry.substring(2, 4)) < 23) { return toast('Ano invalido para data de vencimento') }
      if (state.cvc.length !== 3) { return toast('Por favor use 3 dígitos para o cvc') }

      toast('processando pagamento')
      const payload = {
        ticketId: ticket.id,
        cardData: {
          issuer: "issuer",
          number: state.number,
          name: state.name,
          expirationDate: state.expiry,
          cvv: state.cvc,
        }
      };

      createPayment(token, payload);
      setTimeout(window.location.reload(), 1000 );
    }

    return (
      <div style={{ display: "flex", flexDirection: 'row', width: '290px', position: "relative" }} >
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <form onSubmit={() => { (e) => handlePayment(e) }} style={{
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

          <input style={{
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

          <input style={{
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
          <input style={{
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
          <ConfirmButton style={{ position: 'absolute', left: '10px', top: '180px' }}>
            <TextButton onClick={(e) => handlePayment(e)}>RESERVAR INGRESSO</TextButton>
          </ConfirmButton>
        </form>
      </div>
    );
  }

  return (
    ticket ? (ticket.status === "RESERVED" ?
      /* Ticket reserved: Payment Form */
      <>
        <SubTitle> Ingresso escolhido </SubTitle>
        <Card_Selected>
          <p>{!ticket.TicketType.isRemote ? (ticket.TicketType.includesHotel ? "Presencial + Com hotel" : "Presencial + Sem hotel") : "Online"}</p>
          <span>R$ {(ticket.TicketType.price)}</span>
        </Card_Selected>
        <SubTitle> Pagamento </SubTitle>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <PaymentForm></PaymentForm>
        </div>

      </> :
      /* Ticket Paid: see details */
      <>
        <SubTitle> Ingresso escolhido </SubTitle>
        <Card_Selected>
          <p>{!ticket.TicketType.isRemote ? (ticket.TicketType.includesHotel ? "Presencial + Com hotel" : "Presencial + Sem hotel") : "Online"}</p>
          <span>R$ {(ticket.TicketType.price)}</span>
        </Card_Selected>
        <SubTitle style={{ marginTop: '10px' }}> Pagamento </SubTitle>
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          <FaCheckCircle fontSize="50px" color='green' />
          <p>
            Pagamento confirmado! <br />
            Prossiga para escolha de hospedagem e atividades
          </p>
        </div>
      </>) : /* No ticket reserved yet */
      (enrollment ?
        <>
          <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
          <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
          <ContainerCard>
            <CardButton
              total={total}
              setTotal={setTotal}
              setTicketType={setTicketType}
              setIncludesHotel={setIncludesHotel}
              ticketType={ticketType}
              text='Presencial'
              price={250} />
            <CardButton
              total={total}
              setTotal={setTotal}
              setTicketType={setTicketType}
              setIncludesHotel={setIncludesHotel}
              ticketType={ticketType}
              text='Online'
              price={100} />
          </ContainerCard>
          {ticketType === 'Presencial' ? (<>
            <SubTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitle>
            <ContainerCard>
              <CardButton
                total={total}
                setTotal={setTotal}
                setIncludesHotel={setIncludesHotel}
                includesHotel={includesHotel}
                text='Sem hotel'
                price={0} />
              <CardButton
                total={total}
                setTotal={setTotal}
                setIncludesHotel={setIncludesHotel}
                includesHotel={includesHotel}
                text='Com hotel'
                price={350} />
            </ContainerCard>
          </>) : null
          }
          {ticketType === 'Online' ?
            (<>
              <SubTitle>Fechado! O total ficou em <span>R$ {total}</span>. Agora é só confirmar:</SubTitle>
              <ConfirmButton>
                <TextButton onClick={() => bookTicket()}>RESERVAR INGRESSO</TextButton>
              </ConfirmButton>
            </>) : includesHotel !== null &&
            (<>
              <SubTitle>Fechado! O total ficou em <span>R$ {total}</span>. Agora é só confirmar:</SubTitle>
              <ConfirmButton>
                <TextButton onClick={() => bookTicket()}>RESERVAR INGRESSO</TextButton>
              </ConfirmButton>
            </>)}
        </>
        : /* No Enrollment */
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