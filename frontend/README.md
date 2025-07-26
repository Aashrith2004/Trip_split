# TripSplit Frontend

A beautiful, modern React frontend for the TripSplit expense splitting application.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Real-time Updates**: Dynamic expense tracking and balance calculations
- **Interactive Components**: Drag-and-drop, modals, and form validation
- **Mobile Responsive**: Works perfectly on all device sizes
- **Toast Notifications**: User-friendly feedback for all actions
- **Loading States**: Smooth loading animations and skeleton screens

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications

## 📦 Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #d946ef)
- **Secondary**: Green (#22c55e)
- **Accent**: Purple (#d946ef)

### Components
- **Cards**: Soft shadows with hover effects
- **Buttons**: Gradient backgrounds with scale animations
- **Forms**: Clean inputs with focus states
- **Modals**: Backdrop blur with smooth transitions

### Animations
- **Page Transitions**: Fade and slide effects
- **Hover Effects**: Scale and glow animations
- **Loading States**: Spinning and skeleton animations
- **Stagger Effects**: Sequential element animations

## 📱 Pages

### Home Page (`/`)
- Hero section with call-to-action
- Grid of existing trips
- Empty state for new users
- Quick access to create new trips

### Create Trip (`/create`)
- Form for trip name and participants
- Dynamic participant management
- Real-time validation
- Helpful tips and guidance

### Trip Details (`/trip/:id`)
- Complete expense management
- Real-time balance calculations
- Add/edit/delete expenses
- Participant overview
- Balance summary with visual indicators

## 🔧 Configuration

### Environment Variables
The frontend is configured to proxy API calls to `http://localhost:5000` (your backend).

### Tailwind Configuration
Custom colors, animations, and components are defined in `tailwind.config.js`.

## 🎯 Key Features

### Dynamic UI Components
- **Animated Cards**: Hover effects with glow animations
- **Interactive Forms**: Real-time validation with helpful feedback
- **Modal Dialogs**: Smooth backdrop blur and scale animations
- **Loading States**: Skeleton screens and spinning indicators
- **Toast Notifications**: Success/error feedback with icons

### Responsive Design
- **Mobile First**: Optimized for all screen sizes
- **Flexible Grid**: Adaptive layouts for different devices
- **Touch Friendly**: Large touch targets and smooth interactions

### User Experience
- **Intuitive Navigation**: Clear breadcrumbs and back buttons
- **Visual Feedback**: Hover states, loading indicators, and animations
- **Error Handling**: Graceful error states with helpful messages
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🚀 Getting Started

1. Make sure your backend is running on port 5000
2. Install frontend dependencies: `npm install`
3. Start the development server: `npm start`
4. Open http://localhost:3000 in your browser

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Header.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── CreateTrip.js
│   │   └── TripDetails.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Adding New Colors
Edit `tailwind.config.js` to add custom colors to the design system.

### Modifying Animations
Update the Framer Motion variants in components for different animation styles.

### Styling Components
Use the predefined CSS classes in `index.css` for consistent styling.

## 🔗 API Integration

The frontend integrates with your backend API endpoints:
- `GET /api/trips` - Fetch all trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/:id` - Get trip details
- `POST /api/trips/:id/expenses` - Add expense
- `PUT /api/trips/:id/expenses/:index` - Update expense
- `DELETE /api/trips/:id/expenses/:index` - Delete expense
- `GET /api/trips/:id/balances` - Calculate balances

## 🎉 Enjoy Your Beautiful TripSplit App!

Your frontend is now ready with a modern, attractive UI that provides an excellent user experience for splitting expenses with friends and family! 