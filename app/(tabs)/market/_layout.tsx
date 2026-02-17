import { Stack } from 'expo-router';
import { colors } from '../../../src/config/theme';

export default function MarketLayout() {
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
        options={{ title: '도안마켓' }}
      />
    </Stack>
  );
}
