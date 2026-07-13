# Harmony Lifebond - Deployment Guide

## 🚀 Deployment Strategies

Choose your preferred platform for deployment:

---

## 1. 🌐 Heroku Deployment

### Prerequisites
- Heroku account
- Heroku CLI installed

### Deploy Backend API

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create harmony-lifebond-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your-postgres-url
heroku config:set JWT_SECRET=your-secret
heroku config:set MTN_MOBILE_MONEY_API_KEY=your-key

# Deploy
git push heroku main:main

# View logs
heroku logs --tail
```

### Deploy Frontend to Heroku

```bash
# Create app
heroku create harmony-lifebond-web

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Deploy
git push heroku main:main
```

---

## 2. ☁️ AWS Deployment

### Backend on Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js-14 harmony-lifebond-api

# Create environment
eb create production

# Set environment variables
eb setenv NODE_ENV=production DATABASE_URL=your-url

# Deploy
eb deploy
```

### Frontend on S3 + CloudFront

```bash
# Build the application
npm run build

# Upload to S3
aws s3 sync packages/web/dist s3://harmony-lifebond-web --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## 3. 🔷 Google Cloud Deployment

### App Engine

```bash
# Install Google Cloud CLI
# https://cloud.google.com/sdk/docs/install

# Initialize
gcloud init

# Create app.yaml in root
# runtime: nodejs14
# env: standard

# Deploy
gcloud app deploy
```

### Cloud Run

```bash
# Build Docker image
docker build -t harmony-api:latest packages/api/

# Push to Container Registry
docker tag harmony-api:latest gcr.io/PROJECT_ID/harmony-api:latest
docker push gcr.io/PROJECT_ID/harmony-api:latest

# Deploy to Cloud Run
gcloud run deploy harmony-api \
  --image gcr.io/PROJECT_ID/harmony-api:latest \
  --platform managed \
  --region us-central1
```

---

## 4. 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:14-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/api/package.json ./packages/api/

# Install dependencies
RUN npm ci --only=production

# Copy app code
COPY packages/api ./packages/api

# Build
RUN npm run build

# Expose port
EXPOSE 3001

# Start app
CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/harmony
      NODE_ENV: production
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: harmony
    volumes:
      - postgres_data:/var/lib/postgresql/data

  web:
    build:
      context: .
      dockerfile: Dockerfile.web
    ports:
      - "3000:3000"
    depends_on:
      - api

volumes:
  postgres_data:
```

---

## 5. 📱 Mobile App Deployment

### Android (Google Play Store)

```bash
cd packages/mobile

# Build release APK
npm run build:android:release

# Create app bundle
cd android
./gradlew bundleRelease
```

Then:
1. Create Google Play Developer account
2. Create new app
3. Upload APK/AAB
4. Fill app details
5. Submit for review

### iOS (App Store)

```bash
cd packages/mobile

# Build
npm run build:ios

# Archive
xcodebuild -workspace ios/HarmonyLifebond.xcworkspace \
  -scheme HarmonyLifebond \
  -configuration Release \
  -archivePath build/HarmonyLifebond.xcarchive \
  archive
```

Then:
1. Register Apple Developer account
2. Create new app in App Store Connect
3. Upload IPA using Transporter
4. Add app details
5. Submit for review

---

## 6. 📊 Database Deployment

### PostgreSQL on AWS RDS

```bash
# Create RDS instance via AWS Console or CLI
aws rds create-db-instance \
  --db-instance-identifier harmony-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YourPassword123

# Connect and migrate
psql -h harmony-db.xxx.rds.amazonaws.com -U admin -d harmony
\i migrate.sql
```

### MongoDB Atlas

1. Create cluster on MongoDB Atlas
2. Add IP whitelist
3. Create database user
4. Get connection string
5. Update environment variable

---

## 7. 🔐 SSL/TLS Certificate

### Using Let's Encrypt

```bash
# Using Certbot
sudo certbot certonly --standalone -d harmonylifebond.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Using AWS Certificate Manager

1. Go to AWS Certificate Manager
2. Request certificate
3. Validate domain
4. Attach to CloudFront/ALB

---

## 8. 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          npm install -g heroku
          heroku login
          git push heroku main:main
```

---

## 9. 📊 Monitoring & Analytics

### Sentry Error Tracking

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Google Analytics

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 10. 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] Database backups automated
- [ ] Monitoring and logging enabled
- [ ] Regular security audits scheduled
- [ ] Secrets rotation implemented

---

For more help, contact: harmonylifebond@gmail.com
