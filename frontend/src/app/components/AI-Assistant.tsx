import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Send, Sparkles, Utensils, Smile, Flame, 
  Leaf, Heart, X, ChevronRight, Zap
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Suggestion {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  calories?: number;
  tags?: string[];
}

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  suggestions?: Suggestion[];
}

const quickPrompts = [
  { icon: Utensils, label: "What should I eat?", prompt: "What should I eat today?" },
  { icon: Smile, label: "Mood-based", prompt: "I'm feeling adventurous, suggest something exciting!" },
  { icon: Leaf, label: "Low-calorie", prompt: "Show me healthy, low-calorie options" },
  { icon: Flame, label: "Something spicy", prompt: "I want something spicy and flavorful" },
];

const mockResponses: Record<string, { text: string; suggestions: Suggestion[] }> = {
  "What should I eat today?": {
    text: "Based on what's popular today, I'd recommend these delicious options:",
    suggestions: [
      { id: 1, name: "Wagyu Beef Tenderloin", description: "Our most popular dish!", price: "$68", calories: 580, tags: ["popular"] },
      { id: 2, name: "Truffle Carbonara", description: "Rich and creamy perfection", price: "$42",  calories: 720, tags: ["comfort"] },
    ],
  },
  "I'm feeling adventurous, suggest something exciting!": {
    text: "For an adventurous palate, I've picked some bold flavors for you:",
    suggestions: [
      { id: 3, name: "Pan-Seared Sea Bass", description: "Wild-caught with exotic spices", price: "$52",  calories: 420, tags: ["exotic"] },
      { id: 1, name: "Wagyu Beef Tenderloin", description: "Premium Japanese wagyu", price: "$68",  calories: 580, tags: ["premium"] },
    ],
  },
  "Show me healthy, low-calorie options": {
    text: "Here are some delicious options under 500 calories:",
    suggestions: [
      { id: 3, name: "Pan-Seared Sea Bass", description: "Light and nutritious", price: "$52",  calories: 420, tags: ["healthy", "low-cal"] },
    ],
  },
  "I want something spicy and flavorful": {
    text: "🔥 Get ready for some heat! Here are our spiciest dishes:",
    suggestions: [
      { id: 2, name: "Spicy Truffle Pasta", description: "With chili-infused truffle oil", price: "$42", calories: 720, tags: ["spicy"] },
    ],
  },
};

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hi! I'm your AI food assistant. 🍽️ I can help you discover the perfect dish based on your mood, dietary preferences, or just surprise you with something delicious!",
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = mockResponses[text] || {
        text: "I'd recommend trying our Chef's Special today! Here's what I think you'll love:",
        suggestions: [
          { id: 1, name: "Wagyu Beef Tenderloin", description: "Our signature dish", price: "$68", calories: 580 },
          { id: 4, name: "Chocolate Fondant", description: "Perfect ending to any meal", price: "$18", calories: 480 },
        ],
      };

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.text,
        suggestions: response.suggestions,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 right-4 cursor-pointer xs:bottom-5 xs:right-5 md:bottom-6 sm:right-6 z-50 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-gold rounded-full shadow-gold flex items-center justify-center group"
      >
        <Bot className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 text-primary-foreground" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />

            {/* Chat Window */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="fixed inset-0 xs:inset-auto xs:bottom-4 xs:right-4 m-auto xs:left-4 sm:inset-0 md:inset-auto md:bottom-6 md:right-6 z-50 xs:h-auto xs:max-h-[85vh] h-[80vh] sm:mx-auto sm:my-auto md:max-h-[80vh] w-[50vh] xs:max-w-md sm:max-w-lg md:max-w-md bg-card rounded-xl xs:rounded-2xl shadow-xl overflow-hidden flex flex-col border border-border"
            >
              {/* Header */}
              <div className="p-3 xs:p-4 sm:p-5 bg-gradient-gold flex items-center justify-between">
                <div className="flex items-center gap-2 xs:gap-3">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-primary-foreground text-sm xs:text-base sm:text-lg truncate"> AI Assistant </h3>
                    <p className="text-[10px] xs:text-xs text-primary-foreground/70 truncate"> Always ready to help </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors shrink-0">
                  <X className="h-3 w-3 xs:h-4 xs:w-4 text-primary-foreground" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 xs:p-4 space-y-3 xs:space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn( "flex", message.type === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[90%] xs:max-w-[85%] rounded-xl xs:rounded-2xl p-2.5 xs:p-3",
                        message.type === "user"
                          ? "bg-gradient-gold text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      )}
                    >
                      <p className="text-xs xs:text-sm leading-relaxed">{message.content}</p>

                      {/* Suggestion Cards */}
                      {message.suggestions && (
                        <div className="mt-2 xs:mt-3 space-y-1.5 xs:space-y-2">
                          {message.suggestions.map((suggestion) => (
                            <motion.div
                              key={suggestion.id}
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center gap-2 xs:gap-3 p-1.5 xs:p-2 bg-background/50 rounded-lg xs:rounded-xl cursor-pointer"
                            >
                              <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-lg bg-linear-to-br from-amber-900/20 to-yellow-900/20 flex items-center justify-center shrink-0">
                                <Utensils className="h-4 w-4 xs:h-5 xs:w-5 text-amber-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-foreground text-xs xs:text-sm truncate">
                                  {suggestion.name}
                                </h5>
                                <p className="text-[10px] xs:text-xs text-muted-foreground truncate">
                                  {suggestion.description}
                                </p>
                                <div className="flex items-center gap-1.5 xs:gap-2 mt-0.5 xs:mt-1">
                                  <span className="text-xs xs:text-sm font-bold text-primary">{suggestion.price}</span>
                                  {suggestion.calories && (
                                    <span className="text-[10px] xs:text-xs text-muted-foreground">{suggestion.calories} cal</span>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="h-3 w-3 xs:h-4 xs:w-4 text-muted-foreground shrink-0" />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary rounded-xl xs:rounded-2xl rounded-bl-sm p-2.5 xs:p-3">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="px-3 xs:px-4 py-2 border-t border-border">
                <div className="flex gap-1.5 xs:gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {quickPrompts.map((prompt) => {
                    const Icon = prompt.icon;
                    return (
                      <button
                        key={prompt.label}
                        onClick={() => handleSend(prompt.prompt)}
                        className="flex items-center gap-1.5 xs:gap-2 px-2.5 py-1.5 xs:px-3 xs:py-2 bg-secondary/50 rounded-full text-xs xs:text-sm text-foreground/80 hover:bg-secondary hover:text-foreground transition-all whitespace-nowrap shrink-0"
                      >
                        <Icon className="h-3 w-3 xs:h-4 xs:w-4 text-primary" />
                        <span>{prompt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input */}
              <div className="p-3 xs:p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
                    placeholder="Ask me anything about food..."
                    className="flex-1 px-3 py-2.5 xs:px-4 xs:py-3 bg-input rounded-lg xs:rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-xs xs:text-sm"
                  />
                  <Button
                    variant="gold"
                    size="icon"
                    onClick={() => handleSend(inputValue)}
                    disabled={!inputValue.trim()}
                    className="shrink-0 w-10 h-10 xs:w-11 xs:h-11"
                  >
                    <Send className="h-3.5 w-3.5 xs:h-4 xs:w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add custom scrollbar hide styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};