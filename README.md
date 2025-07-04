# Travel Voucher Generator

A modern web application for generating professional hotel and flight vouchers with PDF export functionality.

## Features

- **Hotel Voucher Generation**: Create professional hotel vouchers with guest details, check-in/out dates, and booking information
- **Flight Voucher Generation**: Generate boarding pass style flight vouchers with passenger details and travel dates
- **PDF Export**: Export vouchers as professional PDF documents
- **Responsive Design**: Works on both desktop and mobile devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Live Demo

Visit the live application: [https://censusdev.github.io/census_voucher_generator](https://censusdev.github.io/census_voucher_generator)

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/censusdev/census_voucher_generator.git
cd travel-voucher-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

This project is configured with GitHub Actions for automatic deployment:

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at `https://censusdev.github.io/census_voucher_generator`

### Manual Deployment

If you prefer manual deployment:

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Deploy:
```bash
npm run deploy
```

## Setup Instructions

### 1. Fork or Clone this Repository

- Fork this repository to your GitHub account
- Or clone it locally and push to your own repository

### 2. Update Configuration

1. In `package.json`, update the `homepage` field:
```json
"homepage": "https://censusdev.github.io/census_voucher_generator"
```

2. In `vite.config.ts`, update the base path:
```typescript
base: process.env.NODE_ENV === 'production' ? '/census_voucher_generator/' : '/'
```

### 3. Enable GitHub Pages

1. Go to your repository settings
2. Scroll down to "Pages" section
3. Under "Source", select "GitHub Actions"
4. Push to main branch to trigger deployment  

### 4. Access Your Application

Your application will be available at:
`https://censusdev.github.io/census_voucher_generator`

## Technology Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── AppLayout.tsx   # Main application layout
│   ├── VoucherForm.tsx # Form for voucher input
│   ├── HotelVoucher.tsx # Hotel voucher component
│   └── FlightVoucher.tsx # Flight voucher component
├── utils/              # Utility functions
│   └── pdfGenerator.ts # PDF generation logic
├── lib/                # Library configurations
└── pages/              # Page components
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
