import { Stack } from 'expo-router';
import { colors } from '../../../src/config/theme';

export default function CommunityLayout() {
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
        options={{ title: '커뮤니티' }}
      />
    </Stack>
  );
}
