import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Roam from 'roam-reactnative';
import { request, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {


const requestIOSLocationAlwaysPermission = async () => {
  try {
    if (Platform.OS !== 'ios') {
      Alert.alert('iOS Only', 'This permission check is for iOS devices.');
      return;
    }

    // Step 1: Request "When In Use" permission first
    const whenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (whenInUse === RESULTS.GRANTED) {
      // Step 2: Request "Always" permission
      const always = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);

      if (always === RESULTS.GRANTED) {
        Alert.alert('✅ Permission Granted', 'Always allow location access is enabled.');
      } else if (always === RESULTS.BLOCKED) {
        Alert.alert(
          '⚠️ Permission Blocked',
          'Please enable “Always Allow” in iPhone Settings > Privacy > Location Services.'
        );
        openSettings();
      } else {
        Alert.alert(
          '⚠️ Permission Denied',
          '“Always Allow” permission not granted. Please update in Settings.'
        );
      }
    } else {
      Alert.alert(
        '⚠️ Permission Denied',
        'Please allow location access to use this feature.'
      );
    }
  } catch (error) {
    console.warn('Permission error:', error);
  }
};



  const startTracking = async () => {
    Roam.batchProcess(true, 0);
    Roam.startTracking();
    console.log('Tracking started');
  };

  const stopTracking = () => {
    Roam.stopTracking();
    console.log('Tracking stopped');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={requestIOSLocationAlwaysPermission}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Request Permission</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={startTracking} style={styles.button}>
          <Text style={styles.buttonText}>Start Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={stopTracking} style={[styles.button, styles.stop]}>
          <Text style={styles.buttonText}>Stop Tracking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    margin: 10,
  },
  stop: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
