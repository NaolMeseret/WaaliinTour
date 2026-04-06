-- ==========================================
-- STEP 2: SUPABASE DATABASE SETUP
-- ==========================================

-- 1. Create Tours Table
CREATE TABLE IF NOT EXISTS public.tours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    requirements JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for Tours
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tours are viewable by everyone" ON public.tours FOR SELECT USING (true);

-- 2. Create Registrations Table
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'cancelled');

CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID NOT NULL REFERENCES public.tours(id) ON DELETE CASCADE,
    -- We link directly to Supabase's built-in auth.users table for full authentication
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Custom fields as requested
    origin_location TEXT NOT NULL,
    exploration_vibe TEXT,
    guests_count INTEGER NOT NULL DEFAULT 1,
    payment_status payment_status DEFAULT 'pending',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(tour_id, user_id) 
);

-- RLS for Registrations (Users can only see and create their own)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert their own registrations" ON public.registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own registrations" ON public.registrations FOR SELECT USING (auth.uid() = user_id);

-- 3. Create Explore Content Table
CREATE TABLE IF NOT EXISTS public.explore_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL CHECK (category IN ('Language', 'Clothing', 'Places', 'Traditions')),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    related_tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for Explore Content
ALTER TABLE public.explore_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Explore content is viewable by everyone" ON public.explore_content FOR SELECT USING (true);

-- ==========================================
-- SEED DATA 
-- ==========================================

-- Insert sample tours
INSERT INTO public.tours (title, description, date, location, price, requirements, image_url)
VALUES 
('Irreecha Festival Tour', 'Join us to celebrate Irreecha, the beautiful Oromo thanksgiving festival marking the transition from the rainy season.', '2026-10-04 09:00:00+00', 'Hora Finfinnee, Addis Ababa', 150.00, '["Traditional White Clothing", "Camera", "Respectful behavior"]', '/images/irreecha.jpg'),
('Fichee Chambalaalla', 'Experience the New Year festival of the Sidama people, celebrating communal solidarity and peace.', '2026-06-25 08:00:00+00', 'Hawassa', 120.00, '["Comfortable walking shoes", "Sunscreen"]', '/images/fichee.jpg');

-- Insert sample explore content based on the tours above
INSERT INTO public.explore_content (category, title, content, related_tour_id)
VALUES 
('Clothing', 'The Beauty of Oromo Traditional Wear', 'Traditional Oromo clothing heavily features pure white fabrics accented with intricate red, black, and white embroidery.', (SELECT id FROM public.tours WHERE title = 'Irreecha Festival Tour' LIMIT 1)),
('Places', 'Lake Awassa', 'Lake Awassa is the heart of Hawassa city and a central gathering spot during the Fichee Chambalaalla celebrations.', (SELECT id FROM public.tours WHERE title = 'Fichee Chambalaalla' LIMIT 1));
