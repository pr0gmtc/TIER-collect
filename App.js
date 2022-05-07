import * as React from "react";
import "react-native-gesture-handler";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Map from "./screens/Map";
import SideDrawer from "./components/SideDrawer";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button } from "react-native-paper";
import Home from "./screens/Home";
import Collections from "./screens/Collections";
import BottomDrawer from "./components/BottomDrawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Collections" component={Collections} />
          <Drawer.Screen name="Map" component={Map} />
        </Drawer.Navigator>
      </NavigationContainer>
      <BottomDrawer onDrawerStateChange={() => console.log("Yo")}>
        <Text>ADSFASDFA</Text>
      </BottomDrawer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
