import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://adapwwxcmpltfgsemfuf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkYXB3d3hjbXBsdGZnc2VtZnVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4MTI4NTAsImV4cCI6MjA0NTM4ODg1MH0.kW7D2bemf8UqpmtqSMS_H_63TNcs-7jYIzYKtWSqcmg";
export const supabase = createClient(supabaseUrl, supabaseKey);
