import React from "react";
import { ChatContainer } from "@/components/chat/chat-container";

export default function ChatPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-brand-heading">
          aeroAI Compliance Assistant
        </h1>
        <p className="text-xs text-brand-muted">
          Query company manuals, employee contracts, and civil aviation regulations with automated source citation
        </p>
      </div>
      <ChatContainer />
    </div>
  );
}
