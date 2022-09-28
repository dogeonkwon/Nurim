import React, {useState} from 'react';
import EmergencyList from '../EmergencyList';
import TaxiPreview from '../TaxiPreview';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type IconsComponentProps = {};

const AdditionalButton: React.FunctionComponent<IconsComponentProps> = () =>  {
    const [visible, setVisible] = useState<boolean>(false);
    const taxiEmergencyButton = () => {
        setVisible(!visible);
      };
    
    return (
        <SafeAreaProvider>
            <Icon raised
            name='plus'
            type='font-awesome'
            color='#36BC9B'
            onPress={taxiEmergencyButton} />{visible && <TaxiPreview />}{visible && <EmergencyList />}
        </SafeAreaProvider>
    );
};

// const styles = StyleSheet.create({
//     iconSpec: {
//         name: 'plus',
//         type: 'font-awesome',
//         size: 40,
//         color: '#36BC9B',
//     },
// });

export default AdditionalButton;