# 🌊 Muscat Bay Operations Hub

A modern, responsive web application for showcasing operational data and analytics for Muscat Bay. Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components.

![Muscat Bay Operations Hub](https://img.shields.io/badge/Status-Live-green?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Modern Navigation System
- **Responsive Design**: Seamlessly adapts from desktop to mobile with collapsible hamburger menu
- **Muscat Bay Branding**: Custom color palette (#4E4456, #A8D5E3, etc.) with gradients and modern effects
- **Interactive Elements**: Hover effects, active states, smooth transitions, and shimmer animations
- **User Experience**: Search functionality, notification badges, and professional user profile section

### 🏗️ Architecture
- **Next.js 15 App Router**: Modern file-based routing with server components
- **TypeScript**: Full type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first styling with custom Muscat Bay design tokens
- **shadcn/ui Components**: Accessible, customizable UI components
- **Responsive Layout**: Mobile-first design with desktop optimization

### 📊 Operational Modules
- **Dashboard**: Overview of all systems with KPIs and alerts
- **Electricity Analysis**: Power consumption & efficiency analytics
- **Water Analysis**: Water distribution & loss monitoring
- **STP Plant**: Sewage treatment performance tracking
- **Contractor Tracker**: Contractor management & tracking
- **Anomaly Detection**: AI-powered anomaly alerts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ARahim900/muscat-operations-hub.git
cd muscat-operations-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:9002` to see the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Color Palette
The application uses a carefully crafted color palette inspired by the Muscat Bay branding:

```css
/* Primary Colors */
--muscat-bay-primary: #4E4456        /* Main brand color */
--muscat-bay-primary-light: #5f5168  /* Lighter variant */
--muscat-bay-primary-dark: #3B3241   /* Darker variant */

/* Accent Colors */
--muscat-bay-accent: #A8D5E3         /* Soft teal for highlights */
--muscat-bay-accent-light: #C3FBF4   /* Light teal variant */
--muscat-bay-gold: #BFA181           /* Muted gold */
--muscat-bay-navy: #0A1828           /* Deep navy */
```

### Gradients
- **Primary Gradient**: `linear-gradient(135deg, #4E4456 0%, #5f5168 50%, #3B3241 100%)`
- **Accent Gradient**: `linear-gradient(135deg, #A8D5E3 0%, #C3FBF4 100%)`
- **Glass Effect**: `backdrop-blur(10px)` with subtle transparency

### Typography
- **Primary Font**: Inter (imported from Google Fonts)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Responsive Sizing**: Optimized for all screen sizes

## 📱 Navigation Features

### Desktop Experience
- **Horizontal Navigation**: Clean, professional navigation bar
- **Search Integration**: Global search functionality
- **User Profile**: Professional user avatar and role display
- **Notifications**: Badge-based notification system
- **Active States**: Clear indication of current page

### Mobile Experience
- **Hamburger Menu**: Smooth animated menu toggle
- **Collapsible Panel**: Full-screen navigation overlay
- **Touch Optimization**: Large tap targets and touch-friendly interactions
- **Responsive Layout**: Optimized for all mobile screen sizes

### Interactive Elements
- **Hover Effects**: Subtle animations and color transitions
- **Shimmer Animations**: Modern loading and interaction feedback
- **Active States**: Clear visual feedback for current page
- **Micro-animations**: Floating logo, smooth transitions

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # Grouped routes
│   │   ├── dashboard/     # Dashboard page
│   │   ├── electricity-analysis/
│   │   ├── water-analysis/
│   │   ├── stp-plant/
│   │   ├── contractor-tracker/
│   │   ├── anomaly-detection/
│   │   └── layout.tsx     # App pages layout
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage (redirects to dashboard)
├── components/
│   ├── layout/           # Layout components
│   │   ├── modern-navbar.tsx
│   │   ├── modern-app-shell.tsx
│   │   └── app-shell.tsx (legacy)
│   ├── ui/              # shadcn/ui components
│   └── common/          # Shared components
├── lib/                 # Utilities
└── hooks/              # Custom React hooks
```

## 🔧 Configuration

### Tailwind Configuration
The project includes a comprehensive Tailwind configuration with:
- Custom Muscat Bay color tokens
- Modern gradients and effects
- Custom animations (shimmer, float)
- Extended typography and spacing

### Environment Setup
The project is configured for development with:
- **Port**: 9002 (configurable in package.json)
- **Turbopack**: Enabled for faster development builds
- **TypeScript**: Strict type checking
- **ESLint**: Code quality and consistency

## 🎯 Usage Guidelines

### Adding New Pages
1. Create a new directory in `src/app/(app)/`
2. Add `page.tsx` for the route component
3. Update navigation in `src/components/layout/modern-navbar.tsx`

### Customizing Colors
1. Update color tokens in `tailwind.config.ts`
2. Modify gradients and effects as needed
3. Test across all components for consistency

### Mobile Responsiveness
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Test on multiple device sizes
- Ensure touch targets are at least 44px

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for Muscat Bay operations.

## 🆘 Support

For technical support or questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in `/docs`

---

**Built with ❤️ for Muscat Bay Operations**
