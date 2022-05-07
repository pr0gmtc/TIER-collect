import * as React from "react";
import "react-native-gesture-handler";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Map from "./screens/Map";
import SideDrawer from "./components/SideDrawer";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button } from "react-native-paper";
import Home from "./screens/Home";
import Collections from "./screens/Collections";
import BottomDrawer from "./components/BottomDrawer";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

const Drawer = createDrawerNavigator();

export default function App() {
  const linking = {
    prefixes: [prefix],
  };

  return (
    <PaperProvider>
      <NavigationContainer linking={linking}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Collections" component={Collections} />
          <Drawer.Screen name="Map" component={Map} />
        </Drawer.Navigator>
      </NavigationContainer>
      <BottomDrawer onDrawerStateChange={() => console.log("Yo")}>
        <Text style={styles.textBig}>Budapest Collection</Text>
        <Text style={styles.textSmall}>5 min free ride</Text>
        <Image
          style={styles.image}
          resizeMode={"contain"}
          source={require("./assets/Asset_2.png")}
        />
        <Text style={styles.textMedium2}>Széchenyi Chain Bridge</Text>
        <Text style={styles.textMedium2}>Collected</Text>
        <Text style={styles.textMedium}>1/5</Text>
      </BottomDrawer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  textBig: {
    marginTop: 40,
    fontSize: 26,
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 20,
    fontWeight: "200",
  },
  textMedium: {
    fontSize: 20,
    fontWeight: "400",
  },
  textMedium2: {
    fontSize: 20,
    fontWeight: "400",
    marginTop: 30,
  },
  image: {
    marginTop: 70,
    height: 200,
  },
});
