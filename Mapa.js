import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import MapView from 'react-native-maps';

function Separator() {
    return <View style={styles.separator} />;
}

export default class Mapa extends React.Component {
    static navigationOptions = {
        title: 'Mapa',
    };

    constructor(props) {
        super(props);
        this.state = {
            mapRegion: {
                latitude: 43.84864,
                longitude: 18.35644,
                latitudeDelta: 8,
                longitudeDelta: 8,
            },
            locationResult: null,
            location: {
                coords: {
                    latitude: 45.84625,
                    longitude: 17.43307
                }
            },
            markers: [],
        };
        this.getAllOrdersFromDatabase = this.getAllOrdersFromDatabase.bind(this);
    }

//getDelivery
    getAllOrdersFromDatabase () {
        fetch('http://192.168.1.45:3000/getDelivery', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(responseJSON => {
                var markersData = responseJSON;
                let markers = markersData.list.map((e, i)=>
                    {
                        return( {
                            index: i + 1,
                            name: e.name,
                            surname: e.surname,
                            address: e.address,
                            orderMass: e.orderMass,
                            orderVolume: e.orderVolume,
                            coordinates:{
                                longitude: e.longitude,
                                latitude: e.latitude
                            },
                            route: e.route
                        })
                    }
                )
                this.setState({ markers: markers });
            })
            .catch(error => {
                console.error(error);
            });


    };

    componentDidMount() {
        this.getAllOrdersFromDatabase();
    }

    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };

    render() {
        return (
            <MapView
                style={{flex: 1}}
                region={this.state.mapRegion}
                onLongPress={this._handleLongPress}
                onRegionChange={this.state._handleMapRegionChange}
            >
                {this.state.markers.map(marker => (
                    <MapView.Marker
                        coordinate={marker.coordinates}
                    >
                        <MapView.Callout>
                            <View>
                                <Text>Ime: {marker.name}</Text>
                                <Text>Prezime: {marker.surname}</Text>
                                <Text>Masa: {marker.orderMass}</Text>
                                <Text>Volumen: {marker.orderVolume}</Text>
                                <Text>Ruta: {marker.route}</Text>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
                ))}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#03fcca',
    },
    title: {
        textAlign: 'left',
        marginVertical: 8,
        color: '#040404',
        fontSize: 20,
        fontFamily: 'sans-serif-thin',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#2d8a7c',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});