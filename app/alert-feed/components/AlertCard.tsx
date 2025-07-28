'use client';
import { Alert, setActive } from "@/app/store";
import { useDispatch } from "react-redux";

type Props = {
    alert: Alert;
}

const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
    ', ' +
    date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

export default function AlertCard({ alert }: Props) {
    const dispatch = useDispatch();

    return (
        <li className="alert-item"
            onClick={() => dispatch(setActive(alert.id))}
        >
            <p className="alert-message">{alert.message}</p>
            <p className="alert-location">{alert.location}</p>
            <p className="alert-timestamp">{formatDate(alert.timestamp)}</p>
        </li>
    );
}