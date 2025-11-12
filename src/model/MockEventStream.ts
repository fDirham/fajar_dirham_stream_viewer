import { AppEventStream } from "./AppEventStream";
import type { AppMessageEventRaw } from "./AppMessageEvent";

export const MOCK_STREAM_A: AppMessageEventRaw[] = [
  {
    id: 1,
    type: "user_message",
    content: "What’s the weather in San Francisco?",
  },
  {
    id: 2,
    type: "assistant_message",
    content: "Let me check that for you...",
    tool_call_ids: [3],
  },
  {
    id: 3,
    type: "tool_call_request",
    tool_name: "get_weather",
    args: { location: "San Francisco" },
  },
  { id: 4, type: "tool_call_execution_start", tool_name: "get_weather" },
  {
    id: 5,
    type: "tool_call_execution_complete",
    tool_name: "get_weather",
    result: { temperature: "18°C", condition: "Cloudy" },
  },
  {
    id: 6,
    type: "assistant_message",
    content: "It’s currently 18°C and cloudy in San Francisco.",
  },
];

export const MOCK_STREAM_B: AppMessageEventRaw[] = [
  {
    id: 1,
    type: "user_message",
    content: "Compare the population of Tokyo and Delhi.",
  },
  {
    id: 2,
    type: "assistant_message",
    content: "Sure, give me a moment...",
    tool_call_ids: [3, 4],
  },
  {
    id: 3,
    type: "tool_call_request",
    tool_name: "get_population",
    args: { city: "Tokyo" },
  },
  {
    id: 4,
    type: "tool_call_request",
    tool_name: "get_population",
    args: { city: "Delhi" },
  },
  {
    id: 5,
    type: "tool_call_execution_complete",
    tool_name: "get_population",
    result: { city: "Tokyo", population: "37M" },
  },
  {
    id: 6,
    type: "tool_call_execution_complete",
    tool_name: "get_population",
    result: { city: "Delhi", population: "32M" },
  },
  {
    id: 7,
    type: "assistant_message",
    content: "Tokyo has 37M people, while Delhi has 32M.",
  },
];

export const MOCK_STREAM_C: AppMessageEventRaw[] = [
  { id: 1, type: "user_message", content: "Find movie theaters near me." },
  {
    id: 2,
    type: "assistant_message",
    content: "Okay, fetching that info...",
    tool_call_ids: [3],
  },
  {
    id: 3,
    type: "tool_call_request",
    tool_name: "find_theaters",
    args: { location: "San Francisco" },
  },
  { id: 4, type: "tool_call_execution_start", tool_name: "find_theaters" },
];

export const MockEventStreamNames = {
  A: "Mock event stream: A",
  B: "Mock event stream: B",
  C: "Mock event stream: C",
} as const;

export class MockEventStream extends AppEventStream {
  id: "A" | "B" | "C";
  interval: number;
  listeners: ((message: AppMessageEventRaw) => void)[] = [];

  constructor(id: "A" | "B" | "C", interval: number = 1000) {
    super(MockEventStreamNames[id]);
    this.id = id;
    this.interval = interval;
  }

  subscribe(cb: (message: AppMessageEventRaw) => void): () => void {
    let index = 0;

    const data =
      this.id == "A"
        ? MOCK_STREAM_A
        : this.id == "B"
        ? MOCK_STREAM_B
        : MOCK_STREAM_C;

    this.listeners.push(cb);
    const intervalId = setInterval(() => {
      if (index < data.length) {
        this.listeners.forEach((fn) => fn(data[index]));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, this.interval);

    // Return unsubscribe function
    return () => {
      clearInterval(intervalId);
      this.listeners = this.listeners.filter((fn) => fn !== cb);
    };
  }

  sendMessage(msg: string): void {
    this.listeners.forEach((fn) =>
      fn({
        id: Math.floor(Math.random() * 1000) + 100,
        type: "user_message",
        content: msg,
      })
    );
  }
}
