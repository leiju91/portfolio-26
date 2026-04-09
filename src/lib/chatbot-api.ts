export type ChatMessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
}

export interface ChatProviderPayload {
  messages: ChatMessage[];
  userInput: string;
}

export type ChatProviderHandler = (
  payload: ChatProviderPayload
) => Promise<string>;

export type StreamChatHandler = (
  payload: ChatProviderPayload & { onDelta: (accumulated: string) => void }
) => Promise<void>;

export const defaultChatProvider: ChatProviderHandler = async ({
  messages,
  userInput,
}) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      userInput,
    }),
  });

  if (!response.ok) {
    throw new Error("Chat API request failed");
  }

  const data = (await response.json()) as { answer?: string };
  if (!data.answer) {
    throw new Error("Chat API returned an empty answer");
  }

  return data.answer;
};

export async function streamChatFromApi({
  messages,
  userInput,
  onDelta,
  signal,
}: ChatProviderPayload & {
  onDelta: (accumulated: string) => void;
  signal?: AbortSignal;
}): Promise<void> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      userInput,
      stream: true,
    }),
    signal,
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    if (contentType.includes("application/json")) {
      const data = (await response.json()) as { answer?: string };
      if (data.answer) {
        onDelta(data.answer);
        return;
      }
    }
    throw new Error("Chat API request failed");
  }

  if (contentType.includes("application/json")) {
    const data = (await response.json()) as { answer?: string };
    if (!data.answer) {
      throw new Error("Chat API returned an empty answer");
    }
    onDelta(data.answer);
    return;
  }

  if (!response.body) {
    throw new Error("Chat API returned no body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let accumulated = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    accumulated += decoder.decode(value, { stream: true });
    onDelta(accumulated);
  }
}

export const defaultStreamChatProvider: StreamChatHandler = async (payload) => {
  const { onDelta, ...rest } = payload;
  await streamChatFromApi({ ...rest, onDelta });
};
