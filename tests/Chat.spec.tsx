import { expect, test } from "vitest";
import deriveChatMessages from "../src/components/Chat/deriveChatMessages";
import { MOCK_STREAM_A, MOCK_STREAM_B } from "../src/model/MockEventStream";

test("should derive chat messages correctly for mock stream a", () => {
  const baseTime = new Date("2025-07-11T00:00:00Z");
  const inputLogs = MOCK_STREAM_A.map((e, idx) => ({
    ...e,
    timestamp: new Date(baseTime.getTime() + idx * 30 * 1000),
  }));
  const derive = deriveChatMessages(inputLogs);

  expect(derive).toEqual([
    {
      content: "What’s the weather in San Francisco?",
      eventIds: ["cm_1"],
      id: "cm_1",
      timestamp: inputLogs[0].timestamp,
      type: "user",
    },
    {
      content: "Let me check that for you...",
      eventIds: ["cm_2"],
      id: "cm_2",
      timestamp: inputLogs[1].timestamp,
      type: "assistant",
    },
    {
      args: {
        location: "San Francisco",
      },
      eventIds: ["cm_3", "cm_4", "cm_5"],
      id: "cm_3",
      result: {
        condition: "Cloudy",
        temperature: "18°C",
      },
      status: "completed",
      timestamp: inputLogs[2].timestamp,
      tool_name: "get_weather",
      type: "tool_status",
    },
    {
      content: "It’s currently 18°C and cloudy in San Francisco.",
      eventIds: ["cm_6"],
      id: "cm_6",
      timestamp: inputLogs[5].timestamp,
      type: "assistant",
    },
  ]);
});

test("should derive chat messages correctly for mock stream b", () => {
  const baseTime = new Date("2025-07-11T00:00:00Z");
  const inputLogs = MOCK_STREAM_B.map((e, idx) => ({
    ...e,
    timestamp: new Date(baseTime.getTime() + idx * 30 * 1000),
  }));
  const derive = deriveChatMessages(inputLogs);

  expect(derive).toEqual([
    {
      content: "Compare the population of Tokyo and Delhi.",
      eventIds: ["cm_1"],
      id: "cm_1",
      timestamp: new Date("2025-07-11T00:00:00.000Z"),
      type: "user",
    },
    {
      content: "Sure, give me a moment...",
      eventIds: ["cm_2"],
      id: "cm_2",
      timestamp: new Date("2025-07-11T00:00:30.000Z"),
      type: "assistant",
    },
    {
      type: "collapsible_tools",
      id: "collapsible_cm_3",
      eventIds: ["cm_3", "cm_5", "cm_4", "cm_6"],
      timestamp: new Date("2025-07-11T00:01:00.000Z"),
      tool_statuses: [
        {
          args: {
            city: "Tokyo",
          },
          eventIds: ["cm_3", "cm_5"],
          id: "cm_3",
          result: {
            city: "Tokyo",
            population: "37M",
          },
          status: "completed",
          timestamp: new Date("2025-07-11T00:01:00.000Z"),
          tool_name: "get_population",
          type: "tool_status",
        },
        {
          args: {
            city: "Delhi",
          },
          eventIds: ["cm_4", "cm_6"],
          id: "cm_4",
          result: {
            city: "Delhi",
            population: "32M",
          },
          status: "completed",
          timestamp: new Date("2025-07-11T00:01:30.000Z"),
          tool_name: "get_population",
          type: "tool_status",
        },
      ],
    },
    {
      content: "Tokyo has 37M people, while Delhi has 32M.",
      eventIds: ["cm_7"],
      id: "cm_7",
      timestamp: new Date("2025-07-11T00:03:00.000Z"),
      type: "assistant",
    },
  ]);
});

test("should derive chat messages correctly for mock stream b partial", () => {
  const baseTime = new Date("2025-07-11T00:00:00Z");
  const inputLogs = MOCK_STREAM_B.slice(0, 5).map((e, idx) => ({
    ...e,
    timestamp: new Date(baseTime.getTime() + idx * 30 * 1000),
  }));
  const derive = deriveChatMessages(inputLogs);

  expect(derive).toEqual([
    {
      content: "Compare the population of Tokyo and Delhi.",
      eventIds: ["cm_1"],
      id: "cm_1",
      timestamp: new Date("2025-07-11T00:00:00.000Z"),
      type: "user",
    },
    {
      content: "Sure, give me a moment...",
      eventIds: ["cm_2"],
      id: "cm_2",
      timestamp: new Date("2025-07-11T00:00:30.000Z"),
      type: "assistant",
    },
    {
      type: "collapsible_tools",
      id: "collapsible_cm_3",
      eventIds: ["cm_3", "cm_5", "cm_4"],
      timestamp: new Date("2025-07-11T00:01:00.000Z"),
      tool_statuses: [
        {
          args: {
            city: "Tokyo",
          },
          eventIds: ["cm_3", "cm_5"],
          id: "cm_3",
          result: {
            city: "Tokyo",
            population: "37M",
          },
          status: "completed",
          timestamp: new Date("2025-07-11T00:01:00.000Z"),
          tool_name: "get_population",
          type: "tool_status",
        },
        {
          args: {
            city: "Delhi",
          },
          eventIds: ["cm_4"],
          id: "cm_4",
          status: "requested",
          timestamp: new Date("2025-07-11T00:01:30.000Z"),
          tool_name: "get_population",
          type: "tool_status",
        },
      ],
    },
  ]);
});
