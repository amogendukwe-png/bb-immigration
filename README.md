# Barbados Visa and Immigration Service (BB-Visa)

A prototype digital government service for the Barbados Immigration Department. This application streamlines the application process for multiple immigration pathways using a modern, accessible interface based on Digital Government (GDS) design principles.

## Features

- **Multi-Pathway Routing**: Dynamic form flow based on journey selection (Passport, Work Permit, Citizenship, Residency, or Study).
- **One-Thing-Per-Page Design**: Minimizes cognitive load by presenting one logical block of information at a time.
- **Dynamic Eligibility Logic**: Validates age, citizenship, and specific subtypes (e.g., C2 vs C3 Work Permits) before allowing progression.
- **Repeatable Data Entry**: Supports adding multiple dependants and full residence history tracking.
- **Prototype Payment Simulator**: Simulates the EZPay+ government payment gateway integration.
- **Document Evidence Tracking**: Context-aware upload checklists based on the selected application type.

## Pathways Supported

1.  **Immigration Passport**: Full application flow for adults and children.
2.  **Work Permit**: Supports Long-term (C2) and Short-term (C3) applications.
3.  **Citizenship**: Handles claims via Descent, Marriage, and Registration.
4.  **Reside Permanently**: Pathway for permanent residency including residence history tracking.
5.  **Study**: H-1 Certificate of Eligibility lookup and H-2 application linking.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Animation**: Motion (motion/react)
- **Deployment Interface**: Designed for Cloud Run environment

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/efeosasereOkoro/bb-visa.git
   cd bb-visa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `src/App.tsx`: Central form manager and step router.
- `src/lib/routing-engine.ts`: Contains the logic for forward and backward navigation.
- `src/context/FormContext.tsx`: Universal state management for the multi-step application.
- `src/components/blocks/`: Individual form sections (Eligibility, Personal Details, etc.).

## License

SPDX-License-Identifier: Apache-2.0
