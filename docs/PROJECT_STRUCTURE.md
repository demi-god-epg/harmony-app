# Harmony Lifebond - Project Structure

## Monorepo Architecture

This project uses Lerna and npm Workspaces to manage a monorepo with multiple packages.

```
harmony-app/
├── packages/
│   ├── api/                     # Backend API Services
│   │   ├── src/
│   │   │   ├── controllers/     # Route controllers
│   │   │   ├── middleware/      # Express middleware
│   │   │   ├── models/          # Database models
│   │   │   ├── routes/          # API routes
│   │   │   ├── services/        # Business logic
│   │   │   ├── utils/           # Utility functions
│   │   │   └── index.ts         # Entry point
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── web/                     # PWA Web Application (React)
│   │   ├── src/
│   │   │   ├── components/      # React components
│   │   │   ├── pages/           # Page components
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── store/           # Zustand state management
│   │   │   ├── api/             # API client functions
│   │   │   ├── utils/           # Utility functions
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── public/
│   │   │   ├── sw.js            # Service Worker
│   │   │   ├── manifest.json    # PWA Manifest
│   │   │   └── icons/           # App icons
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   ├── mobile/                  # Mobile App (React Native / Flutter)
│   │   ├── src/
│   │   │   ├── screens/         # Screen components
│   │   │   ├── components/      # Reusable components
│   │   │   ├── navigation/      # Navigation configuration
│   │   │   ├── api/             # API client
│   │   │   ├── store/           # State management
│   │   │   └── App.tsx
│   │   ├── android/             # Android native code
│   │   ├── ios/                 # iOS native code
│   │   ├── package.json
│   │   └── app.json
│   │
│   └── admin/                   # Admin Dashboard (React)
│       ├── src/
│       │   ├── components/      # Admin components
│       │   ├── pages/           # Admin pages
│       │   ├── api/             # API client
│       │   ├── store/           # State management
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── public/
│       ├── index.html
│       ├── vite.config.ts
│       └── package.json
│
├── docs/                        # Documentation
│   ├── PROJECT_STRUCTURE.md     # This file
│   ├── API_DOCUMENTATION.md     # API endpoints reference
│   ├── SETUP_GUIDE.md           # Getting started guide
│   ├── DEPLOYMENT.md            # Deployment instructions
│   └── DATABASE_SCHEMA.md       # Database design
│
├── .github/
│   └── workflows/               # GitHub Actions CI/CD
│       ├── build.yml
│       ├── deploy.yml
│       └── test.yml
│
├── scripts/                     # Build and deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   └── setup-env.sh
│
├── .gitignore
├── .env.example
├── lerna.json                   # Lerna configuration
├── package.json                 # Root package.json
└── README.md
```

## Package Descriptions

### 📦 API Package (`packages/api`)
**Backend Express.js API Server**
- User authentication and authorization
- Member registration and profile management
- Payment processing and verification
- Financial support applications
- News and announcements management
- Event management
- Admin functions
- Data persistence with PostgreSQL/MongoDB

### 🌐 Web Package (`packages/web`)
**Progressive Web App (PWA) - React**
- Responsive web interface
- Home dashboard
- Member portal
- Payment processing
- Financial support applications
- Community features
- Offline-first with Service Workers
- Installable on all devices

### 📱 Mobile Package (`packages/mobile`)
**Native Mobile Apps**
- Cross-platform using React Native or Flutter
- iOS app (.ipa)
- Android app (.apk)
- Push notifications
- Camera integration (ID capture)
- QR code scanner
- Offline capabilities

### 👨‍💼 Admin Package (`packages/admin`)
**Admin Dashboard - React**
- Member management
- Application approval workflow
- Payment verification
- Financial reports
- User analytics
- Content management
- System configuration

## Technology Stack

### Frontend
- **PWA/Web**: React 18, TypeScript, Vite, Tailwind CSS
- **Mobile**: React Native / Flutter
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Query Management**: TanStack React Query

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL / MongoDB
- **Authentication**: JWT + OTP
- **Payment Gateway**: MTN Mobile Money / Vodafone Cash APIs

### DevOps & Deployment
- **Version Control**: Git & GitHub
- **CI/CD**: GitHub Actions
- **Container**: Docker (optional)
- **Hosting**: AWS / Google Cloud / Heroku
- **CDN**: CloudFlare

## Development Workflow

1. **Feature Development**
   - Create feature branch: `git checkout -b feature/feature-name`
   - Make changes across relevant packages
   - Run tests: `npm run test`
   - Lint code: `npm run lint`

2. **Monorepo Commands**
   - Install dependencies: `npm install` (installs for all packages)
   - Run dev servers: `npm run dev` (runs all packages in parallel)
   - Build all packages: `npm run build`
   - Run tests: `npm run test`

3. **Deployment**
   - Merge to main branch
   - GitHub Actions automatically builds and deploys
   - Each package has its own deployment configuration

## Environment Variables

Each package requires its own `.env` file:

### API (.env)
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:pass@localhost/harmony_db
JWT_SECRET=your-secret-key
MOBILE_MONEY_API_KEY=mtn-api-key
```

### Web (.env)
```
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Harmony Lifebond
```

### Mobile (.env)
```
API_URL=http://your-api-domain.com/api
SENTRY_KEY=your-sentry-key
```

## Getting Started

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions on:
- Environment setup
- Installing dependencies
- Running development servers
- Building for production
- Deploying to cloud platforms

## Contributing

Please follow the contribution guidelines:
1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request
5. Wait for code review and CI/CD to pass

## Support

For questions or issues, contact: harmonylifebond@gmail.com
