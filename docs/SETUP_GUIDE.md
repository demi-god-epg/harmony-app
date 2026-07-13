# Harmony Lifebond - Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Database**: PostgreSQL or MongoDB
- **Code Editor**: VS Code, WebStorm, or similar

### For Mobile Development (Optional)
- **React Native CLI** - `npm install -g react-native-cli`
- **Android Studio** (for Android development)
- **Xcode** (for iOS development on macOS)
- **Flutter SDK** (if using Flutter)

---

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/demi-god-epg/harmony-app.git
cd harmony-app
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Lerna will automatically install dependencies for all packages
```

### 3. Environment Configuration

Create `.env` files in each package:

#### `packages/api/.env`

```env
# Server Configuration
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/harmony_db
# OR for MongoDB:
# DATABASE_URL=mongodb://localhost:27017/harmony

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRY=7d

# OTP Configuration
OTP_SECRET=your-otp-secret
OTP_EXPIRY=10m

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@harmonylifebond.com

# Mobile Money Integration
MTN_MOBILE_MONEY_API_KEY=your-mtn-api-key
MTN_MOBILE_MONEY_USER_ID=your-user-id
MTN_MOBILE_MONEY_API_SECRET=your-api-secret
MTN_PRIMARY_KEY=your-primary-key

# Vodafone Cash
VODAFONE_API_KEY=your-vodafone-key
VODAFONE_MERCHANT_ID=your-merchant-id

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=harmony-lifebond-bucket

# Sentry (error tracking)
SENTRY_DSN=your-sentry-dsn
```

#### `packages/web/.env`

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Harmony Lifebond
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
```

#### `packages/mobile/.env`

```env
API_URL=http://localhost:3001/api
APP_NAME=Harmony Lifebond
SENTRY_KEY=your-sentry-key
```

### 4. Database Setup

#### PostgreSQL Setup

```bash
# Create database
createbdb harmony_db

# Run migrations (from packages/api directory)
cd packages/api
npm run migrate:latest
cd ../..
```

#### MongoDB Setup

```bash
# Make sure MongoDB is running
mongod

# Seed initial data
cd packages/api
npm run db:seed
cd ../..
```

---

## 💻 Running Development Servers

### Start All Packages in Development Mode

```bash
npm run dev
```

This will run:
- **API**: http://localhost:3001
- **Web**: http://localhost:5173
- **Admin**: http://localhost:5174

### Start Individual Packages

```bash
# API only
cd packages/api
npm run dev

# Web PWA only
cd packages/web
npm run dev

# Mobile only
cd packages/mobile
npm start

# Admin only
cd packages/admin
npm run dev
```

---

## 🏗️ Building for Production

### Build All Packages

```bash
npm run build
```

### Build Individual Packages

```bash
# API
cd packages/api && npm run build

# Web PWA
cd packages/web && npm run build

# Mobile (Android APK)
cd packages/mobile && npm run build:android

# Mobile (iOS IPA)
cd packages/mobile && npm run build:ios
```

---

## 📱 Mobile Development

### Android

```bash
cd packages/mobile

# Run on emulator
npm run android

# Build APK
npm run build:android

# Build APK for release
npm run build:android:release
```

### iOS

```bash
cd packages/mobile

# Run on simulator
npm run ios

# Build IPA
npm run build:ios
```

---

## 🧪 Testing

### Run All Tests

```bash
npm run test
```

### Run Tests for Specific Package

```bash
cd packages/api && npm run test
cd packages/web && npm run test
```

### Test Coverage

```bash
npm run test:coverage
```

---

## 📝 Code Quality

### Linting

```bash
# Lint all packages
npm run lint

# Fix lint errors
npm run lint:fix
```

### Formatting

```bash
# Format all packages
npm run format
```

---

## 🔐 Security Checks

```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- AWS
- Google Cloud
- Azure
- Heroku
- DigitalOcean

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Node Modules Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Database Connection Issues

```bash
# Check database is running
psql --version  # for PostgreSQL
mongo --version  # for MongoDB

# Test connection
psql -U username -d harmony_db -h localhost
```

---

## 📚 Additional Resources

- [API Documentation](./API_DOCUMENTATION.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

---

## 💬 Support

For help, contact:
- **Email**: harmonylifebond@gmail.com
- **WhatsApp**: +233 054 601 3582
- **Phone**: +233 054 601 3582
