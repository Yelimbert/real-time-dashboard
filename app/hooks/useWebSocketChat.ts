'use client';
import { useEffect, useRef, useState } from "react";
import useClientId from "./useClientId";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, Message, RootState, setConnectionStatus } from "@/app/store";

export default function useWebSocketChat() {
    const dispatch = useDispatch();
    const clientId = useSelector((state: RootState) => state.user.clientId);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8081');

        socketRef.current = socket;

        socket.onopen = () => {
            console.log('[Chat] WebSocket connected');
            dispatch(setConnectionStatus(true));
        };

        socket.onmessage = (event) => {
            try {
                const message: Message = JSON.parse(event.data);
                dispatch(addMessage(message));
            } catch (err) {
                console.error('[Chat] Invalid message', err)
            }
        };

        socket.onclose = () => {
            console.log('[Chat] WebSocket disconnected');
            dispatch(setConnectionStatus(false));
        };

        return () => socket.close();
    }, [dispatch]);

    const sendMessage = (content: string) => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

        const message: Message = {
            id: crypto.randomUUID(),
            content,
            timestamp: new Date().toISOString(),
            type: 'chat',
            clientId,
        };

        socketRef.current.send(JSON.stringify(message));
    };

    return { sendMessage };
}