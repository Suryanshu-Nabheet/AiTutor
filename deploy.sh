#!/bin/bash

# AiTutor - Perfect Deployment Script
# This script ensures a clean, error-free deployment to Vercel

echo "🚀 Starting AiTutor Deployment Process..."

# Step 1: Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist
rm -rf node_modules/.vite
echo "✅ Cleanup completed"

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm ci
echo "✅ Dependencies installed"

# Step 3: Type check
echo "🔍 Running type check..."
npm run typecheck
if [ $? -ne 0 ]; then
    echo "❌ Type check failed"
    exit 1
fi
echo "✅ Type check passed"

# Step 4: Lint check
echo "🔍 Running lint check..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Lint check failed"
    exit 1
fi
echo "✅ Lint check passed"

# Step 5: Build for production
echo "🏗️ Building for production..."
npm run build:production
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ Build completed successfully"

# Step 6: Verify build output
echo "🔍 Verifying build output..."
if [ ! -d "dist" ]; then
    echo "❌ Dist directory not found"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ index.html not found in dist"
    exit 1
fi

echo "✅ Build output verified"

# Step 7: Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod --yes
if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "🌐 Your app is now live at: https://aitutorx.vercel.app"
echo ""
echo "📊 Deployment Summary:"
echo "  ✅ Clean build"
echo "  ✅ Type check passed"
echo "  ✅ Lint check passed"
echo "  ✅ Production build successful"
echo "  ✅ Vercel deployment successful"
echo ""
echo "🎯 Your AiTutor is now live and ready for millions of users!"
