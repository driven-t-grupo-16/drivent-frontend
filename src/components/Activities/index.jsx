import styled from 'styled-components';
import { IoEnterOutline } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export const DaysContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 27px 0;
    gap: 17px;
`
export const TitleH2 = styled.h2`
    font-weight: 400;
    font-size: 20px;
    margin: 9px 0 22px;
    color: #8E8E8E;
`
export const DayCard = styled.div`
    width: 131px;
    height: 37px;
    background-color: ${props => (props.selected) ? "#FFD37D" : '#E0E0E0'};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 10px 0px #00000040;
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
`
export const ActivityContainer = styled.div`
    width: 100%;
    display: flex;
`
export const Spaces = styled.div`
    width: 288px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;

    > h1 {
        color: #7B7B7B;
        font-weight: 400;
        font-size: 17px;
        margin-bottom: 13px;
    }
`
export const ActivitiesBox = styled.div`
    width: 100%;
    height: 391px;
    border: 1px solid #D7D7D7;
    display: flex; 
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    gap: 10px;
    overflow-y: auto;
`
export const ActivityCardStyle = styled.div`
    width: 265px;
    height: ${props => (props.height == "168px") ? "168px" :  "79px"};
    border: 1px solid #D7D7D7;
    display: flex;
    padding: 10px 0 10px 9px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #F1F1F1;
`
export const InfoDiv = styled.div`
    width: 199px;
    height: 100%;
    display: flex;
    flex-direction: column;
    > h1 {
        color: #343434;
        font-size: 12px;
        font-weight: 700;
        margin-top: 2px;
        margin-bottom: 6px;
    }
    > p {
        color: #343434;
        font-size: 12px;
        font-weight: 400;
        margin-top: 2px;
    }
`
export const IconDiv = styled.div`
    width: 66px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #CFCFCF;
    > p {
        font-size: 9px;
        font-weight: 400;
        color: ${props => (props.full == "true") ? "#CC6666" : "#078632"}
    }
`
export const EnterIcon = styled(IoEnterOutline)`
  font-size: 20px; 
  color: #078632;
  margin: 2px;
`;
export const CloseIcon = styled(AiOutlineCloseCircle)`
    font-size: 20px;
    color: #CC6666;
    margin: 2px;
`;