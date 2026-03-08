# ATLAS OSINT Operations Console

A professional tactical intelligence console for OSINT operations, built with Next.js, TypeScript, and Node.js.

## 🚀 Features

- **Interactive World Map**: Real-time asset tracking with Mapbox GL JS
- **OSINT Tools**: IP geolocation, WHOIS lookup, DNS queries
- **Live Event Feed**: Real-time event streaming via WebSockets
- **Asset Tracking**: Monitor drones, nodes, and mobile units
- **Tactical UI**: Dark theme with cyberpunk aesthetics
- **Modular Architecture**: Clean separation of concerns

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first styling
- **Mapbox GL JS** - Interactive maps
- **Zustand** - State management
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Socket.io** - WebSocket server
- **Prisma** - Database ORM
- **SQLite** - Database

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd ATLAS
```

2. **Install dependencies**

Frontend:
```bash
cd frontend
npm install
```

Backend:
```bash
cd backend
npm install
```

3. **Configure environment variables**

Copy the example files:
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend  
cp backend/.env.example backend/.env
```

Edit the files and add your API keys:
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Get from [Mapbox](https://account.mapbox.com/access-tokens/)
- Optional: Add API keys for enhanced OSINT services

4. **Setup database**
```bash
cd backend
npx prisma generate
npx prisma db push
```

## 🎮 Running the Application

### Development Mode

Start both servers:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Health: http://localhost:3001/health

### Production Mode

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 📡 API Endpoints

### OSINT Tools

- `GET /api/osint/ip-lookup?ip=<ip_address>` - IP geolocation
- `GET /api/osint/whois?domain=<domain>` - WHOIS lookup
- `GET /api/osint/dns?domain=<domain>&type=<record_type>` - DNS lookup
- `GET /api/osint/reverse-dns?ip=<ip_address>` - Reverse DNS

### WebSocket Events

Connect to `ws://localhost:3001` to receive real-time events:
```javascript
socket.on('event', (event) => {
  console.log('New event:', event);
});
```

## 🎨 UI Components

### Main Layout
- **Header**: System status, clock, coordinates
- **Left Panel**: OSINT tools and radar widget
- **Center**: Interactive map with HUD overlay
- **Right Panel**: Live event feed and asset tracker
- **Footer**: System metrics

### Features
- **Real-time coordinates** tracking on mouse movement
- **Live clock** with UTC timestamp
- **Animated radar** widget
- **Scrolling event feed** with severity levels
- **Interactive map** with custom markers
- **Tactical animations** and scanline effects

## 🔧 Configuration

### Mapbox Setup
1. Create a free Mapbox account
2. Generate an access token
3. Add it to `frontend/.env` as `NEXT_PUBLIC_MAPBOX_TOKEN`

### OSINT Services
The application includes mock OSINT services for demonstration. For production:
1. Add API keys to `backend/.env`
2. Update service implementations in `backend/src/services/`

### Database
The application uses SQLite by default. To switch databases:
1. Update `DATABASE_URL` in `backend/.env`
2. Update `provider` in `backend/prisma/schema.prisma`
3. Run `npx prisma db push`

## 🚦 Development

### Project Structure
```
ATLAS/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/ # React components
│   │   ├── store/     # Zustand state management
│   │   └── styles/    # Global styles
│   └── package.json
├── backend/           # Node.js API server
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   ├── routes/      # API routes
│   │   └── events/      # WebSocket handling
│   ├── prisma/         # Database schema
│   └── package.json
└── shared/            # Shared TypeScript types
    └── types.ts
```

### Scripts

Frontend:
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint

Backend:
- `npm run dev` - Development with nodemon
- `npm run build` - TypeScript compilation
- `npm run start` - Production server
- `npm run lint` - ESLint

## 🎯 Usage

1. **Launch the application** following the installation steps
2. **Explore the map** - Click and drag to navigate, scroll to zoom
3. **Use OSINT tools** - Enter IPs or domains in the left panel
4. **Monitor events** - Watch the live feed for real-time updates
5. **Track assets** - View asset status in the right panel

## 🔐 Security Notes

- API keys should never be committed to version control
- Use environment variables for all sensitive configuration
- Enable CORS only for trusted origins in production
- Consider adding authentication for production deployments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes only.

## 🆘 Troubleshooting

### Common Issues

**Map not loading:**
- Check your Mapbox token in `.env`
- Ensure the token has the correct permissions

**Backend connection errors:**
- Verify backend is running on port 3001
- Check CORS settings in backend

**OSINT tools not working:**
- Some services use mock data for demonstration
- Add real API keys for production use

**Database errors:**
- Run `npx prisma generate` after schema changes
- Ensure `DATABASE_URL` is correctly configured

### Getting Help

- Check the console for error messages
- Verify all environment variables are set
- Ensure both frontend and backend are running
