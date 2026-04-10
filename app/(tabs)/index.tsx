import * as Battery from 'expo-battery';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  // Smart Counter states
  const [count, setCount] = useState(0);
  const maxLimit = 10;

  // Battery state
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const getBattery = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
    };

    getBattery();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      {/* Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Battery Feature */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Battery Status</ThemedText>
        <ThemedText>
          {batteryLevel !== null
            ? `Battery Level: ${(batteryLevel * 100).toFixed(0)}%`
            : 'Loading battery level...'}
        </ThemedText>
      </ThemedView>

      {/* Step 1 */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
        </ThemedText>
      </ThemedView>

      {/* Smart Counter Feature */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Smart Counter Feature</ThemedText>

        <ThemedText>Count: {count}</ThemedText>
        <ThemedText>Max Limit: {maxLimit}</ThemedText>

        <Button
          title="Increase"
          onPress={() => {
            if (count < maxLimit) setCount(count + 1);
          }}
        />

        <Button
          title="Decrease"
          onPress={() => {
            if (count > 0) setCount(count - 1);
          }}
        />

        <Button title="Reset" onPress={() => setCount(0)} />

        {count === maxLimit && (
          <ThemedText style={{ color: 'red' }}>
            Limit reached!
          </ThemedText>
        )}
      </ThemedView>

      {/* Step 2 */}
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        </Link>

        <ThemedText>
          Tap the Explore tab to learn more.
        </ThemedText>
      </ThemedView>

      {/* Step 3 */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          Run <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> when ready.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});