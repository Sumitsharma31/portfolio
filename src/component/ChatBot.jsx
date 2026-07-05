import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
const ChatBot = () => {
  useEffect(() => {
    createChat({
      webhookUrl: process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK || "https://n8n-example.com/webhook",
      initialMessages: ["Namaste! 🙏 How can I help you today?"],
    });
  }, []);
  return <div></div>;
};
export default ChatBot;
