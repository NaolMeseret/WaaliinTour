-- Add owner support for hotel-specific tours and culture content

ALTER TABLE public.tours
  ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE public.explore_content
  ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Allow hotel users to insert tours and culture content associated with their account.
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Hotel owners can insert tours" ON public.tours
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

ALTER TABLE public.explore_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Hotel owners can insert culture content" ON public.explore_content
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
