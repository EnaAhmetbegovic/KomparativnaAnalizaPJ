import {
    createAppContainer
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack';

import Pocetna from 'Pocetna';
import Kupac from 'Kupac';
import Mapa from 'Mapa';
import Kupci from 'Kupci';

const MainNavigator = createStackNavigator({
        Pocetna: {screen: Pocetna},
        Kupac: {screen: Kupac},
        Mapa: {screen: Mapa},
        Kupci: {screen: Kupci},
    },

    {
        initialRouteName: 'Pocetna'
    }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer