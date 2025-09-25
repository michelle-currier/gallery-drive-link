import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ihezpdtbnzmzavkoejds.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXpwZHRibnptemF2a29lamRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3Njc5MTAsImV4cCI6MjA3NDM0MzkxMH0.Q7sKn2s8pKrIHbrVkMWgDS9FMzmRzHOSyvvbo4ghOxM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)