import React, { useState, useRef } from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import { Button, shadow } from "react-native-paper";
import BottomDrawer from "../components/BottomDrawer";
import * as Linking from "expo-linking";

export default function Map() {
    const myRef = useRef();
    const initialState = {
        region: {
            latitude: 47.55733482451866,
            longitude: 19.046495949429982,
            latitudeDelta: 0.0321,
            longitudeDelta: 0.0321
        },
        user_stickers: [
            {
                latlng: {
                    latitude: 47.5074,
                    longitude: 19.0457
                },
                title: 'Parliament',
                description: 'построена вчера',
                bonus: '5 min free ride',
                image_path: './assets/Asset_3.png',
                isPressed: false
            },
            {
                latlng: {
                    latitude: 47.5412,
                    longitude: 19.0626
                },
                title: 'Danube Arena',
                description: 'построена вчера',
                bonus: '3 min free ride',
                image_path: './assets/Asset_3.png',
                isPressed: false
            },
            {
                latlng: {
                    latitude: 47.5087,
                    longitude: 19.0389
                },
                title: 'Novotel',
                description: 'построена вчера',
                bonus: '2 random bonus stickers',
                image_path: './assets/Asset_3.png',
                isPressed: false
            }
        ],
        tier_stickers: [
            {
                latlng: {
                    latitude: 47.5078,
                    longitude: 19.0459
                },
                title: 'Parliament',
                description: 'построена вчера'
            },
            {
                latlng: {
                    latitude: 47.5418,
                    longitude: 19.0629
                },
                title: 'Danube Arena',
                description: 'построена вчера'
            },
            {
                latlng: {
                    latitude: 47.5081,
                    longitude: 19.0381
                },
                title: 'Novotel',
                description: 'построена вчера'
            }
        ],
        scooters: [
            {
                latlng: {
                    latitude: 47.5106,
                    longitude: 19.0728
                },
                title: 'Parliament',
                description: 'построена вчера'
            },
            {
                latlng: {
                    latitude: 47.4816,
                    longitude: 19.0639
                },
                title: 'Danube Arena',
                description: 'построена вчера'
            },
            {
                latlng: {
                    latitude: 47.4957,
                    longitude: 19.0408
                },
                title: 'Novotel',
                description: 'построена вчера'
            }
        ],
        user_location: {}
    }

    const markerClickHandler = () => {
        setisBottomDrawerVisible(true);
        myRef.current.onStickerPress();
    }

    const [state, setState] = useState(initialState);
    const [isBottomDrawerVisible, setisBottomDrawerVisible] = useState(false);

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={state.region}
                region={state.region}
                style={styles.map}
                showsUserLocation={true}
            >
                {state.user_stickers.map((user_sticker, index) => (
                    <Marker
                        key={index}
                        coordinate={user_sticker.latlng}
                        title={user_sticker.title}
                        description={user_sticker.description}
                        onPress={() => markerClickHandler()}
                    >
                        <Image source={require('../assets/user_sticker.png')} style={{height: 35, width:35 }} />
                    </Marker>
                ))}
                {state.tier_stickers.map((tier_sticker, index) => (
                    <Marker
                        key={index}
                        coordinate={tier_sticker.latlng}
                        title={tier_sticker.title}
                        description={tier_sticker.description}
                    >
                        <Image source={require('../assets/tier_sticker.png')} style={{height: 45, width: 45 }} />
                    </Marker>
                ))}
                {state.scooters.map((scooter, index) => (
                    <Marker
                        key={index}
                        coordinate={scooter.latlng}
                        title={scooter.title}
                        description={scooter.description}
                    >
                        <Image source={require('../assets/scooter.png')} style={{height: 45, width: 45 }} />
                    </Marker>
                ))}

            </MapView>
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
            <Button style={styles.arrowButton} onPress={() => {setState(initialState)}}>
                <Image style={styles.arrowImage} onPress={() => {setState(initialState)}} source={require('../assets/arrow.png')}/>
            </Button>
            <BottomDrawer onDrawerStateChange={(nextState) => console.log(nextState)} ref={myRef}>
                <Text style={styles.textBig}>Budapest Collection</Text>
                <Text style={styles.textSmall}>5 min free ride</Text>
                <Image
                    style={styles.image}
                    resizeMode={"contain"}
                    source={require("../assets/Asset_2.png")}
                />
                <Text style={styles.textMedium2}>Széchenyi Chain Bridge</Text>
                <Text style={styles.textMedium2}>Collected</Text>
                <Text style={styles.textMedium}>1/5</Text>
            </BottomDrawer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    arrowButton: {
        position: 'absolute',
        bottom: 80,
        right: 0,

    },
    arrowImage: {
        flex: 1,
        width: 80,
        height: 80,
        resizeMode: 'contain',
        pointerEvents: 'none'
    },
    image: {
        marginTop: 70,
        height: 200,
    },
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
});

// {state.user_stickers.map((user_sticker, index) => (
//     <BottomDrawer onDrawerStateChange={() => console.log('lol')} style={{}}>
//         <Text style={styles.textBig}>Budapest Collection</Text>
//         <Text style={styles.textSmall}>{user_sticker.bonus}</Text>
//         <Image
//             style={styles.image}
//             resizeMode={"contain"}
//             source={require(stck.image_path)}
//         />
//         <Text style={styles.textMedium2}>{user_sticker.name}</Text>
//         <Text style={styles.textMedium2}>Collected</Text>
//         <Text style={styles.textMedium}>1/5</Text>
//     </BottomDrawer>
// ))}}

// {
//     for (sticker in state.user_stickers) {
//
//     }
//     if (sticker_pressed.title == 'none') {
//     } else {
//         const inx = state.user_stickers.findIndex(s => s == sticker_pressed.title);
//         const stck = state.user_stickers[inx]
//         return (
//             <BottomDrawer onDrawerStateChange={() => console.log('lol')}>
//                 <Text style={styles.textBig}>Budapest Collection</Text>
//                 <Text style={styles.textSmall}>{stck.bonus}</Text>
//                 <Image
//                     style={styles.image}
//                     resizeMode={"contain"}
//                     source={require(stck.image_path)}
//                 />
//                 <Text style={styles.textMedium2}>{stck.name}</Text>
//                 <Text style={styles.textMedium2}>Collected</Text>
//                 <Text style={styles.textMedium}>1/5</Text>
//             </BottomDrawer>
//         )
//     }
// }