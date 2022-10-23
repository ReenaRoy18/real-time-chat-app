import React from "react";
import Message from "./Message";
import "../Stylesheets/messages.scss";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { useState } from "react";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase/firebase";

function Messages() {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) setMessages(doc.data().messages);
    });
    return () => unsub();
  }, [data.chatId]);
  console.log(messages[0]);
  return (
    <div className="messages">
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  );
}

export default Messages;
