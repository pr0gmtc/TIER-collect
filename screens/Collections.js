import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function Collections({ navigation }) {
    return (
        <View style={styles.MainContainer}>
            <Grid>
                <Text style={styles.text2}>Budapest Collection</Text>
                <Row style={styles.RowContainer}>
                    <Col size={50} style={styles.Cell}>
                        <Text style={styles.text}>1</Text>
                    </Col>
                    <Col size={50} style={styles.Cell} >
                        <Text style={styles.text}>2</Text>
                    </Col>
                </Row>

                <Text style={styles.text2}>Street Art Collection</Text>
                <Row style={styles.RowContainer}>
                    <Col size={50} style={styles.Cell}>
                        <Text style={styles.text}>1</Text>
                    </Col>
                    <Col size={50} style={styles.Cell} >
                        <Text style={styles.text}>2</Text>
                    </Col>
                </Row>

                <Text style={styles.text2}>TIER X GREENPIECE</Text>
                <Row style={styles.RowContainer}>
                    <Col size={50} style={styles.Cell}>
                        <Text style={styles.text}>1</Text>
                    </Col>
                    <Col size={50} style={styles.Cell} >
                        <Text style={styles.text}>2</Text>
                    </Col>
                </Row>

                <Text style={styles.text2}>MEME Collection</Text>
                <Row style={styles.RowContainer}>
                    <Col size={50} style={styles.Cell}>
                        <Text style={styles.text}>1</Text>
                    </Col>
                    <Col size={50} style={styles.Cell} >
                        <Text style={styles.text}>2</Text>
                    </Col>
                </Row>
            </Grid>
        </View>
    );
}

const gap = 12;

const styles = StyleSheet.create({
    MainContainer: {

        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%',
    },
    Cell: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4C4C4',
        height: 130,
        borderRadius: 10,
        marginHorizontal: gap / 2,
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white'
    },
    text2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 9
    },
    RowContainer: {
        paddingHorizontal: (gap / -2),
        width: '100%',
    },
});
