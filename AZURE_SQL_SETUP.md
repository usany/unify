# Azure SQL Database Setup Guide

## How to Get the Environment Variable Values

### Step 1: Access Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Sign in with your Azure account

### Step 2: Find Your SQL Database

1. In the search bar at the top, type "SQL databases" and select it
2. Find your database that uses the server `remake.database.windows.net`
3. Click on the database name to open it

### Step 3: Get Connection Information

On the database overview page, you'll find:

- **Server name**: Usually `remake.database.windows.net` (or check the "Server name" field)
- **Database name**: The name of your database (shown at the top)
- **Connection strings**: Click "Connection strings" in the left menu to see connection details

### Step 4: Get Your Credentials

1. **Username**: 
   - Usually in format: `username@remake` or just `username`
   - This is the SQL Server admin login you created when setting up the server
   
2. **Password**: 
   - The password you set when creating the SQL Server
   - If you forgot it, you can reset it in Azure Portal:
     - Go to your SQL Server (not the database)
     - Click "Reset password" in the left menu

### Step 5: Configure Environment Variables

#### For Local Development

Create a `.env.local` file in the project root:

```bash
# Option 1: Full Connection String
AZURE_SQL_CONNECTION_STRING=Server=remake.database.windows.net;Database=your_database_name;User Id=your_username@remake;Password=your_password;Encrypt=true;TrustServerCertificate=false

# Option 2: Individual Variables (Recommended)
AZURE_SQL_SERVER=remake.database.windows.net
AZURE_SQL_DATABASE=your_database_name
AZURE_SQL_USER=your_username@remake
AZURE_SQL_PASSWORD=your_password
```

**Example:**
```bash
AZURE_SQL_SERVER=remake.database.windows.net
AZURE_SQL_DATABASE=mydb
AZURE_SQL_USER=admin@remake
AZURE_SQL_PASSWORD=MySecurePassword123!
```

#### For Production (Cloudflare Workers)

Use Wrangler CLI to set secrets:

```bash
# Set individual variables
wrangler secret put AZURE_SQL_DATABASE
# Enter your database name when prompted

wrangler secret put AZURE_SQL_USER
# Enter your username when prompted

wrangler secret put AZURE_SQL_PASSWORD
# Enter your password when prompted

# OR set the full connection string
wrangler secret put AZURE_SQL_CONNECTION_STRING
# Enter the full connection string when prompted
```

### Step 6: Verify Connection

1. Make sure your Azure SQL Database firewall allows connections:
   - In Azure Portal, go to your SQL Server
   - Click "Networking" in the left menu
   - Add your IP address or enable "Allow Azure services and resources to access this server"

2. Run the migration to create the comments table:
   - Connect to your database using Azure Data Studio, SQL Server Management Studio, or Azure Portal Query Editor
   - Run the SQL from `migrations/0001_comments_schema_azure.sql`

### Troubleshooting

**Connection fails:**
- Check firewall rules in Azure Portal
- Verify credentials are correct
- Ensure the database server is running

**"Table does not exist" error:**
- Run the migration file `migrations/0001_comments_schema_azure.sql` on your database

**Authentication fails:**
- Verify username format (may need `@remake` suffix)
- Check if password has special characters that need escaping
- Try resetting the SQL Server password in Azure Portal
