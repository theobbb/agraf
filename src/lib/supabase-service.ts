import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const supabase_service = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);
