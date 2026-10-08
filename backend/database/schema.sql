-- CareerLens Database Schema (PostgreSQL)

-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS career_skills CASCADE;
DROP TABLE IF EXISTS careers CASCADE;
DROP TABLE IF EXISTS internships CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS student_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    degree VARCHAR(255),
    graduation_year INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Profiles Table
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    phone VARCHAR(50),
    department VARCHAR(100),
    cgpa NUMERIC(3,2),
    semester INT,
    achievements TEXT,
    coursework TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    target_career_slug VARCHAR(100) DEFAULT 'cybersecurity-analyst',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Skills Taxonomy Table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT
);

-- 4. Student Skills Table
CREATE TABLE student_skills (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    proficiency VARCHAR(50) NOT NULL, -- 'Beginner', 'Intermediate', 'Advanced', 'Expert'
    category VARCHAR(100) DEFAULT 'Technical',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_skill UNIQUE (user_id, skill_name)
);

-- 5. Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    technologies VARCHAR(255),
    link VARCHAR(255),
    role VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Certifications Table
CREATE TABLE certifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    organization VARCHAR(150),
    issue_date VARCHAR(50),
    domain VARCHAR(100),
    credential_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Internships Table
CREATE TABLE internships (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    company VARCHAR(150) NOT NULL,
    role VARCHAR(150),
    duration VARCHAR(100),
    description TEXT,
    technologies VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Careers Table
CREATE TABLE careers (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    avg_salary VARCHAR(50),
    market_growth VARCHAR(50)
);

-- 9. Career Skills Table
CREATE TABLE career_skills (
    id SERIAL PRIMARY KEY,
    career_id INT REFERENCES careers(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    required_level VARCHAR(50) NOT NULL, -- 'Beginner', 'Intermediate', 'Advanced', 'Expert'
    importance VARCHAR(50) DEFAULT 'Core',
    weight NUMERIC(3,2) DEFAULT 1.0,
    CONSTRAINT unique_career_skill UNIQUE (career_id, skill_name)
);
