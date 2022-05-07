import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';

export default function Map() {
    const state = {
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
                description: 'построена вчера'
            },
            {
                latlng: {
                    latitude: 47.5412,
                    longitude: 19.0626
                },
                title: 'Danube Arena',
                description: 'построена вчера'
            },
            {
                latlng: {
                    latitude: 47.5087,
                    longitude: 19.0389
                },
                title: 'Novotel',
                description: 'построена вчера'
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
    return (
        <View style={styles.container}>
            <MapView
                initialRegion={state.region}
                onRegionChange={this.onRegionChange}
                style={styles.map}
                showsUserLocation={true}
            >
                {state.user_stickers.map((user_sticker, index) => (
                    <Marker
                        key={index}
                        coordinate={user_sticker.latlng}
                        title={user_sticker.title}
                        description={user_sticker.description}
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
});
