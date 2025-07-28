'use client';
import { addAlert, Alert } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useWebSocketAlerts() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const alert: Alert = JSON.parse(event.data);
        dispatch(addAlert(alert));
      } catch (error) {
        console.error('Invalid message received:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => socket.close();
  }, [dispatch]);
}