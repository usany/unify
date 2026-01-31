-- Cloudflare D1 Database Schema
-- This file defines the complete database structure for the instructions application

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS comments;

-- Comments table
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,                    -- Page identifier for grouping comments
    author TEXT NOT NULL,                   -- Comment author name
    email TEXT NOT NULL,                    -- Author email (optional validation)
    content TEXT NOT NULL,                  -- Comment content
    password TEXT NOT NULL DEFAULT '',      -- Password for comment deletion (optional)
    parent_id INTEGER NULL,                 -- For threaded comments (self-referencing)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint for threaded comments
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_comments_slug ON comments(slug);
CREATE INDEX idx_comments_created_at ON comments(created_at);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);

-- Users table (for future authentication features)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Pages table (for tracking page metadata)
CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for users and pages
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- Insert some sample data (optional - remove for production)
INSERT OR IGNORE INTO pages (slug, title, description) VALUES 
('getting-started', 'Getting Started', 'Learn how to use the instructions platform'),
('api-reference', 'API Reference', 'Complete API documentation'),
('examples', 'Examples', 'Code examples and tutorials');
