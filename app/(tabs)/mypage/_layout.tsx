import { Stack } from 'expo-router';
import { colors } from '../../../src/config/theme';

export default function MyPageLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTitleStyle: { fontWeight: '600' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: '마이페이지' }}
      />
    </Stack>
  );
}
