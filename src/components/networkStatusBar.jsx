import { View, Text, StyleSheet } from 'react-native';
import useNetworkStatus from '../hooks/useNetworkStatus';

export default function NetworkStatusBar() {
  const isConnected = useNetworkStatus();

  return (
    <View
      style={[
        styles.networkBar,
        isConnected ? styles.connected : styles.disconnected,
      ]}
    >
      <Text>{isConnected ? '✅ Online' : '⛔ Offline'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  networkBar: {
    padding: 6,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  connected: {
    backgroundColor: '#e6f9e9',
  },
  disconnected: {
    backgroundColor: '#fdecea',
  },
});
