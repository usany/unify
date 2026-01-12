# Cloudflare D1 Comments Integration

This project now includes Cloudflare D1 database integration for storing and managing comments.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install @cloudflare/workers-types wrangler --legacy-peer-deps
```

### 2. Configure Cloudflare D1

1. **Create a D1 database:**
   ```bash
   wrangler d1 create unify-comments
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your database ID: `DB_ID=your-actual-database-id`
   
3. **Update `wrangler.toml`:**
   - The configuration now uses `${DB_ID}` environment variable

4. **Set up the database schema:**
   ```bash
   wrangler d1 execute unify-comments --file=./schema.sql
   ```

### 3. Environment Variables

For production deployment, ensure your Cloudflare environment has the D1 binding configured. The API route includes a mock implementation for development.

### 4. Database Schema

The `schema.sql` file creates a `comments` table with the following structure:
- `id` (TEXT, PRIMARY KEY)
- `page_id` (TEXT) - Links comments to specific pages
- `author` (TEXT) - Comment author name
- `content` (TEXT) - Comment content
- `parent_id` (TEXT, FOREIGN KEY) - For threaded replies
- `created_at` (DATETIME) - Creation timestamp
- `updated_at` (DATETIME) - Last update timestamp

### 5. API Endpoints

- `GET /api/comments?pageId=<pageId>` - Fetch comments for a page
- `POST /api/comments` - Create a new comment
- `PUT /api/comments` - Update an existing comment
- `DELETE /api/comments?id=<commentId>` - Delete a comment

### 6. Features

- **Threaded Comments**: Support for nested replies
- **CRUD Operations**: Full create, read, update, delete functionality
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Visual feedback during API operations
- **Responsive Design**: Mobile-friendly interface

### 7. Development Notes

The API route includes a mock D1 database implementation for local development. In production, this will automatically use the real Cloudflare D1 binding.

To deploy to production:
```bash
wrangler deploy
```

### 8. Security Considerations

- Input validation is performed on both client and server
- SQL injection prevention through parameterized queries
- Consider adding authentication/authorization for production use
- Rate limiting may be needed for public deployments
