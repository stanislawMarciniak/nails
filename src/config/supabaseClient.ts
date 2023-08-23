import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or key is undefined.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const getUser = async () => {
  const { data: user } = await supabase.auth.getUser();
  return user.user;
};
