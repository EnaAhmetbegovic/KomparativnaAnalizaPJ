import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    SafeAreaView,
    Alert
} from 'react-native';

function Separator() {
    return <View style={styles.separator} />;
}

class Pocetna extends React.Component{
    static navigationOptions = {
        title: 'Pocetna',
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    DOSTAVA
                </Text>

                <Separator />
                <Separator />
                <Separator />

                <View style={styles.buttonStyle}>
                    <Button
                        title="Unos kupca"
                        color='#038cfc'
                        //onPress={() => Alert.alert('Unos kupca')}
                        //onPress={() => this.props.navigation.navigate('Kupac')}

                    />
                </View>

                <Separator />

                <View style={styles.buttonStyle}>
                    <Button
                        title="Mapa"
                        color='#60b6fc'
                        onPress={() => Alert.alert('Mapa')}

                    />
                </View>

                <Separator />

                <View style={styles.buttonStyle}>
                    <Button
                        title="Lista kupaca"
                        color='#99d1ff'
                        onPress={() => Alert.alert('Lista kupaca')}

                    />
                </View>

            </SafeAreaView>
        );
}}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03fcca',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: '#040404',
        fontSize: 50,
        fontFamily: 'sans-serif-thin',
    },

    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    buttonStyle: {
        width: '90%',
    }
});
