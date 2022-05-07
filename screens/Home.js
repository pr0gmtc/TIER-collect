import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";

export default function Home({ navigation }) {
  return (
    <View style={styles.MainContainer}>
      <Grid>
        <Row style={styles.RowContainer1}>
          <Image
            resizeMode={"cover"}
            style={styles.imageMain}
            source={require("../assets/Asset_12.png")}
          />
        </Row>
        <Text style={styles.text2}>Budapest Collection</Text>
        <Row style={styles.RowContainer}>
          <Col size={50} style={styles.Cell}>
            <Image
              resizeMode={"contain"}
              style={styles.image}
              source={require("../assets/Asset_2.png")}
            />
          </Col>
          <Col size={50} style={styles.Cell}>
            <Image
              resizeMode={"contain"}
              style={styles.image}
              source={require("../assets/Asset_4.png")}
            />
          </Col>
        </Row>

        <Text style={styles.text2}>Street Art Collection</Text>
        <Row style={styles.RowContainer}>
          <Col size={50} style={styles.Cell}>
            <Image
              style={styles.image}
              source={require("../assets/Asset_7.jpg")}
            />
          </Col>
          <Col size={50} style={styles.Cell}>
            <Image
              style={styles.image}
              source={require("../assets/Asset_6.jpg")}
            />
          </Col>
        </Row>

        <Text style={styles.text2}>MEME Collection</Text>
        <Row style={styles.RowContainer}>
          <Col size={50} style={styles.Cell}>
            <Image
              style={styles.image}
              resizeMode={"contain"}
              source={require("../assets/Asset_11.jpg")}
            />
          </Col>
          <Col size={50} style={styles.Cell}>
            <Image
              style={styles.image}
              resizeMode={"contain"}
              source={require("../assets/Asset_10.png")}
            />
          </Col>
        </Row>
      </Grid>
    </View>
  );
}

const gap = 12;

const styles = StyleSheet.create({
  MainContainer: {
    width: "100%",
    alignItems: "center",
    height: "90%",
  },
  Cell: {
    justifyContent: "center",
    alignItems: "center",
    height: 130,
    borderRadius: 7,
    backgroundColor: "#fff",
    marginHorizontal: gap / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginLeft: 9,
  },
  RowContainer: {
    paddingHorizontal: gap / -2,
    width: "100%",
    height: 150,
  },
  RowContainer1: {
    paddingHorizontal: gap / -4,
    width: "100%",
    height: 210,
    marginBottom: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageMain: {
    height: "100%",
    width: "100%",
  },
});
