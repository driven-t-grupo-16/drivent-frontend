import { useState } from "react";
import { ErrorContainer, StyledTypography } from "../../../components/Hotels";
import { ActivitiesBox, ActivityContainer, DaysContainer, Spaces, TitleH2 } from "../../../components/Activities";
import CardDay from "../../../components/Activities/DaysCard";
import { ActivityCard } from "../../../components/Activities/ActivityCard";

const genericDays = [
  {
    id: 1,
    day: "Sexta, 22/10" //por enquanto vou deixar como uma string, pq ainda n sei como vai vir essa info
  },
  {
    id: 2,
    day: "Sábado, 23/10"
  },
  {
    id: 3,
    day: "Sexta, 22/10"
  }
]
const genericActivities = [
  {
    id: 1,
    name: "Minecraft: montando o PC ideal",
    startsAt: "09:00",
    endsAt: "10:00",
    capacity: 20,
    reservations: 18
  },
  {
    id: 2,
    name: "Minecraft: montando o PC ideal",
    startsAt: "09:00",
    endsAt: "10:00",
    capacity: 20,
    reservations: 20
  }
]

export default function Activities() {

  const [paymentConfirmed, setPaymentConfirmed] = useState(true);
  const [accessEverything, setAccessEverything] = useState(false);
  const [isDaySelected, setIsDaySelected] = useState(0);

  if (!paymentConfirmed) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <ErrorContainer>
          <h3>Você precisa ter confirmado pagamento antes
            de fazer a escolha de atividades</h3>
        </ErrorContainer>
      </>
    );
  }
  if (accessEverything) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <ErrorContainer>
          <h2>Sua modalidade de ingresso não necessita escolher
            atividade. Você terá acesso a todas as atividades.</h2>
        </ErrorContainer>
      </>
    );
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {(isDaySelected === 0) && <TitleH2>Primeiro, filtre pelo dia do evento: </TitleH2>}
      <DaysContainer>
        {genericDays.map((date) =>
          <CardDay key={date.id} date={date}
            isDaySelected={isDaySelected} setIsDaySelected={setIsDaySelected} />
        )}
      </DaysContainer>
      {(isDaySelected !== 0) &&
        <ActivityContainer>
          <Spaces>
            <h1>Auditório Principal</h1>
            <ActivitiesBox>
              {genericActivities.map((ac) => <ActivityCard key={ac.id} activity={ac} />)}
            </ActivitiesBox>
          </Spaces>

          <Spaces>
            <h1>Auditório Lateral</h1>
            <ActivitiesBox>
              {genericActivities.map((ac) => <ActivityCard key={ac.id} activity={ac} height={"168px"} />)}
            </ActivitiesBox>
          </Spaces>

          <Spaces>
            <h1>Sala de Workshop</h1>
            <ActivitiesBox>
              {genericActivities.map((ac) => <ActivityCard key={ac.id} activity={ac} />)}
            </ActivitiesBox>
          </Spaces>
        </ActivityContainer>
      }

    </>
  );
}
