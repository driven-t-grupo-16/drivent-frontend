import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { Container } from '@mui/material';

export default function Payment() {
  const { enrollment } = useEnrollment();
  function teste(){
    console.log("oiii");
    console.log(enrollment)
  }
  
  return (enrollment ? 
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <ContainerCard>
        <Card onClick={ () => teste()}>
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

const Card = styled.div`
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