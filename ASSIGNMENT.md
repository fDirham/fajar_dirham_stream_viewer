# Take-Home Assignment: Event Stream Viewer (Frontend Engineer)

### Objective

Build a **React-based Event Stream Viewer** that visualizes an evolving conversation between a user, an AI assistant, and its tool calls (e.g., API executions). The candidate should demonstrate strong React fundamentals, component design, state management, and handling of real-time or pseudo-real-time event streams.

It is ok to take help from AI for the exercise.

---

## Requirements

### Core Task

You’ll receive multiple **Event Streams**, each containing a list of events such as:

- **User Message Event**
- **Assistant Message Event** (text, or text + tool call)
- **Tool Call Request Event**
- **Tool Call Execution Start Event**
- **Tool Call Execution Complete Event**

Your task is to:

1. Build a React component that **subscribes to a selected Event Stream** (based on an ID).
2. Render a dynamic conversation View that updates as events arrive.
3. Provide a simple UI control (dropdown or buttons) to **switch between Event Streams**, updating the rendered View accordingly. You should hardcode a set of events per stream ID for this exercise. Use the sample streams provided below, or add your own.

---

## Sample Event Streams

### Stream A – Simple User/Assistant Conversation

```json
[
  {
    "id": 1,
    "type": "user_message",
    "content": "What’s the weather in San Francisco?"
  },
  {
    "id": 2,
    "type": "assistant_message",
    "content": "Let me check that for you...",
    "tool_call_ids": [3]
  },
  {
    "id": 3,
    "type": "tool_call_request",
    "tool_name": "get_weather",
    "args": { "location": "San Francisco" }
  },
  { "id": 4, "type": "tool_call_execution_start", "tool_name": "get_weather" },
  {
    "id": 5,
    "type": "tool_call_execution_complete",
    "tool_name": "get_weather",
    "result": { "temperature": "18°C", "condition": "Cloudy" }
  },
  {
    "id": 6,
    "type": "assistant_message",
    "content": "It’s currently 18°C and cloudy in San Francisco."
  }
]
```

### Stream B – Multiple Tool Calls Grouped

```json
[
  {
    "id": 1,
    "type": "user_message",
    "content": "Compare the population of Tokyo and Delhi."
  },
  {
    "id": 2,
    "type": "assistant_message",
    "content": "Sure, give me a moment...",
    "tool_call_ids": [3, 4]
  },
  {
    "id": 3,
    "type": "tool_call_request",
    "tool_name": "get_population",
    "args": { "city": "Tokyo" }
  },
  {
    "id": 4,
    "type": "tool_call_request",
    "tool_name": "get_population",
    "args": { "city": "Delhi" }
  },
  {
    "id": 5,
    "type": "tool_call_execution_complete",
    "tool_name": "get_population",
    "result": { "city": "Tokyo", "population": "37M" }
  },
  {
    "id": 6,
    "type": "tool_call_execution_complete",
    "tool_name": "get_population",
    "result": { "city": "Delhi", "population": "32M" }
  },
  {
    "id": 7,
    "type": "assistant_message",
    "content": "Tokyo has 37M people, while Delhi has 32M."
  }
]
```

### Stream C – Tool Call Incomplete

```json
[
  {
    "id": 1,
    "type": "user_message",
    "content": "Find movie theaters near me."
  },
  {
    "id": 2,
    "type": "assistant_message",
    "content": "Okay, fetching that info...",
    "tool_call_ids": [3]
  },
  {
    "id": 3,
    "type": "tool_call_request",
    "tool_name": "find_theaters",
    "args": { "location": "San Francisco" }
  },
  { "id": 4, "type": "tool_call_execution_start", "tool_name": "find_theaters" }
]
```

---

## Expected UI Behavior

- **Event Subscription:** When switching Event Streams, clear previous state and render the selected stream.
- **Dynamic Rendering:**

  - Render user and assistant messages in a chat-like UI.
  - Render tool calls as structured blocks - show some details if possible
  - Optional : If a tool call has started but not completed, render it as an “in-progress” state.

- **Bonus (Optional):**

  - Group sequential tool calls into a **collapsible summary block**.

---

## Deliverables

- A React app (Vite/Next.js/Create React App acceptable)
- Component(s) to display event streams
- A clear README.md describing:

  - How to run the app
  - Key design decisions
  - Bonus implementations (if any)

- It is ok to use AI help, but do mention that explicitly.

---

## Timebox

You have **3-4 hours** to complete this exercise.
You are **not** expected to polish for production, but you should demonstrate:

- Sound component architecture
- Clean and readable code
- React best practices
- Thoughtful handling of edge cases

---

**Good luck!**
