// Messages.js
'use client';

import { socket } from "@/socket"; 
import { useEffect, useRef, useState } from "react";

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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

   
        function onConnect() {
            setIsConnected(true); 
            setTransport(socket.io.engine.transport.name); 

            // Listen for transport upgrades (e.g., from polling to WebSocket)
            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }


        function onNewMessage(newMessage: any) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
            }
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
    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
      }, [messages]);
    return (
        <div className="overflow-y-auto flex items-end flex-col gap-4" ref={messagesEndRef} >
            {messages.map((item: Message, index: number) => (
                <div key={index} className="rounded-full bg-black text-white p-3 flex w-fit" >
                    {item.message_content}
                </div>
            ))}
        </div>
    );
}

export default Messages;