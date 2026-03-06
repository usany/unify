This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Database Configuration

This project uses Azure SQL Database for comments storage. The database is configured to connect to `remake.database.windows.net`.

### Environment Variables

To get the values for these environment variables, you need to access your Azure SQL Database:

1. **Go to Azure Portal** (https://portal.azure.com)
2. **Navigate to your SQL Database** (search for "SQL databases" in the portal)
3. **Find your database** that uses server `remake.database.windows.net`
4. **Get the connection details:**
   - **Server name**: `remake.database.windows.net` (or your specific server)
   - **Database name**: Found in the database overview page
   - **Username**: Usually in format `username@remake` or just `username`
   - **Password**: The password you set when creating the SQL server

#### For Local Development

Create a `.env.local` file in the project root (see `.env.local.example` for template):

**Option 1: Full Connection String**
```bash
AZURE_SQL_CONNECTION_STRING=Server=remake.database.windows.net;Database=your_database_name;User Id=your_username@remake;Password=your_password;Encrypt=true;TrustServerCertificate=false
```

**Option 2: Individual Components (Recommended)**
```bash
AZURE_SQL_SERVER=remake.database.windows.net
AZURE_SQL_DATABASE=your_database_name
AZURE_SQL_USER=your_username@remake
AZURE_SQL_PASSWORD=your_password
```

**Note**: The server defaults to `remake.database.windows.net` if `AZURE_SQL_SERVER` is not specified.

#### For Production (Cloudflare Workers)

Set these as secrets in Cloudflare:

```bash
# Using Wrangler CLI
wrangler secret put AZURE_SQL_DATABASE
wrangler secret put AZURE_SQL_USER
wrangler secret put AZURE_SQL_PASSWORD

# Or set AZURE_SQL_CONNECTION_STRING instead
wrangler secret put AZURE_SQL_CONNECTION_STRING
```

Or configure in `wrangler.jsonc` (not recommended for secrets, use secrets instead):
```jsonc
{
  "vars": {
    "AZURE_SQL_SERVER": "remake.database.windows.net",
    "AZURE_SQL_DATABASE": "your_database_name"
  }
}
```

### Database Schema

Run the migration file `migrations/0001_comments_schema_azure.sql` on your Azure SQL Database to create the comments table.

### Local Development

In local development mode, if Azure SQL connection is not configured, the app will fall back to an in-memory database for testing purposes.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

unify

Access KHUSAN Documentation (https://maps.khusan.co.kr)

## KHUSAN Documentation

This is a [Next.js](https://nextjs.org) project explaining usage of [KHUSAN](https://khusan.co.kr).

### Contents

- Platform: Where you can find KHUSAN
- Status: Where you can check ongoing cards and conversations
- Register: Allows you to register a sharing card so other users can see
- Board: Shows registered cards
- Profile: Shows user profiles
- Search: Allows you to search for users
- Chat: Allows conversations with other users
- Exhibition: Allows you to register umbrella images
- Report: Allows you to report problems encountered while using the service
- Playlist: Umbrella playlist

usany.github.io

Access KHUSAN (https://khusan.co.kr)

## KHUSAN
A campus umbrella sharing app for KHU.

KHUSAN is a PWA based on [Vite](https://vite.dev)+[React](https://react.dev).

Currently available in
* [Web: KHUSAN.co.kr](https://khusan.co.kr)
* [Android: Onestore](https://m.onestore.co.kr/v2/ko-kr/app/0000776823),
* [Windows: MS store](https://apps.microsoft.com/detail/9n7801hsf6vh?hl=en-US&gl=US),

sending

HTTP Server for KHUSAN (https://khusan.co.kr)

## Routes
This is an [Next.js](https://nextjs.org) project connected to KHUSAN.
- `/` GET health check

- `/mail` POST account verification mail to a user
  - request schema validation
  
    const EmailRequestSchema = zod.object({
      to: zod.string().email('Invalid email address'),
      number: zod.string().min(1, 'Number is required'),
      language: zod.enum(['ko', 'en']).default('en')
    });
- `/api/comments/:slug` GET comments of a specific slug page from DB    
- `/api/comments` POST a new comment slug page to DB
  - request schema validation

    const CreateCommentSchema = zod.object({
      slug: zod.string().min(1, 'Slug is required'),
      author: zod.string().min(1, 'Author name is required').max(100, 'Author name too long'),
      content: zod.string().min(1, 'Content is required').max(1000, 'Content too long'),
      password: zod.string().min(1, 'Password is required').max(50, 'Password too long'),
      reply_to: zod.number().optional()
    });

- `/api/comments/verification/:id` POST password verification of a specific comment
  - request schema validation

    const VerifyPasswordSchema = zod.object({
      password: zod.string().min(1, 'Password is required').max(50, 'Password too long')
    });

- `/api/comments/:id` PUT or DELETE a specific comment
  - request schema validation
  
serviceWithDeno

WebSocket Server for KHUSAN (https://khusan.co.kr)

## Structure
This is an [Next.js](https://nextjs.org) project connected to KHUSAN.

### Routes
- `/` GET health check
- `/mail` POST account verification mail to a user
- `/api/comments/:slug` GET comments of a specific slug page from DB
- `/api/comments` POST a new comment slug page to DB
- `/api/comments/:id` PUT or DELETE a specific comment
- `/api/comments/verification/:id` POST password verification of a specific comment

