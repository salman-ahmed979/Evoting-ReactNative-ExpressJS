import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import StackNav from './screens/StackNav';

export default function App() {
  return <StackNav />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
