# Invoice Management App

A professional, high-fidelity Invoice Management System built with **React 19** and **Vite**. This application allows users to manage invoices efficiently with a premium UI/UX, featuring dark mode support and full data persistence.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Vict3310/FE-stage-2-HNG.git
   ```
2. Navigate to the project directory:
   ```bash
   cd FE-stage-2-HNG
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Building for Production
```bash
npm run build
```

---

## 🏗️ Architecture

The project follows a modular, component-based architecture designed for scalability and maintainability:

- **State Management**: Uses the **React Context API** to manage global states:
  - `InvoiceContext`: Handles the collection of invoices, including CRUD operations (Create, Read, Update, Delete) and status updates.
  - `ThemeContext`: Manages the application's theme (Light/Dark mode) and persists the user's preference.
- **Routing**: **React Router Dom** handles navigation between the dashboard (Home) and individual invoice detail pages.
- **Persistence**: **LocalStorage** is used to sync both the invoice data and theme settings, ensuring a seamless experience across browser sessions.
- **Styling**: Structured with **Vanilla CSS** and CSS Variables for dynamic theme switching and precise layout control.

---

## ⚖️ Trade-offs

- **Context API vs. Redux**: For the current scope of the application, the Context API was chosen over Redux to reduce boilerplate and complexity while still providing efficient global state access.
- **LocalStorage vs. Backend API**: LocalStorage was implemented to provide immediate persistence and a functional demo without requiring a database setup. The architecture is designed such that switching to a REST API would only require updating the `InvoiceContext` hooks.
- **Vanilla CSS**: I opted for Vanilla CSS to achieve the specific, high-end aesthetic required for the project, avoiding the potential overhead and design constraints of a utility-first framework like Tailwind for this particular use case.

---

## ♿ Accessibility Notes

- **Semantic HTML**: Utilizes proper HTML5 elements (`<main>`, `<nav>`, `<header>`, `<button>`, `<section>`) to ensure correct document structure for screen readers.
- **Interactive Elements**: All buttons and interactive inputs have unique IDs and descriptive labels.
- **Color Contrast**: Both Light and Dark themes are designed with high-contrast ratios to meet WCAG standards for readability.
- **Keyboard Navigation**: Interactive elements like the "Mark as Paid" button and "New Invoice" form are accessible via keyboard.
- **Focus Management**: The Delete Confirmation Modal implements focus trapping to ensure users can interact with the modal without losing their place on the page.

---

## ✨ Improvements Beyond Requirements

1.  **Full Persistence**: Unlike standard static demos, this app fully persists all changes (new invoices, edits, status changes, and deletions) to `localStorage`.
2.  **Theme Persistence**: The user's preference for Light or Dark mode is remembered across reloads.
3.  **Dynamic Calculations**: The invoice form automatically calculates totals for items in real-time as the user adds or modifies them.
4.  **Responsive Layout**: A custom-built sidebar that adapts from a fixed side-nav on desktop to a top-bar on mobile, optimizing screen real estate.
5.  **Status Flow**: Implemented a logical status transition (e.g., only "Pending" invoices can be "Marked as Paid").
6.  **Form UX**: Includes a dynamic "Item List" that allows users to add/remove items on the fly with automatic sub-totaling.

---

## 🛠️ Tech Stack

- **React 19**
- **Vite**
- **React Router 7**
- **Vanilla CSS**
- **Lucide React** (for icons, if applicable)
- **Local Storage API**
