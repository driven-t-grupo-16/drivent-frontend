import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { CardButton } from '../../../components/Dashboard/Payment';
import { useState } from 'react';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [ticketType, setTicketType] = useState('')
  const [includesHotel, setIncludesHotel] = useState(false)
  const [total, setTotal] = useState(0)

  function teste(){
    console.log("oiii");
  }
  
  return (enrollment ? 
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <ContainerCard>
        <CardButton setTicketType={setTicketType} ticketType={ticketType} text='Presencial' price={200} />
        <CardButton setTicketType={setTicketType} ticketType={ticketType}text='Online' price={100} />
      </ContainerCard>
      {ticketType === 'Presencial' && <>
        <SubTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitle>
        <ContainerCard>
          <CardButton setIncludesHotel={setIncludesHotel} includesHotel={includesHotel} text='Sem hotel' price={0} />
          <CardButton setIncludesHotel={setIncludesHotel} includesHotel={includesHotel} text='Com hotel' price={150} />
        </ContainerCard>
      </>
      }
      {ticketType === 'Online' || includesHotel && 
      <>
      <SubTitle>Fechado! O total ficou em <span>R$ {total}</span>. Agora é só confirmar:</SubTitle>
      <ConfirmButton>
        <TextButton>RESERVAR INGRESSO</TextButton>
      </ConfirmButton>
      </>}
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
    
  );
}


const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const ContainerText = styled.div`
margin: auto;
height: 400px;
text-align: center;
display: flex;
align-items: center;`;

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