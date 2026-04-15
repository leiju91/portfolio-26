"use client";

import {
  type CSSProperties,
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  ChatMessage,
  defaultStreamChatProvider,
  StreamChatHandler,
} from "@/lib/chatbot-api";
import {
  GradientPillFrame,
  gradientPillInnerSurfaceClassName,
  gradientPillRingClassName,
} from "@/components/ui/gradient-pill-frame";

const chatbotOtterSrc = "/Loutre_mignonne_avec_un_saumon.png";

interface FloatingChatbotProps {
  streamProvider?: StreamChatHandler;
}

const createMessage = (
  role: ChatMessage["role"],
  content: string,
  id?: string
): ChatMessage => ({
  id: id ?? `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
});

const CHATBOT_NUDGE_DELAY_MS = 3 * 60 * 1000;
const CHATBOT_NUDGE_STORAGE_KEY = "portfolio-chatbot-nudge-seen";
const CHATBOT_EMAIL_HINT_EVENT = "chatbot:highlight-email";
const URL_TOKEN_REGEX = /(https?:\/\/[^\s]+)/gi;

const fabBubbles: {
  drift: string;
  delay: string;
  large?: boolean;
}[] = [
  { drift: "-15px", delay: "0s" },
  { drift: "-5px", delay: "0.45s", large: true },
  { drift: "8px", delay: "0.9s" },
  { drift: "16px", delay: "1.35s" },
];

const splitTrailingPunctuation = (token: string) => {
  const match = token.match(/[),.!?:;]+$/);
  if (!match) {
    return { cleanToken: token, trailing: "" };
  }
  const trailing = match[0];
  return {
    cleanToken: token.slice(0, -trailing.length),
    trailing,
  };
};

const renderMessageContent = (content: string) => {
  const lines = content.split("\n");

  return lines.map((line, lineIndex) => {
    const parts = line.split(URL_TOKEN_REGEX);
    return (
      <Fragment key={`line-${lineIndex}`}>
        {parts.map((part, partIndex) => {
          if (!part) return null;
          if (!/^https?:\/\//i.test(part)) {
            return <span key={`txt-${lineIndex}-${partIndex}`}>{part}</span>;
          }

          const { cleanToken, trailing } = splitTrailingPunctuation(part);
          return (
            <Fragment key={`url-${lineIndex}-${partIndex}`}>
              <a
                href={cleanToken}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-emerald-300/70 underline-offset-2 hover:text-emerald-200"
              >
                {cleanToken}
              </a>
              {trailing && <span>{trailing}</span>}
            </Fragment>
          );
        })}
        {lineIndex < lines.length - 1 && <br />}
      </Fragment>
    );
  });
};

export default function FloatingChatbot({
  streamProvider = defaultStreamChatProvider,
}: FloatingChatbotProps) {
  const t = useTranslations("chatbot");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showNudge, setShowNudge] = useState(false);
  const nudgeTimeoutRef = useRef<number | null>(null);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const emailHintTriggeredRef = useRef(false);

  const suggestedQuestions = useMemo(
    () => [t("suggested1"), t("suggested2"), t("suggested3")],
    [t]
  );

  const resetWelcome = useCallback(() => {
    setMessages([
      createMessage("assistant", t("welcome"), "welcome"),
    ]);
  }, [t]);

  useEffect(() => {
    resetWelcome();
  }, [resetWelcome]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(CHATBOT_NUDGE_STORAGE_KEY) === "1") return;

    const id = window.setTimeout(() => {
      setShowNudge(true);
      nudgeTimeoutRef.current = null;
    }, CHATBOT_NUDGE_DELAY_MS);
    nudgeTimeoutRef.current = id;

    return () => {
      if (nudgeTimeoutRef.current !== null) {
        clearTimeout(nudgeTimeoutRef.current);
        nudgeTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setShowNudge(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(CHATBOT_NUDGE_STORAGE_KEY, "1");
    }
    if (nudgeTimeoutRef.current !== null) {
      clearTimeout(nudgeTimeoutRef.current);
      nudgeTimeoutRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const dismissNudge = () => {
    setShowNudge(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(CHATBOT_NUDGE_STORAGE_KEY, "1");
    }
  };

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading]
  );

  const lastMessage = messages[messages.length - 1];
  const showThinking =
    isLoading &&
    lastMessage?.role === "assistant" &&
    lastMessage.content.length === 0;

  const maybeTriggerEmailHint = useCallback((assistantText: string) => {
    if (emailHintTriggeredRef.current) return;
    const normalized = assistantText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const suggestsEmailContact =
      normalized.includes("contacter julie") &&
      normalized.includes("email");
    if (!suggestsEmailContact) return;
    emailHintTriggeredRef.current = true;
    window.dispatchEvent(new CustomEvent(CHATBOT_EMAIL_HINT_EVENT));
  }, []);

  const sendMessage = async (content: string) => {
    const userText = content.trim();
    if (!userText || isLoading) return;

    const nextUserMessage = createMessage("user", userText);
    const assistantId = `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const assistantPlaceholder = createMessage("assistant", "", assistantId);
    const conversation = [...messages, nextUserMessage, assistantPlaceholder];

    setMessages(conversation);
    setInput("");
    setIsLoading(true);
    emailHintTriggeredRef.current = false;

    try {
      await streamProvider({
        messages: [...messages, nextUserMessage],
        userInput: userText,
        onDelta: (accumulated) => {
          maybeTriggerEmailHint(accumulated);
          setMessages((prev) => {
            const next = [...prev];
            const idx = next.findIndex((m) => m.id === assistantId);
            if (idx !== -1) {
              next[idx] = { ...next[idx], content: accumulated };
            }
            return next;
          });
        },
      });
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        const idx = next.findIndex((m) => m.id === assistantId);
        const err = t("error");
        if (idx !== -1) {
          next[idx] = { ...next[idx], content: err };
        } else {
          next.push(createMessage("assistant", err));
        }
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className={cn(
            gradientPillRingClassName,
            "w-[min(92vw,24rem)] rounded-3xl p-px shadow-2xl shadow-emerald-500/10"
          )}
        >
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-background/72 text-foreground backdrop-blur-xl">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  gradientPillRingClassName,
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-px"
                )}
              >
                <span className="relative inline-flex h-full w-full overflow-hidden rounded-full border border-white/10 bg-background/80">
                  <Image
                    src={chatbotOtterSrc}
                    alt={t("otterAlt")}
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                </span>
              </span>
              <div>
                <p className="bg-linear-to-r from-white via-white to-white/75 bg-clip-text text-sm font-semibold text-transparent">
                  {t("title")}
                </p>
                <p className="text-xs text-muted-foreground">{t("subtitle")}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
              aria-label={t("closeChat")}
            >
              <X size={16} />
            </button>
          </header>

          <div className="chatbot-scrollbar max-h-88 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  message.role === "assistant"
                    ? "border border-white/10 bg-white/5 text-foreground"
                    : "ml-auto bg-linear-to-r from-emerald-400/90 via-cyan-400/85 to-fuchsia-400/75 font-medium text-primary-foreground shadow-sm"
                )}
              >
                {renderMessageContent(message.content)}
              </article>
            ))}
            {showThinking && (
              <p className="text-xs text-muted-foreground">
                {t("thinking")}
              </p>
            )}
            <div ref={scrollEndRef} aria-hidden className="h-px w-full shrink-0" />
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => {
                    void sendMessage(question);
                  }}
                  disabled={isLoading}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-foreground transition hover:border-emerald-400/35 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t("placeholder")}
                className="h-10 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-400/35 focus:ring-offset-2 focus:ring-offset-background"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-cyan-400 text-primary-foreground shadow-md shadow-emerald-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={t("send")}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </section>
        </div>
      )}

      {showNudge && !isOpen && (
        <div
          className={cn(
            gradientPillRingClassName,
            "relative z-20 mb-1 max-w-[min(88vw,15.5rem)] animate-in fade-in-0 slide-in-from-bottom-3 duration-300"
          )}
          role="status"
        >
          <div className="relative rounded-2xl border border-white/10 bg-background/88 px-3.5 py-2.5 pr-9 text-foreground shadow-lg shadow-emerald-500/10 backdrop-blur-xl">
            <p className="text-xs leading-snug">
              {t("nudge")}
            </p>
            <button
              type="button"
              onClick={dismissNudge}
              className="absolute top-1.5 right-1.5 rounded-full p-1 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
              aria-label={t("dismissNudge")}
            >
              <X size={14} aria-hidden />
            </button>
            <span
              className="absolute -bottom-1.5 right-5 size-3 rotate-45 border border-white/10 border-t-0 border-l-0 bg-background/88"
              aria-hidden
            />
          </div>
        </div>
      )}

      <div className="relative isolate">
        {!isOpen && (
          <div
            className="pointer-events-none absolute -inset-6 z-0"
            aria-hidden
          >
            {fabBubbles.map((bubble, index) => (
              <span
                key={index}
                className={cn(
                  "chatbot-fab-bubble",
                  bubble.large && "chatbot-fab-bubble--lg"
                )}
                style={
                  {
                    animationDelay: bubble.delay,
                    ["--chatbot-bubble-drift" as string]: bubble.drift,
                  } satisfies CSSProperties
                }
              />
            ))}
          </div>
        )}
        <GradientPillFrame className="relative z-10 shadow-lg shadow-emerald-500/15">
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className={cn(
              gradientPillInnerSurfaceClassName,
              "relative inline-flex h-14 w-14 items-center justify-center text-emerald-200 transition hover:scale-[1.03] hover:text-cyan-200"
            )}
            aria-label={t("openFab")}
          >
            <Image
              src={chatbotOtterSrc}
              alt=""
              width={48}
              height={48}
              className="relative z-10 h-12 w-12 rounded-full object-cover"
              aria-hidden
            />
          </button>
        </GradientPillFrame>
      </div>
    </div>
  );
}
