# Database Schema - Harmony Lifebond

## Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  ghana_card_id VARCHAR(50) UNIQUE,
  profile_image_url TEXT,
  role ENUM('member', 'admin', 'moderator') DEFAULT 'member',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

## Members Table

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  membership_number VARCHAR(50) UNIQUE,
  membership_date DATE,
  membership_status ENUM('active', 'inactive', 'suspended', 'expired') DEFAULT 'active',
  membership_tier ENUM('bronze', 'silver', 'gold', 'platinum') DEFAULT 'bronze',
  date_of_birth DATE,
  gender ENUM('M', 'F', 'Other'),
  nationality VARCHAR(100),
  marital_status ENUM('Single', 'Married', 'Divorced', 'Widowed'),
  occupation VARCHAR(255),
  employer VARCHAR(255),
  residential_address TEXT,
  next_of_kin_name VARCHAR(255),
  next_of_kin_phone VARCHAR(20),
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  beneficiary_name VARCHAR(255),
  beneficiary_relationship VARCHAR(50),
  referral_code VARCHAR(50),
  referred_by_id UUID REFERENCES members(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Payments Table

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id),
  type ENUM('monthly_dues', 'registration_fee', 'welfare_contribution', 'donation', 'event_fee', 'merchandise') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GHS',
  payment_method ENUM('mtn_momo', 'vodafone_cash', 'card', 'bank_transfer') NOT NULL,
  reference_number VARCHAR(100) UNIQUE,
  transaction_id VARCHAR(100),
  status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
  payment_date TIMESTAMP,
  verified_at TIMESTAMP,
  verified_by_id UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Financial Support Applications Table

```sql
CREATE TABLE support_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id),
  type ENUM('funeral', 'marriage', 'education', 'emergency', 'business') NOT NULL,
  beneficiary_type VARCHAR(100),
  reason TEXT NOT NULL,
  description TEXT,
  amount_requested DECIMAL(10, 2),
  amount_approved DECIMAL(10, 2),
  status ENUM('pending', 'approved', 'rejected', 'paid', 'cancelled') DEFAULT 'pending',
  applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approval_date TIMESTAMP,
  approved_by_id UUID REFERENCES users(id),
  approval_notes TEXT,
  rejection_reason TEXT,
  paid_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Support Documents Table

```sql
CREATE TABLE support_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES support_applications(id),
  document_type VARCHAR(100),
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INT,
  mime_type VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## News & Announcements Table

```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  author_id UUID NOT NULL REFERENCES users(id),
  published_at TIMESTAMP,
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Events Table

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location VARCHAR(255),
  event_type VARCHAR(100),
  max_attendees INT,
  status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
  created_by_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Event Registrations Table

```sql
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id),
  member_id UUID NOT NULL REFERENCES members(id),
  registration_status ENUM('registered', 'attended', 'no_show', 'cancelled') DEFAULT 'registered',
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  attended_at TIMESTAMP
);
```

## Community Forum Table

```sql
CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  status ENUM('published', 'pending', 'archived') DEFAULT 'published',
  views_count INT DEFAULT 0,
  likes_count INT DEFAULT 0,
  replies_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Forum Comments Table

```sql
CREATE TABLE forum_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES forum_posts(id),
  member_id UUID NOT NULL REFERENCES members(id),
  content TEXT NOT NULL,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Gallery Table

```sql
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  image_url TEXT NOT NULL,
  video_url TEXT,
  uploaded_by_id UUID NOT NULL REFERENCES users(id),
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Business Directory Table

```sql
CREATE TABLE business_directory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id),
  business_name VARCHAR(255) NOT NULL,
  business_category VARCHAR(100),
  description TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  address TEXT,
  logo_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Database Indexes

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_members_membership_status ON members(membership_status);
CREATE INDEX idx_payments_member_id ON payments(member_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_support_applications_member_id ON support_applications(member_id);
CREATE INDEX idx_support_applications_status ON support_applications(status);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_forum_posts_member_id ON forum_posts(member_id);
```
