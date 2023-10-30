import { useEffect, useState } from "react";
import { DayCard } from ".";

export default function CardDay(props) {
    const { dateKey, daySelected, setDaySelected } = props;
    const [selected, setSelected] = useState(false);

    const [year, month, day] = dateKey.split('-');
    const ddmm = day + "/" + month;

    const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const date = new Date(dateKey);
    const dia = dias[date.getUTCDay()];

    useEffect(() => {
        isSelected();
    }, [daySelected]);

    function isSelected() {
        if (dateKey == daySelected) {
            setSelected(true);
        }
        else {
            setSelected(false);
        }
    }

    return (
        <DayCard onClick={() => setDaySelected(dateKey)} selected={selected}>
            {dia}, {ddmm}
        </DayCard>
    );
}