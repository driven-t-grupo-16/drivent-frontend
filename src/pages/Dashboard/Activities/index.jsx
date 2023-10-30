import { useState, useEffect } from "react";
import { ErrorContainer, StyledTypography } from "../../../components/Hotels";
import { ActivitiesBox, ActivityContainer, DaysContainer, Spaces, TitleH2 } from "../../../components/Activities";
import CardDay from "../../../components/Activities/DaysCard";
import { ActivityCard } from "../../../components/Activities/ActivityCard";
import axios from "axios";

export default function Activities() {
    const [activities, setActivities] = useState({});
    const [registrations, setRegistrations] = useState([]);
    const [daySelected, setDaySelected] = useState({});
    const [errorMessage, setError] = useState("");

    const fetchActivities = async () => {
        try {
            const token = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : null;

            const res = await axios.get(import.meta.env.VITE_API_URL + `/activities`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setActivities(res.data.activities);
            setRegistrations(res.data.registrations);
            console.log(res.data);
        } catch (error) {
            console.error("Erro ao buscar hotéis:", error);
            switch (error.response?.data) {
                case `You must purchase a ticket!`:
                    setError("Você precisa comprar um ingresso antes de fazer a escolha de atividades");
                    break;
                case `You must finish enrolling!`:
                    setError("Você precisa completar sua inscrição antes de fazer a escolha de atividades");
                    break;
                case `You must confirm payment before booking!`:
                    setError("Você precisa ter confirmado pagamento antes de fazer a escolha de atividades");
                    break;
                case `You must book a room before continuing!`:
                    setError("Você precisa ter reservado o hotel antes de fazer a escolha de atividades");
                    break;
                default:
                    setError("Não foi possível buscar atividades do evento");
                    break;
            }
            console.log(errorMessage);
        }
    }

    useEffect(() => {
        fetchActivities();
    }, [])

    if (errorMessage) {
        return (
            <>
                <StyledTypography variant="h4"> Escolha de atividades </StyledTypography>
                <ErrorContainer>
                    <h3>{errorMessage}</h3>
                </ErrorContainer>
            </>
        )
    }

    return (
        <>
            <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
            {(daySelected === 0) && <TitleH2>Primeiro, filtre pelo dia do evento: </TitleH2>}
            <DaysContainer>
                {Object.keys(activities).map((day) =>
                    <CardDay key={day} dateKey={day} daySelected={daySelected} setDaySelected={setDaySelected} />
                )}
            </DaysContainer>
            {(Object.keys(daySelected).length > 0) &&
                <ActivityContainer>
                    {
                        Object.entries(activities[daySelected]).map(([key, value]) =>
                            <Spaces key={key}>
                                <h1>{key}</h1>
                                <ActivitiesBox>
                                    {value.map(activity => <ActivityCard key={activity.id} activity={activity} registrations={registrations} fetchActivities={fetchActivities} />)}
                                </ActivitiesBox>
                            </Spaces>
                        )
                    }
                </ActivityContainer>
            }

        </>
    );
}
