-- ==========================================
-- Create trigger to auto-create profiles for new auth users
-- ==========================================

CREATE OR REPLACE FUNCTION public.create_profile_on_auth_user_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user')
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS create_profile_after_user_signup ON auth.users;
CREATE TRIGGER create_profile_after_user_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_profile_on_auth_user_insert();
