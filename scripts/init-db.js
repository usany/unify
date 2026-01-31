#!/usr/bin/env node

// Database initialization script for Cloudflare D1
// This script sets up the database schema using the schema.sql file

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  try {
    console.log('🚀 Initializing Cloudflare D1 database...');
    
    // Check if schema.sql exists
    const schemaPath = path.join(process.cwd(), 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error('schema.sql file not found!');
    }
    
    console.log('📝 Applying database schema...');
    
    // Apply schema to D1 database
    execSync('npx wrangler d1 execute instructions-db --file=schema.sql', {
      stdio: 'inherit'
    });
    
    console.log('✅ Database initialized successfully!');
    console.log('📊 Database info:');
    
    // Show database info
    execSync('npx wrangler d1 info instructions-db', {
      stdio: 'inherit'
    });
    
  } catch (error) {
    console.error('❌ Failed to initialize database:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };
