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
