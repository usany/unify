# Instructions Application

A Next.js application with Cloudflare D1 database integration for managing comments and instructions.

## Features

- **Next.js 15** with App Router
- **Cloudflare D1** database for data persistence
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Comments system** with threading support
- **Cloudflare Workers** deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- Cloudflare account with D1 enabled
- Wrangler CLI (`npm install -g wrangler`)

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npm run db:init
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

This application uses Cloudflare D1 as the database. The schema is defined in `schema.sql` and includes:

- **comments**: Main comments table with threading support
- **users**: User accounts (for future features)  
- **pages**: Page metadata tracking

### Database Commands

```bash
# Initialize database with schema
npm run db:init

# Apply migrations
npm run db:migrate

# View database info
npm run db:info

# Local development setup
npm run db:local
```

For detailed database setup instructions, see [DATABASE.md](./DATABASE.md).

## API Endpoints

- `/api/comments/worker` - Comments CRUD operations
- `/api/db-test` - Database connection test endpoint

## Development

### Local Development

The app includes a fallback in-memory database for local development, so you can develop without needing a live D1 connection.

### Code Style

This project uses Biome for linting and formatting:
```bash
npm run lint    # Check code style
npm run format  # Format code
```

## Deployment

Deploy to Cloudflare Pages:
```bash
npm run deploy
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)

## License

MIT
