import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Supabase 클라이언트 초기화
 *
 * 환경변수 설정 방법:
 * 1. Supabase 프로젝트 생성 후 URL과 anon key를 받아옴
 * 2. app.json의 extra 필드에 추가하거나 .env 파일에 설정
 *
 * 주의: anon key는 클라이언트에 노출되어도 안전 (RLS로 보호)
 */

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
