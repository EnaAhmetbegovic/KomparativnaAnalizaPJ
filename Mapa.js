import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import MapView from 'react-native-maps';

function Separator() {
    return <View style={styles.separator} />;
}

export default class Mapa extends React.Component {
    static navigationOptions = {
        title: 'Mapa',
    };

    /*onRegionChange(region) {
        this.setState({ region });
    }*/

    render() {
        return (
            <MapView
                style={{flex: 1}}
                region={{
                    latitude: 43.84864,
                    longitude: 18.35644,
                    latitudeDelta: 0.8,
                    longitudeDelta: 0.8,
                }}
                //region={this.state.region}
                //onRegionChange={this.onRegionChange}
            />
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