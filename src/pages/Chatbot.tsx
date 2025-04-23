
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate a bot reply
  const fakeBotReply = async (userMessage: string): Promise<string> => {
    // This can be replaced by calling a real AI API
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          "You said: \"" +
            userMessage +
            "\". (This is a sample bot reply. Replace this with real AI integration!)"
        );
      }, 1000)
    );
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input,
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setSending(true);

    const botText = await fakeBotReply(userMsg.text);
    setMessages((msgs) => [
      ...msgs,
      {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botText,
      },
    ]);
    setSending(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center flex justify-center items-center gap-2">
        <span>Chatbot</span>
        <Bot className="h-7 w-7 text-aiYouNeed-500" />
      </h1>
      <Card>
        <CardContent className="p-6 flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto pr-2 mb-3 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[68%] rounded-lg p-3 ${
                    msg.sender === "bot"
                      ? "bg-gray-100 text-gray-800 flex items-center gap-2"
                      : "aiui-gradient text-white"
                  }`}
                >
                  {msg.sender === "bot" && <Bot className="h-5 w-5 mr-2 text-aiYouNeed-500" />}
                  <span>{msg.text}</span>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
          <form
            className="flex items-center gap-2 mt-auto"
            onSubmit={(e) => {
              e.preventDefault();
              if (!sending) handleSend();
            }}
          >
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !sending) {
                  handleSend();
                }
              }}
            />
            <Button
              type="submit"
              className="bg-aiYouNeed-500 hover:bg-aiYouNeed-600"
              disabled={sending || !input.trim()}
            >
              {sending ? "Sending..." : "Send"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
