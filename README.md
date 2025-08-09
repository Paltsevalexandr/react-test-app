## Description

A simple React application for testing and demonstration purposes.
It simulates a production line time tracking system. This application helps workers 
track the duration of a build process, enter production defects, and manage extended work 
time after the scheduled duration has passed.

## Architecture explanation

The **react-test-app** project is a frontend application built 
with React using functional components and hooks. 
Its architecture and major decisions include:

- **Component-based structure:** UI is divided into reusable components (e.g., `Popup` for session tracking and time management).
- **State management with hooks:** Uses React's `useState` for 
managing local state and side effects, such as timers and localStorage interactions.
- **Local storage integration:** Persists session and timing data in the browser's localStorage to maintain state across page reloads.
- **User interaction:** Provides popups and buttons for users to track time, 
reset sessions, and submit data, ensuring a responsive and interactive experience.
- **API communication:** Designed to interact with backend endpoints (such as those from `express-test-app`) for submitting and retrieving session, defect, and timing data.
- **Extensibility:** The architecture allows easy addition of new features or UI components as needed.

These decisions ensure the frontend is modular, maintainable, and easily connects to backend services for a seamless user experience.

## Getting Started

Installation
Clone the repository: git clone https://github.com/Paltsevalexandr/react-test-app.git 
cd react-test-app

Install dependencies: 
npm install


Running the App
npm run dev

Open [http://localhost:3000] with your browser to see the result.


Using the app
The app has 3 users and 3 builds:
1. login id: user1, build number 1
2. login id: user2, build number 2
3. login id: user3, build number 3

I made different time_per_part and number_of_parts so 
you will have different total time of the timer for testing:
1. 5 minutes
2. 1 minute
3. 21 minutes








