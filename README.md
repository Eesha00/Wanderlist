# Wanderlist

## Project Overview
Wanderlist is a web application designed to help users manage and explore their travel plans. It offers various features that enhance the experience of planning and sharing trips with friends and family.

## Features
- User authentication and authorization  
- Create, read, update, and delete travel plans  
- Share itineraries with friends  
- Responsive design for mobile and desktop users

## Tech Stack
- **Next.js App Router**: For server-side rendering and dynamic routing.
- **Tailwind CSS**: For styling and component design.
- **Prisma**: For database management and object-relational mapping.
- **Auth.js**: For user authentication and management.

## Setup Instructions
### 1. Install  
Ensure you have Node.js installed. Run the following command to install dependencies:
```bash
npm install
```

### 2. Environment Variables  
Create a `.env` file in the root directory and add the following variables:
```env
DATABASE_URL=your_database_url_here
NEXTAUTH_SECRET=your_secret_here
```

### 3. Prisma Migrate  
Run the Prisma migrations to set up your database:
```bash
npx prisma migrate dev
```

### 4. Development Server  
To start the development server, run:
```bash
npm run dev
```
```

## Basic Folder Structure
```
├── public/                # Static files
├── src/
│   ├── pages/            # Next.js pages
│   ├── components/       # React components
│   ├── styles/           # Global styles
│   └── prisma/           # Prisma schema
└── .env                  # Environment variables
```