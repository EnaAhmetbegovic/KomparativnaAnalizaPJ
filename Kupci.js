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
    }

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
                let orders = allOrders.map((e)=> {
                        return({
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
            this.getAllOrdersFromDatabase()
        })
            .catch((e)=>{alert('Couldnt delete an order, ' + error)}  )
    }

    componentDidMount(){
        this.getAllOrdersFromDatabase()
    }

    renderItem = data =>
        <TouchableOpacity
            onPress={()=>this.deleteOrdersFromDatabase(data.item.id)}
        >
            <Text>
                <Text>
                    {data.item.name}
                </Text>
            </Text>
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