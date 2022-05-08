import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button, shadow } from "react-native-paper";
import * as Linking from "expo-linking";

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View
        style={{
          position: "absolute", //use absolute position to show button on top of the map
          bottom: 70,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        <Button
          icon="camera"
          mode="text"
          // dark={false}
          color="#111A4D"
          onPress={() => Linking.openURL("dslnfklsdjf:")}
          style={{
            width: 240,
            padding: 2,
            backgroundColor: "#4CCABA",
          }}
        >
          <Text>Open Camera</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
