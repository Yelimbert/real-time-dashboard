# Real-Time Alert and Chat Dashboard

A real-time dashboard that displays alerts and supports WebSocket-based chat. This project uses Next.js with a modular structure and mock WebSocket servers for both alert and chat streams.

# Setup Instructions

## 1. Clone the repository
`git clone`

`cd project-name`

## 2. Install dependencies
`npm install`

## 3. Run the development environment
`npm run dev`

# Project Architecture

The application is built using Next.js (App Router) and follows a modular structure. It consists of:

* A map and alert feed page located in app/alert-feed/, which renders real-time alerts received through a WebSocket connection (useWebSocketAlerts).
* A chat panel, accessible globally, which uses useWebSocketChat to communicate with a separate mock WebSocket server for real-time messaging.
* Shared components like Map, AlertMarker, ChatPanel, and ThemeToggle are stored under components/, promoting reusability and separation of concerns.
* Global styles and light/dark theme handling are managed through globals.css and the ThemeWrapper component.
* Two local WebSocket servers (mock-server.js and chat-server.js) simulate real-time data for alerts and chat.

# Assumptions and Limitations

* Assumes Node.js and npm are installed on the system.
* Mock servers are designed for local development only.
* No database or backend persistence.
* Map markers and coordinates are hardcoded for demo purposes.
* Basic theme toggle included, no advanced accessibility support yet.

# How to Run with Local Mock WebSocket Servers

No additional configuration is required.

#### Just run:
`npm run dev`

This will concurrently launch:

* mock-server.js on port 8080 (alerts)
* chat-server.js on port 8081 (chat)
* The Next.js frontend on port 3000 (by default)

Make sure ports 8080, 8081, and 3000 are free.
