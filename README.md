Here's your frontend README. Copy everything below:

---

# React Auth Frontend

A production-ready React authentication frontend connected to a Django REST API backend. Built with React, Axios, React Router, and Tailwind CSS. Features a complete authentication flow including registration, email verification, login with JWT, session restore on page refresh, silent token refresh, and logout with server-side token blacklisting.

## Live Demo

https://react-auth-frontend-mu.vercel.app

## Tech Stack

- React with Vite
- React Router DOM
- Axios
- Tailwind CSS 3
- Deployed on Vercel

## Features

- Register with email and password confirmation
- Automatic account activation when user clicks email link
- Login with JWT — access token stored in memory, refresh token in httpOnly cookie
- Session restore on page refresh — app silently refreshes token using cookie before rendering
- Axios interceptor that automatically refreshes expired access tokens
- Protected dashboard — redirects to login if not authenticated
- Forgot password — sends reset email via Resend
- Reset password — user clicks email link and lands directly on new password form
- Logout — blacklists refresh token server-side and clears cookie
- Clean UI built with Tailwind CSS

## Pages

| Route | Page | Description |
|-------|------|-------------|
| /register | Register | Create new account |
| /login | Login | Login with email and password |
| /dashboard | Dashboard | Protected page showing user info |
| /forgot-password | ForgotPassword | Request password reset email |
| /reset-password | ResetPassword | Enter new password from email link |
| /activate/:uid/:token | Activate | Handles activation link from email |

## Project Structure

src/api/axios.js — Axios instance with baseURL and response interceptor for silent token refresh

src/context/AuthContext.jsx — Global auth state with session restore on app load

src/pages/Register.jsx — Registration form

src/pages/Login.jsx — Login form

src/pages/Dashboard.jsx — Protected dashboard

src/pages/ForgotPassword.jsx — Forgot password form

src/pages/ResetPassword.jsx — Reset password form

src/pages/Activate.jsx — Handles email activation link automatically

## Local Setup

git clone https://github.com/emmanuelonyeabor68-cmd/react_auth_frontend.git

cd react_auth_frontend/auth

npm install

Create a .env file:

VITE_API_BASE_URL=http://127.0.0.1:8000

Run the development server:

npm run dev

## Connecting to Backend

Update src/api/axios.js baseURL to point to your Django backend:

For local development: http://127.0.0.1:8000

For production: https://django-auth-biolerplate.onrender.com

## Deployment on Vercel

Add vercel.json to the project root to handle React Router client-side routing:

{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }

Push to GitHub and connect repo to Vercel. Auto-deploys on every push to main.

## Security

- Access token stored in JavaScript memory only — never in localStorage
- Refresh token stored in httpOnly cookie — inaccessible to JavaScript
- Silent refresh handles token rotation without user interaction
- Server-side logout via token blacklisting

## Backend Repository

https://github.com/emmanuelonyeabor68-cmd/django-auth-biolerplate
