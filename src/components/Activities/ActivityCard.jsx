import { ActivityCardStyle, CloseIcon, EnterIcon, IconDiv, InfoDiv, RegisteredIcon } from ".";
import axios from "axios";
import { toast } from "react-toastify";

export function ActivityCard({ activity, registrations, fetchActivities }) {
    const { id, name, capacity } = activity;

    const n = registrations.filter(i => i.activityId === activity.id).length;
    let isFull = (capacity - n == 0);

    const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).user.id : null;
    const token = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : null;

    const userRegistered = registrations.filter(i => i.userId === userId && id === i.activityId).length;

    console.log(userRegistered);

    const startTime = activity.startTime.slice(-8, -3);
    const endTime = activity.endTime.slice(-8, -3);
    const height = Number(endTime.slice(0, 2)) - Number(startTime.slice(0, 2));

    async function submitActivity() {
        console.log("ok");
        if (userRegistered) return toast('Você já está inscrito nessa atividade!');
        if (isFull) return toast('Essa atividade está lotada!');

        await axios.post(import.meta.env.VITE_API_URL + `/activities`, { activityId: id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log("Atividade registrada com sucesso:", response.data);
                fetchActivities();
            })
            .catch((error) => {
                console.error("Erro ao registrar atividade:", error)
                console.log(error.response?.data);
                toast(error.response?.data.message);
            })
    }

    function Icon() {
        if (userRegistered) {
            return (
                <IconDiv full={"Inscrito"} registered={"true"}>
                    <RegisteredIcon />
                    <p>Inscrito</p>
                </IconDiv>
            )
        }

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
                    <p>{String(capacity - n) + " vagas"}</p>
                </IconDiv>
            )
        }
    }


    return (
        <ActivityCardStyle height={`${height * 84}px`} registered={(userRegistered != 0) ? "true" : "false"} onClick={() => submitActivity()}>
            <InfoDiv>
                <h1>{name}</h1>
                <p>{startTime + " - " + endTime}</p>
            </InfoDiv>
            <Icon />
        </ActivityCardStyle>
    )
}