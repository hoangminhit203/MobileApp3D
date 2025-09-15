# 🚀 Deployment Guide

## Overview
This guide covers the deployment process for MobileApp3D across different platforms and environments.

## 📱 Mobile App Deployment

### Prerequisites
- Expo CLI installed globally: `npm install -g expo-cli`
- EAS CLI installed: `npm install -g @expo/eas-cli`
- Expo account with appropriate permissions
- Apple Developer Account (for iOS)
- Google Play Console Account (for Android)

### 1. Environment Setup

#### Development Environment
```bash
# Install dependencies
npm install

# Start development server
npm start
```

#### Staging Environment
```bash
# Build staging version
eas build --profile staging --platform all
```

#### Production Environment
```bash
# Build production version
eas build --profile production --platform all
```

### 2. EAS Build Configuration

Create `eas.json` in project root:

```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "staging": {
      "distribution": "internal",
      "env": {
        "APP_ENV": "staging",
        "API_URL": "https://staging-api.yourapp.com"
      }
    },
    "production": {
      "env": {
        "APP_ENV": "production",
        "API_URL": "https://api.yourapp.com"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 3. iOS Deployment

#### App Store Connect Setup
1. Create app record in App Store Connect
2. Configure app metadata and screenshots
3. Set up TestFlight for beta testing

#### Build and Submit
```bash
# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

#### iOS-specific Configuration
```json
// app.json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.mobileapp3d",
      "buildNumber": "1.0.0",
      "supportsTablet": true,
      "requireFullScreen": false
    }
  }
}
```

### 4. Android Deployment

#### Google Play Console Setup
1. Create application in Google Play Console
2. Upload app bundle and configure release
3. Set up internal testing track

#### Build and Submit
```bash
# Build for Android
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android
```

#### Android-specific Configuration
```json
// app.json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.mobileapp3d",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
```

## 🌐 Web Deployment

### Expo Web Build
```bash
# Build web version
npx expo export:web

# The output will be in the web-build directory
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Build
npm run web

# Deploy via Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=web-build
```

### Environment Variables for Web
```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_APP_ENV=production
```

## 🔧 CI/CD Pipeline

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy App

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  build-ios:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform ios --non-interactive

  build-android:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform android --non-interactive

  deploy-web:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run web
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web-build
```

### Required Secrets
Add these secrets to your GitHub repository:
- `EXPO_TOKEN`: Your Expo access token
- `APPLE_ID`: Apple ID for iOS submissions
- `APPLE_APP_SPECIFIC_PASSWORD`: App-specific password
- `GOOGLE_SERVICE_ACCOUNT_KEY`: Google Play service account key

## 📊 Monitoring & Analytics

### Performance Monitoring
```bash
# Install Sentry for error tracking
npm install @sentry/react-native

# Install Flipper for debugging
npm install react-native-flipper
```

### Analytics Setup
```typescript
// utils/analytics.ts
import { Analytics } from 'expo-analytics';

export const analytics = new Analytics('YOUR_TRACKING_ID');

export const trackEvent = (event: string, properties?: object) => {
  analytics.event(event, properties);
};
```

### Health Checks
```typescript
// api/health.ts
export const healthCheck = async () => {
  try {
    const response = await fetch('/api/health');
    return response.ok;
  } catch (error) {
    return false;
  }
};
```

## 🔐 Security Considerations

### Environment Variables
```bash
# Store sensitive data in EAS Secrets
eas secret:create --scope project --name API_KEY --value your-api-key
```

### Code Obfuscation
```bash
# Enable code obfuscation for production builds
npm install --save-dev metro-react-native-babel-preset
```

### SSL/TLS Configuration
Ensure all API endpoints use HTTPS in production.

## 📈 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npx expo export --dump-assetmap

# Use bundle analyzer
npm install --save-dev @expo/webpack-config
```

### Image Optimization
- Use WebP format for images when possible
- Implement progressive loading
- Optimize 3D model textures

### 3D Model Optimization
- Use Draco compression for GLB files
- Implement LOD (Level of Detail)
- Optimize texture sizes

## 🔄 Release Process

### Version Management
```bash
# Update version
npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes
```

### Release Checklist
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Security scan completed
- [ ] Documentation updated
- [ ] Release notes prepared
- [ ] Beta testing completed
- [ ] Stakeholder approval

### Rollback Strategy
```bash
# Rollback to previous version if needed
eas build --platform all --profile production --clear-cache
```

## 📱 Store Optimization

### App Store Optimization (ASO)
- Optimize app title and description
- Use relevant keywords
- High-quality screenshots and videos
- Regular updates and bug fixes

### Screenshots and Metadata
- Showcase 3D visualization features
- Highlight key functionality
- Use device frames and mockups
- A/B test different descriptions

## 🚨 Troubleshooting

### Common Build Issues
```bash
# Clear cache
expo r -c

# Reset Metro cache
npx react-native start --reset-cache

# Clean EAS cache
eas build --clear-cache
```

### Platform-specific Issues
- iOS: Check provisioning profiles and certificates
- Android: Verify keystore and build configuration
- Web: Check webpack configuration and dependencies

## 📞 Support & Contact

For deployment issues:
- Check Expo documentation
- Join Expo Discord community
- Open GitHub issue for app-specific problems

---

*This deployment guide is updated regularly. Last updated: January 2025*
