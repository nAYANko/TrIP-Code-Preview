// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yrvyetgdabqcxyunxlfo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlydnlldGdkYWJxY3h5dW54bGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzI2OTQsImV4cCI6MjA2NTkwODY5NH0.Z-9Z1qerlXXW7dgkrn-MaFBLGjSUM_3pr4J6aO4BQkU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);