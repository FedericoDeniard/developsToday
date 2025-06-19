# Spy Cats Dashboard

A comprehensive management dashboard for the Spy Cats Agency built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🐱 **Complete CRUD Operations** for spy cats
- 📊 **Analytics Dashboard** with statistics and insights
- 🌙 **Dark/Light Mode** support
- 📱 **Responsive Design** for all devices
- 🔍 **Search & Filtering** capabilities
- 📥 **Data Export** (CSV/JSON)
- 🎯 **Mission Tracking** system
- 🎨 **Modern UI** with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (custom implementation)
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Your FastAPI backend running on port 8000

### Installation

1. Clone or download the project
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create environment file:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Update the API URL in `.env.local`:
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:8000
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The dashboard integrates with your FastAPI backend using these endpoints:

- `GET /cats` - Fetch all spy cats
- `POST /cats` - Create new spy cat
- `GET /cats/{id}` - Get single spy cat
- `PATCH /cats/{id}/salary` - Update cat salary
- `DELETE /cats/{id}` - Delete spy cat

## Project Structure

\`\`\`
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── app-sidebar.tsx     # Navigation sidebar
│   ├── spy-cat-form.tsx    # Add new cat form
│   ├── spy-cats-table.tsx  # Cats data table
│   ├── stats-cards.tsx     # Analytics cards
│   ├── export-data.tsx     # Data export functionality
│   ├── mission-tracker.tsx # Mission management
│   ├── theme-provider.tsx  # Theme context
│   └── theme-toggle.tsx    # Dark/light mode toggle
└── lib/
    ├── api.ts              # API client
    ├── types.ts            # TypeScript interfaces
    └── utils.ts            # Utility functions
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Features Overview

### Dashboard
- Real-time statistics and analytics
- Experience level distribution
- Salary insights and payroll totals

### Spy Cat Management
- Add new agents with validation
- Search and filter by name, breed, experience
- Update salaries with confirmation
- Delete agents with safety confirmation

### Data Export
- Export to CSV for spreadsheet analysis
- Export to JSON for data backup
- Timestamped filenames

### Mission Tracking
- View active, completed, and pending missions
- Progress tracking for active operations
- Agent assignment visualization

### Theme Support
- Light and dark mode
- System preference detection
- Smooth theme transitions

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | FastAPI backend URL | `http://localhost:8000` |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes as part of the Spy Cats Agency technical assessment.
