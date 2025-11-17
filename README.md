Finance Management Dashboard — Next.js + Appwrite

A modern, responsive Invoice Management Application for small businesses. This web application is built with Next.js 14, Appwrite, TailwindCSS, and Zustand.
The app allows business owner  to:
    Register and log in Account
    View Dashboard Analytics
    Create and management all invoices in real time
     Auto-calculate VAT
     View Fianacial Summaries ( Total Revenue, Pending Inovices, VAT collection).


This project demonstrates clean UI/UX design, Appwrite authentication, modern state management, and a scalable frontend architecture.

Features
         Authentication

User Registration (Full name, email, password)

Login / Logout

Secure Appwrite Email Session Authentication

Toast notifications for actions

         Dashboard & Analytics

Total invoices

Total revenue

Pending invoices

Paid invoices

Modern dashboard cards with icons and animations

    Invoice Management

Create invoice

View invoices

Edit invoice

Delete invoice

Automatic VAT calculations

Real-time update using Zustand global state

    User Interface

Beautiful split-screen login & register pages

Lemon-green theme (#8F0)

Clean, professional invoice form

Enhanced input borders

Fully responsive for web + mobile

    Database (Appwrite)

Appwrite Database & Collection integration

CRUD operations

Secure environment variable configuration

    Tech Stack
Area	Technology
Frontend	Next.js 14 (App Router)
Styling	TailwindCSS
UI Components	Shadcn/UI
State Management	Zustand
Backend (Serverless)	Appwrite Cloud
Authentication	Appwrite Account API
Database	Appwrite Databases API
Icons	react-icons & lucide-react


Environment Variables
Create a .env.local file in the root of your project
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=XXXXXXXX
NEXT_PUBLIC_APPWRITE_DB_ID=XXXXXXXX
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=XXXXXXX

Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/kingemmy01/Finance-Management-Dashboard.git
cd finance-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Add your .env.local file

Make sure you add the Appwrite credentials.

4️⃣ Run the development server
npm run dev


Visit:
👉 http://localhost:3000

Deployment :(Vercel Recommended)
Steps:

Go to https://vercel.com

Click New Project

Import your GitHub repo

Add environment variables under Project Settings → Environment Variables

Click Deploy

Vercel will automatically detect Next.js and configure everything.



ACKNOWLEGMENT
This project was completed as part of the first technical challenge for an internship program with Talentra

