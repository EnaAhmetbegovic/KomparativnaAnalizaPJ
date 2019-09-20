import {
    createAppContainer
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack';

import Pocetna from './Pocetna';
import Kupac from './Kupac';
import Mapa from './Mapa';
import Kupci from './Kupci';

const MainNavigator = createStackNavigator({
        Pocetna: Pocetna,
        Kupac: Kupac,
        Mapa: Mapa,
        Kupci: Kupci,
    },

    {
        initialRouteName: 'Pocetna'
    }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer