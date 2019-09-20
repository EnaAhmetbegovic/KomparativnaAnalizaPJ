import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TextInput,
} from 'react-native';

function Separator() {
    return <View style={styles.separator} />;
}

export default class Kupac extends React.Component {
    static navigationOptions = {
        title: 'Kupac',
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            orderVolume: 0,
            orderMass: 0,
            address: '',
            latitude: 0,
            longitude: 0,
        }
        this.sendOrderToDatabase = this.sendOrderToDatabase.bind(this);
    }

    sendOrderToDatabase(){
        alert('sendOrderToDatabase');
        fetch('http://192.168.1.45:3000/add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                orderMass: this.state.orderMass,
                orderVolume: this.state.orderVolume,
                address: this.state.address,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
            })
        }).then((res) => {
            this.props.navigation.navigate('Pocetna');
        }).catch((e)=>{alert('Order NOT sent to database, ' + e)}  )
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <Separator />

                <Button
                    title="Nazad"
                    color='#555555'
                    onPress={() => this.props.navigation.navigate('Pocetna')}
                />

                <Separator />

                <Text style={styles.title}>
                    Unesite sljedeće podatke:
                </Text>

                <Separator />

                <TextInput
                    style={styles.form}
                    name= 'name'
                    placeholder="Ime"
                    placeholderTextColor = "#ffffff"
                    onChangeText={(name)=>{this.setState({name})}}
                />
                <TextInput
                    style={styles.form}
                    name= 'surname'
                    placeholder="Prezime"
                    placeholderTextColor = "#ffffff"
                    onChangeText={(surname)=>{this.setState({surname})}}
                />
                <TextInput
                    style={styles.form}
                    name='orderMass'
                    placeholder="Masa"
                    placeholderTextColor = "#ffffff"
                    onChangeText={(orderMass)=>{this.setState({orderMass})}}
                />
                <TextInput
                    style={styles.form}
                    name='orderVolume'
                    placeholder="Zapremina"
                    placeholderTextColor = "#ffffff"
                    onChangeText={(orderVolume)=>{this.setState({orderVolume})}}
                />
                <TextInput
                    style={styles.form}
                    name= 'address'
                    placeholder="Adresa"
                    placeholderTextColor = "#ffffff"
                    onChangeText={(address)=>{this.setState({address})}}
                />
                <TextInput
                    style={styles.form}
                    name= 'latitude'
                    placeholder="Latituda"
                    placeholderTextColor = "#ffffff"
                    onChangeText={(latitude)=>{this.setState({latitude})}}
                />
                <TextInput
                    style={styles.form}
                    name= 'longitude'
                    placeholder="Longituda"
                    placeholderTextColor = "#ffffff"
                    onChangeText={(longitude)=>{this.setState({longitude})}}
                />

                <Separator />

                <Button
                    title="Spasi"
                    color='#038cfc'
                    onPress={() => this.sendOrderToDatabase()}
                />

                <Separator />
                <Separator />
                <Separator />
                <Separator />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#03FCCA',
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
        borderBottomColor: '#03FCCA',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    form: {
        height: 50,
        marginVertical: 2,
        padding: 2,
        paddingLeft: 20,
        backgroundColor: '#60b6fc',
        color: '#040404',
        fontSize: 20,
    },
});