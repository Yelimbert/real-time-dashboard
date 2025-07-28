'use client';
import { Alert } from "@/app/store";
import AlertCard from "./AlertCard";

type Props = {
  alerts: Alert[];
};

export default function AlertList({ alerts }: Props) {
    return (
        <>
            <h1 className="alert-title">Live Alerts</h1>
            <ul className="alert-list">
                {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
                ))}
            </ul>
        </>
    );
}