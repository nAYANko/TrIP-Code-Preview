
# TriP - Travel Itinerary Planner

URL : https://travel-itinerary-planner-sable.vercel.app/

A modern web application for planning and organizing your travel adventures. Create custom trips, explore destinations, and manage your itineraries all in one place.

## Features

### 🗺️ Trip Planning
- Create custom trips with destinations, dates, and preferences
- Choose from prebuilt destination itineraries
- Interactive trip dashboard with visual trip cards
- Real-time trip management and editing

### 🏛️ Destination Management
- Curated collection of popular destinations
- Prebuilt itineraries with activities and timings
- Custom trip creation for any destination
- Location-based activity suggestions

### 🔐 User Authentication
- Secure user registration and login
- Profile management
- Trip data persistence per user account

### 📱 Modern Interface
- Responsive design that works on all devices
- Dark theme optimized for travel planning
- Intuitive navigation and user experience
- Custom design system with trip-themed styling

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components (shadcn/ui removed)
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd trip-planner
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── ui/             # Base UI components
│   └── ...             # Other component categories
├── hooks/              # Custom React hooks
├── pages/              # Route components
├── data/               # Static data and configurations
├── integrations/       # External service integrations
├── utils/              # Utility functions
└── lib/                # Library configurations
```

## Key Components

### Dashboard
- **DashboardHeader**: Navigation and user controls
- **TripsList**: Display and manage user trips
- **DashboardFooter**: Footer content and branding

### Trip Planning
- **DestinationSelector**: Choose destinations and create trips
- **TripPlanner**: Detailed trip editing and management
- **MapView**: Interactive map integration

### Authentication
- **AuthGuard**: Protected route wrapper
- **useAuth**: Authentication state management

## Database Schema

### Tables
- `profiles`: User profile information
- `trips`: Trip data (name, destination, dates, preferences)
- `activities`: Trip activities and itinerary items

### Authentication
Uses Supabase Auth with Row Level Security (RLS) policies to ensure users can only access their own data.

## Customization

### Design System
The app uses a custom design system defined in `src/index.css`:
- **Colors**: Dark theme with blue accents
- **Components**: Custom button styles and card layouts
- **Typography**: Alumni Sans font family

### Adding New Destinations
Add new destinations to `src/data/destinations.ts` with:
- Destination metadata (name, country, description)
- Prebuilt itineraries with activities
- Location coordinates for map integration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ for travelers everywhere
