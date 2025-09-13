# User Dashboard

A modern, responsive user dashboard built with React and CSS.

## Features

### 🎨 Modern UI Design
- Clean, professional interface with a dark sidebar
- Responsive design that works on all screen sizes
- Smooth hover effects and transitions
- Card-based layout for easy information consumption

### 📊 Dashboard Components

#### UserSidebar
- Fixed sidebar with navigation menu
- User profile section at the bottom
- Navigation items: Dashboard, My Plans, Usage Analytics, Settings, Billing, Support
- User badge and avatar display

#### UserTopbar
- Search functionality
- Notification bell with badge
- User profile dropdown
- Current plan display

#### UserDashboardCards
- Current Plan information
- Usage statistics for the month
- Next billing date and amount
- Data saved metrics

#### UserActivity
- Recent activity feed with different activity types
- Quick action buttons for common tasks
- Color-coded activity indicators

### 🎯 Key Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Uses CSS Grid and Flexbox for layouts
- **Interactive Elements**: Hover effects and smooth transitions
- **User-Centric**: Focused on user needs and common actions
- **Accessible**: Proper contrast ratios and semantic HTML

## File Structure

```
src/components/
├── UserDashboard.jsx          # Main dashboard container
├── UserSidebar.jsx            # Sidebar navigation
├── UserTopbar.jsx             # Top navigation bar
├── UserDashboardCards.jsx     # Dashboard metrics cards
├── UserActivity.jsx           # Activity feed and quick actions
├── UserDashboard.css          # Main dashboard styles
├── UserSidebar.css            # Sidebar styles
├── UserTopbar.css             # Topbar styles
├── UserDashboardCards.css     # Cards styles
└── UserActivity.css           # Activity section styles
```

## Usage

The UserDashboard component is imported and used in the main App.jsx file. Simply run the development server to see the dashboard in action.

```bash
npm run dev
```

## Customization

The dashboard is easily customizable:
- Colors can be changed in the CSS files
- Content can be modified in the JSX files
- Layout can be adjusted using CSS Grid and Flexbox
- New components can be added following the existing pattern


