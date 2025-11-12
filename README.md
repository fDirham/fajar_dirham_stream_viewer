# Stream Viewer Take Home

**By Fajar Dirham**

## Overview

A simple vite + react app to implement the take home task. Has vitest and storybook added to help during the process. The main implementation is found within the Chat component.

## How to run app

To start dev server:
`npm run dev`

To run tests:
`npm run test`

To start storybook:
`npm run storybook`

## Design decisions

### Using typescript and vite

Vite is simple, has great dev ex, and I have tons of experience in. Compared to create react app, which is barebones, and NextJS, which is SSR by default, Vite is a no brainer for something quick. I used typescript because strong typing is great.

### Encapsulating everything within one Chat component

In case we need to render the chat functionality in different contexts, e.g as part of a larger web page or an iframe to the side on a site, all the logic is encapsulated to one chat component. To render this in a different context, only a small number of css and logic changes are needed.

### Abstracted event streams

Since the instructions were a bit vague on the type of event stream, I went ahead and made an abstract AppEventStream class and implemented MockEventStream. AppEventStream was designed with websockets in mind, just having a simple abstract method for subscribe that returns an unsubscribe function and a sendMessage in case we want to send things up stream.

MockEventStream uses the mock inputs and publishes a new message every second or so. Because of this abstraction, we can easily hook actual event streams to the system.

### Deriving chat messages from a stored event list

Our subscription simply converts `AppMessageEventRaw` that we receive from the event stream into `AppMessageEventLog` objects and pushes into an array. We then have logic to transform the array into an array of `ChatMessage` objects.

- `ChatMessage` has the data already processed and ready for our components.
- Preserving the totality of event streams gives us flexibility when creating ChatMessages and helps with debugging. There shouldn't be any noticeable performance hits from doing this, but I did wrap the derivation logic in a useMemo just in case.
- The transformation logic is kept in a separate file to reduce clutter, and my only unit tests deal with this logic. It works by iterating over the events array, grouping together tool request messages into one ChatMessage object while leaving user and assistant chats mostly the same.

### Typing events and chat messages

I used simple types (not classes or interfaces) to describe raw event messages, processed event messages, and chat messages.

- The reasoning for `AppMessageEventRaw` is that we are receiving json from a server and I had experience overcomplicating things by trying to turn responses into class objects before working with them.
- There's a `AppMessageEventLog` type because I wanted to add things like timestamps and to leave room for more preprocessing in the future, although this ended up being unnecessary.
- The `ChatMessage` type was originally supposed to be a class to make use of inheritance and to encapsulate transformation logic, but I quickly realized I was overcomplicating things and trading off flexibility. So I just kept them as simple types.

These three types are union types. All types have a `type` field to discriminate between them, e.g UserChatMessage and AssistantChatMessage are identical except their `type` fields are either `user` or `assistant`. This removes the need for custom typeguards.

### Adding timestamps

When planning, I thought I would need something like timestamps for the bonus collapsible requirement and since we're making a chat UI, we might want to display time stamps. The time stamps are just new date objects created client side when a message is received, but it is unnecessary.

### ChatBlock variants

The ChatBlock component serves as a simple wrapper and switch component to determine what to render. It's given an arbitrary ChatMessage object, then clarifies its actual type (e.g UserChatMessage or ToolStatusChatMessage), and finally renders the appropriate component. I did it this way so working on or adding a specific type of chat message will be simple.

### Business logic centralized in ChatContainer

All business logic (subscribing to streams, switching streams, user input) is written within ChatContainer. This helps with testing and modifying the visual components without worrying about complex state logic. I also separated Chat to a Container and View component to help separate concerns.

### Not displaying tool calls within an assistant message

I made the decision to not show anything differently in an AssistantChatBlock if it's supposed to call a tool, believing the next message which should be a tool request is enough for UX.

### Grouping tool statuses

I created only one ChatMessage type for a tool status, believing a user should only see the status of a tool call in one chat bubble instead of multiple.

### Using vitest and storybook

Added these due to habit and I found these tools can help a lot. Vitest was useful in making sure my derivation logic is sound without needing to console log each time. Storybook is great for seeing one component with different states.

### How I implemented the collapsible bonus

- Added a new ChatMessage type
- Changed the derivation logic
- Added a new ChatBlock variant
- Reused the ToolStatusChatBlock component

ToolStatusChatMessages which are sequential get grouped together into one CollapsibleToolsChatMessage object which is rendered appropriately. A simple state tracks whether the collapsible open or closed.

I did think of using the information from an assistant message which will tell us how many tool calls were going to be called before the requests came, but I thought this might complicate logic and introduce more edge cases (e.g, what if tool call was never made due to system error, might need to add a timeout or something).

## Notes

### AI Usage

Used chatgpt for some preliminary research, github copilot for auto completions and to do menial tasks (generate dummy data, fix formatting, etc.), and used them both to help with some debugging.

### Class names are a bit weird

Most of my components have "container" class name because I was prioritizing speed, but I do know I have to be wary of this when working on prod code.

### Barebones design

I could've spent time better designing / styling things, but since I assume I'll just be tested on front end engineering, I put more thought and effort to state handling and data propagation. That said, I added things like simple animations, a custom font, and coloring to make things look pleasing.

### Time usage

Spent about 30 mins planning, didn't really time myself after but I think I spent around 3 - 4 hours total.

### What I can improve

Not really happy with some of the looks of the tool status blocks. Also might be able to clean the project up some more, better tests, better stories, better class names, etc.
