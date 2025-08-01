-- Initialize Arketic Database with PGVector extension

-- Create the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create database schema
CREATE SCHEMA IF NOT EXISTS arketic;

-- Set search path
SET search_path TO arketic, public;

-- Create documents table for vector storage
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536), -- OpenAI embedding dimensions
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS documents_embedding_cosine_idx 
ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create index for metadata queries
CREATE INDEX IF NOT EXISTS documents_metadata_idx 
ON documents USING GIN (metadata);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_documents_updated_at 
    BEFORE UPDATE ON documents 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_sessions table for conversation history
CREATE TABLE IF NOT EXISTS chat_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID DEFAULT gen_random_uuid(),
    title VARCHAR(255) DEFAULT 'New Chat',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table for chat history
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    chat_session_id INTEGER REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grant permissions to arketic_user
GRANT ALL PRIVILEGES ON SCHEMA arketic TO arketic_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA arketic TO arketic_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA arketic TO arketic_user;

-- Set default search path for arketic_user
ALTER USER arketic_user SET search_path TO arketic, public;

-- Insert sample data for testing
INSERT INTO documents (title, content, metadata) VALUES 
('Sample Document 1', 'This is a sample document for testing vector operations.', '{"type": "sample", "category": "test"}'),
('Sample Document 2', 'Another sample document to verify vector similarity search functionality.', '{"type": "sample", "category": "test"}')
ON CONFLICT DO NOTHING;

-- Log initialization completion
SELECT 'Database initialization completed successfully' as status;