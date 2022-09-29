import React, { useState } from 'react';
import { ListItem, Image, Text } from '@rneui/themed';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {MainStackNavigationProp} from '../../screens/RootStack';
import {useNavigation} from '@react-navigation/native';

type ListItemComponentProps = {};

const TaxiInfoContent: React.FunctionComponent<ListItemComponentProps> = () => {
    const navigation = useNavigation<MainStackNavigationProp>();
    const additionalList = () => {
        TaxiInfoContentList.push(
            { title: <Text>하드코딩사항4</Text>,
            subTitle : <Text>
            하드코딩사항
            </Text>,
            onPress: () => (false)
            },
        )
        }
    
    const TaxiInfoContentList = [
        { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>하드코딩사항1</Text>,
        subTitle : <Text>
        하드코딩사항 {'\n'}
        하드코딩사항
        </Text>,
        onPress: () => {navigation.navigate('TaxiDetail')}
        },
        { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>하드코딩사항2</Text>,
        subTitle : <Text>
        하드코딩사항
        </Text>,
        onPress: () => {navigation.navigate('TaxiDetail')}
        },
        { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>하드코딩사항3</Text>,
        subTitle : <Text>
        하드코딩사항
        </Text>,
        onPress: () => {navigation.navigate('TaxiDetail')}
        },
    ];
    return (
        <View>
        {TaxiInfoContentList.map((l, i) => (
            <ListItem
            key={i}
            onPress={l.onPress}
            //리스트아이템 사이에 줄 추가
            bottomDivider
            >
            <ListItem.Content>
                <ListItem.Title>{l.title}</ListItem.Title>
                <ListItem.Subtitle>{l.subTitle}</ListItem.Subtitle>
            </ListItem.Content>
            </ListItem>
        ))}
    </View>
    );
};


export default TaxiInfoContent;
