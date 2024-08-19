// Messages.js
'use client';

import { socket } from "@/socket"; 
import { useEffect, useState } from "react";

interface Message {
    id: string;
    message_content: string;
    user_id: string;
    container_id: string;
    receiver_id: string;
    created_at: string;
}

interface MessagesProps {
    data: {
        success: Message[];
    };
}

function Messages({ data }: MessagesProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [checkConnection, setCheckConnection] = useState('');
    const [transport, setTransport] = useState("N/A");
    const [messages, setMessages] = useState<Message[]>(data.success);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true); 
            setTransport(socket.io.engine.transport.name); 

            // Listen for transport upgrades (e.g., from polling to WebSocket)
            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }


        function onNewMessage(newMessage) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }

        // Listen for new messages from the server
        socket.on('new-message', onNewMessage);

        function onDisconnect() {
            setIsConnected(false); 
            setTransport("N/A"); 
            setCheckConnection('Not connected');
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off('new-message', onNewMessage); // Cleanup on unmount
        };
    }, []);

    return (
        <>
            <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            <p>From Server: {checkConnection}</p> {/* Display message received from the server */}
            <p>Transport: {transport}</p> 
            {messages.map((item: Message) => (
                <div key={item.id} className="rounded-full bg-black text-white p-3 flex w-fit">
                    {item.message_content}
                </div>
            ))}
        </>
    );
}

export default Messages;