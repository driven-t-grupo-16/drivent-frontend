import { ActivityCardStyle, CloseIcon, EnterIcon, IconDiv, InfoDiv } from ".";

export function ActivityCard({ activity, height }) {
    const { id, name, startsAt, endsAt, capacity, reservations } = activity;

    function Icon() {
        let isFull = (capacity - reservations == 0);
        if (isFull) {
            return (
                <IconDiv full={String(isFull)} >
                    <CloseIcon />
                    <p>Esgotado</p>
                </IconDiv>
            )
        }
        else {
            return (
                <IconDiv full={String(isFull)} >
                    <EnterIcon />
                    <p>{String(capacity - reservations) + "vagas"}</p>
                </IconDiv>
            )
        }
    }


    return (
        <ActivityCardStyle height={height}>
            <InfoDiv>
                <h1>{name}</h1>
                <h2>{startsAt + " - " + endsAt}</h2>
            </InfoDiv>
            <Icon />
        </ActivityCardStyle>
    )
}