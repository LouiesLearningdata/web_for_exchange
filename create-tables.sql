-- 创建用户表
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建用户表索引
CREATE INDEX idx_users_email ON users(email);

-- 创建地区表
CREATE TABLE regions (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建大学表
CREATE TABLE universities (
    id VARCHAR(50) PRIMARY KEY,
    region_id VARCHAR(50) REFERENCES regions(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    semester TEXT,
    favorite TEXT,
    complaint TEXT,
    recommended_course TEXT,
    special_thanks TEXT,
    visa TEXT,
    preparation TEXT,
    flight TEXT,
    course_info TEXT,
    course_assessment TEXT,
    credit_transfer TEXT,
    learning_experience TEXT,
    items_needed TEXT,
    other_procedures TEXT,
    accommodation TEXT,
    accommodation_life TEXT,
    dining TEXT,
    bank TEXT,
    insurance TEXT,
    others TEXT,
    clubs TEXT,
    transportation TEXT,
    travel TEXT,
    entertainment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_universities_region_id ON universities(region_id);
CREATE INDEX idx_regions_name ON regions(name);
CREATE INDEX idx_universities_name ON universities(name);
CREATE INDEX idx_universities_location ON universities(location);
