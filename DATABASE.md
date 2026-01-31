# Cloudflare D1 Database Setup

This guide explains how to set up and use Cloudflare D1 with the instructions application.

## Prerequisites

- Cloudflare account with D1 enabled
- Wrangler CLI installed (`npm install -g wrangler`)
- Authenticated with Cloudflare (`wrangler auth login`)

## Database Configuration

The database is already configured in `wrangler.jsonc`:

```json
"d1_databases": [
  {
    "binding": "instructions_db",
    "database_name": "instructions-db",
    "database_id": "4c06b4b6-2d1d-49e7-a622-a5c78038ea25"
  }
]
```

## Database Schema

The complete schema is defined in `schema.sql` and includes:

### Tables

- **comments**: Main comments table with threading support
- **users**: User accounts (for future features)
- **pages**: Page metadata tracking

### Comments Table Structure

```sql
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,                    -- Page identifier
    author TEXT NOT NULL,                   -- Author name
    email TEXT NOT NULL,                    -- Author email
    content TEXT NOT NULL,                  -- Comment content
    password TEXT NOT NULL DEFAULT '',      -- Deletion password
    parent_id INTEGER NULL,                 -- For threaded comments
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);
```

## Setup Commands

### 1. Initialize Database
```bash
npm run db:init
```

### 2. Apply Migrations
```bash
npm run db:migrate
```

### 3. View Database Info
```bash
npm run db:info
```

### 4. Local Development
```bash
npm run db:local
```

## Database Connection

The database client is configured in `src/lib/db.ts`:

```typescript
import { createDBClient } from '@/lib/db';

// In your API route or worker:
const db = createDBClient(env);
const comments = await db.getComments('page-slug');
```

## API Endpoints

The comments API is available at `/api/comments/worker` with the following operations:

- **GET** `/api/comments/worker?pageId=slug` - Get comments for a page
- **POST** `/api/comments/worker` - Create a new comment
- **PUT** `/api/comments/worker` - Update a comment
- **DELETE** `/api/comments/worker?id=commentId` - Delete a comment

## Local Development

For local development, the app uses an in-memory fallback database that mimics the D1 API. This allows you to develop without needing a live D1 connection.

## Migration Management

Migrations are stored in the `migrations/` directory:

- `0001_comments_schema.sql` - Initial comments schema
- `0002_add_password_to_comments.sql` - Add password field

To create a new migration:

```bash
npx wrangler d1 migrations create instructions-db migration_name
```

## Production Deployment

When deploying to production:

1. Ensure all migrations are applied: `npm run db:migrate`
2. Deploy the application: `npm run deploy`
3. Verify the database connection in the Cloudflare dashboard

## Database Operations

### Creating a Comment

```typescript
const db = createDBClient(env);
const comment = await db.createComment(
  'page-slug',
  'Author Name',
  'author@example.com',
  'Comment content',
  'optional-password'
);
```

### Getting Comments

```typescript
const comments = await db.getComments('page-slug');
```

### Updating a Comment

```typescript
const updated = await db.updateComment(commentId, 'New content');
```

### Deleting a Comment

```typescript
const deleted = await db.deleteComment(commentId, 'password');
```

## Troubleshooting

### Common Issues

1. **Database binding not found**: Ensure the `instructions_db` binding is correctly configured in `wrangler.jsonc`
2. **Migration failures**: Check that your SQL syntax is compatible with SQLite (D1 uses SQLite)
3. **Local development issues**: The fallback database should work automatically in development mode

### Debug Commands

```bash
# Check database status
npx wrangler d1 info instructions-db

# Execute custom SQL
npx wrangler d1 execute instructions-db --command="SELECT COUNT(*) FROM comments"

# Local testing
npx wrangler dev --local
```

## Best Practices

1. Always use parameterized queries to prevent SQL injection
2. Handle database errors gracefully in your API routes
3. Use indexes for frequently queried columns
4. Test migrations in a staging environment first
5. Keep your schema.sql in sync with applied migrations
