import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '../global.css';
import { useColorScheme } from '@/hooks/useColorScheme';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Dynamically set the theme based on the system color scheme
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="verifyEmail" options={{ headerShown: false }} />
        <Stack.Screen name="SoilDetection" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="SoilDetectionProcess" options={{ headerShown: false }} />
        <Stack.Screen name="DeviceConnection" options={{ headerShown: false }} />
        <Stack.Screen name="SoilDetails" options={{ headerShown: false }} />
        <Stack.Screen name="ResultsPage" options={{ headerShown: false }} />
        <Stack.Screen name="DataScanned" options={{ headerShown: false }} />
        <Stack.Screen name="recommends" options={{ headerShown: false }} />
        <Stack.Screen name="CropRecommendation" options={{ headerShown: false }} />
        <Stack.Screen name="MethodSelection" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
