import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Button,
    FlatList,
} from 'react-native';

function Separator() {
    return <View style={styles.separator} />;
}

export default class Kupci extends React.Component {
    static navigationOptions = {
        title: 'Kupci',
    };

    constructor(props) {
        super(props);
        this.state = {
            allOrders:[{
                id: '',
                name: '',
                surname: '',
                orderVolume: 0,
                orderMass: 0,
                address: '',
                latitude: 0,
                longitude: 0
            }]
        }
        this.getAllOrdersFromDatabase = this.getAllOrdersFromDatabase.bind(this);
        this.deleteOrdersFromDatabase = this.deleteOrdersFromDatabase.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    };


    getAllOrdersFromDatabase(){
        fetch('http://192.168.1.45:3000/getAll', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(responseJSON => {
                var allOrders = responseJSON;
                let orders = allOrders.list.map((e)=> {
                        return({
                            key: e.id,
                            id: e.id,
                            name: e.name,
                            surname: e.surname,
                            orderVolume: e.orderVolume,
                            orderMass: e.orderMass,
                            address: e.address,
                            latitude: e.latitude,
                            longitude: e.longitude
                        })
                    }
                )
                this.setState({ allOrders: orders });
            })
            .catch(error => {
                alert('Couldnt get all orders, ' + error)
                console.error(error);
            });
    }

    deleteOrdersFromDatabase(id){
        fetch(`http://192.168.1.45:3000/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res)=>{
            this.componentDidMount()
            this.forceUpdateHandler()
        }).catch((e)=>{alert('Couldnt delete an order, ' + error)} )
    }

    forceUpdateHandler(){
        this.forceUpdate();
    };

    componentDidMount(){
        this.getAllOrdersFromDatabase()
    }

    renderItem = data =>
        <TouchableOpacity>
            <Text>
                {data.item.name}
                {data.item.surname}
                {data.item.orderMass}
                {data.item.orderVolume}
                {data.item.address}
            </Text>
            <View style={[{ width: "25%", margin: 2, backgroundColor: "red", fontSize: 15 }]}>
                <Button
                    title="Obrisi"
                    color='#038cfc'
                    onPress={()=>this.deleteOrdersFromDatabase(data.item.id)}
                >
                </Button>
            </View>
        </TouchableOpacity>

    render() {
        return (
            <View style={styles.container}>
                <Separator />

                <Button
                    title="Nazad"
                    color='#555555'
                    onPress={() => this.props.navigation.navigate('Pocetna')}
                />

                <Separator />

                <View style={styles.container}>
                    <FlatList
                        data={this.state.allOrders}
                        renderItem={item => this.renderItem(item)}
                    />
                </View>
            </View>
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
        borderBottomColor: '#03FCCA',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});