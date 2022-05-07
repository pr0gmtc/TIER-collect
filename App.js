import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Map from './screens/Map'
import SideDrawer from './components/SideDrawer'

export default function App() {
  return (
    <PaperProvider>
      <Map />
      <SideDrawer />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
});
