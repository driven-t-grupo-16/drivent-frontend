import { useEffect, useState } from "react";
import { DayCard } from ".";

export default function CardDay(props){
    const {date, isDaySelected, setIsDaySelected} = props;

    const [selected, setSelected] = useState(false);

    useEffect(()=>{
        isSelected();
    }, [isDaySelected]);

    function isSelected(){
        if(date.id == isDaySelected) {
            setSelected(true);
        }
        else{
            setSelected(false);
        }
    }

    return (
        <DayCard onClick={() => setIsDaySelected(date.id)} selected={selected}>
            {date.day}
        </DayCard>
    );
}