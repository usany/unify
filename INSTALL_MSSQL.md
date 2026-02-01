# Installing mssql Package

The `mssql` package is required to connect to Azure SQL Database. If you're seeing "package is not available" errors, follow these steps:

## Option 1: Fix pnpm Store Issue (Recommended)

If you're getting a pnpm store location error, fix it first:

```bash
# Remove node_modules and reinstall
rm -rf node_modules
pnpm install
```

## Option 2: Install mssql Directly

```bash
pnpm add mssql
```

## Option 3: Use npm Instead

If pnpm continues to have issues:

```bash
npm install mssql
```

## Option 4: Manual Installation

1. Delete `node_modules` folder
2. Delete `pnpm-lock.yaml` (if it exists)
3. Run `pnpm install` or `npm install`

## Verify Installation

After installation, verify it's installed:

```bash
pnpm list mssql
# or
npm list mssql
```

You should see `mssql@11.0.1` (or similar version) in the output.

## Note for Cloudflare Workers

**Important**: If you're deploying to Cloudflare Workers, the `mssql` package will NOT work because Workers don't support Node.js TCP sockets. In that case:

1. The code will automatically fall back to D1 database or in-memory storage
2. You don't need to install mssql for Workers deployment
3. Configure your environment to use D1 instead of Azure SQL

## After Installation

Once installed, restart your development server:

```bash
pnpm dev
```

The Azure SQL Database connection should now work if your environment variables are configured correctly.
