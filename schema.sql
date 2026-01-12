-- Comments table for storing user comments
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  page_id TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  parent_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Index for faster queries by page_id
CREATE INDEX IF NOT EXISTS idx_comments_page_id ON comments(page_id);

-- Index for faster queries by parent_id (for replies)
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);

-- Index for ordering by creation time
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
