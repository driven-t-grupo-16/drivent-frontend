import styled from 'styled-components';
import { BsFillPersonFill, BsPerson } from 'react-icons/bs';
import { Typography } from '@mui/material';

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

export const HotelCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => (props.selected == undefined) ? "#FFEED2" : (props.selected == props.id) ? '#FFEED2' : '#EBEBEB'};
  width: 196px;
  height: 264px;
  padding: 16px 14px 0;
  border-radius: 10px;
  cursor: ${props => (props.selected == props.id) ? 'default' : 'pointer'};
  
  > img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    object-fit: cover;
  }

  > h1 {
    color: #343434;
    font-weight: 400;
    font-size: 20px;
    margin: 10px 0;
  }
  > h2 {
    color: #3C3C3C;
    font-weight: 700;
    font-size: 12px;
  }
  > p {
    color: #3C3C3C;
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 14px;
  }
`;

export const CardRoom = styled.div`
    width: 190px;
    height: 45px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #CECECE;
    border-radius: 10px;
    cursor: pointer;

    > h1 {
        color: #454545;
        font-weight: 700;
        font-size: 20px;
    }

    background-color: ${(props) => (props.fullcapacity === "true" ? "#CECECE" : props.selected ? "#FFEED2" : "transparent")};
    color: ${(props) => (props.fullcapacity === "true" ? "#8C8C8C" : "#000000")};
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: end;
    width: auto;
`;

export const IconSelected = styled(BsFillPersonFill)`
    font-size: 27px;
    color: ${(props) => (props.selected) ? "#FF4791" : "#000000"};
`;

export const Icon = styled(BsPerson)`
    font-size: 27px;
`;

export const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > h2 {
    font-weight: 400;
    font-size: 20px;
    margin: 10px 0;
    color: #8E8E8E;
  }
`;

export const RoomsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 17px;
  margin-top: 15px;
`;

export const SubmitRoom = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  background-color: #E0E0E0;
  font-size: 14px;
  font-weight: 400;
  align-items: center;
  border: none;
  box-shadow: 4px 4px 10px rgba(224, 224, 224, 0.5);
  cursor: pointer;
  margin-top: 30px;
`;

export const EditButton = styled(SubmitRoom)`
  font-size: 14px;
  font-weight: 700;
  color: #000000;
`