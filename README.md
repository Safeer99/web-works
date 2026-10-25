# WebWorks — Multi-Tenant SaaS Website Builder & Project Management

WebWorks is a multi-tenant web platform that brings website creation, team collaboration, and project management into one workspace. Users can build and publish webpages with a visual drag-and-drop editor while collaborating with invited team members on websites, projects, and a shared whiteboard.

## Key Features

- **Multi-tenant workspaces:** Manage multiple workspaces and projects within an account.
- **Team invitations and role-based access:** Workspace owners can invite members and assign roles to control access to account resources.
- **Visual website builder:** Create and customize webpages using a drag-and-drop editor, with editable page elements and preview capabilities.
- **Real-time collaboration:** Collaborate on shared project work and a whiteboard with live presence and synchronized updates.
- **Project management:** Organize work with Kanban boards, lanes, task assignment, due dates, tags, and status tracking.
- **Media library:** Upload and reuse project assets such as images and videos.
- **Website publishing:** Manage website workspaces and publish pages from within the platform.
- **Account and notifications:** Manage account settings and receive updates about project activity.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Framework and UI | Next.js 13, React 18, TypeScript, JavaScript, Tailwind CSS, shadcn/ui, Radix UI |
| Database and ORM | PostgreSQL, Prisma |
| Authentication | Clerk |
| Real-time collaboration | Liveblocks, Socket.IO |
| Drag and drop | `@hello-pangea/dnd` |
| File uploads | UploadThing |
| Email integration | Resend |

## Getting Started

### Prerequisites

- Node.js 18.17 or a compatible version
- npm
- A PostgreSQL database
- Accounts/credentials for the integrations you want to run locally: Clerk, UploadThing, Liveblocks, and Resend

### 1. Clone the repository

```bash
git clone https://github.com/Safeer99/web-works.git
cd web-works
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env.local
```

Fill in the values using your own service credentials. Do not commit `.env.local` or real credentials.

```dotenv
# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/agency
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/agency
CLERK_WEBHOOK_SECRET=

# PostgreSQL connection used by Prisma
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/webworks?schema=public"

# UploadThing file uploads
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Application URL settings
NEXT_PUBLIC_URL=http://localhost:3000/
NEXT_PUBLIC_DOMAIN=localhost:3000
NEXT_PUBLIC_SCHEME=http://

# Email integration
RESEND_API_KEY=

# Liveblocks server-side credential
LIVEBLOCKS_SECRET_KEY=
```

Use a PostgreSQL connection string for `DATABASE_URL`. Obtain credentials from each service's dashboard, and configure any additional environment values required by the current source code.
 
### 4. Generate Prisma Client and sync the database schema

```bash
npx prisma generate
npx prisma db push
```

Run `db push` only against a development database you control. Review the Prisma schema before applying it to any existing database.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server after building |
| `npm run lint` | Run the configured Next.js lint command |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db push` | Apply the Prisma schema to the configured database |

## Project Highlights

This project explores several full-stack development concepts, including multi-tenant data modeling, role-based access control, API-driven application features, database integration with Prisma, drag-and-drop interfaces, and real-time collaboration. The platform is designed to reduce setup overhead by bringing website creation, shared assets, publishing, and team workflows into one application.

## Repository

[View the source code on GitHub](https://github.com/Safeer99/web-works)
