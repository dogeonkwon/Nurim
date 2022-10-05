// 뒤로가기 탭
// 2022-09-26 김국진
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MainStackNavigationProp} from '../../screens/RootStack';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface PopTabProps {
  title: string;
  titleColor: string;
  navigation: MainStackNavigationProp;
  color: string;
}

const PopTab = (props: PopTabProps) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    containerColor: {
      backgroundColor: `${props.color === '' || props.color}`,
    },
    emptyIcon: {
      opacity: 0,
    },
    iconMargin: {
      margin: 5,
    },
    titleText: {
      fontSize: 20,
      color: props.titleColor,
    },
  });
  return (
    <View style={styles.containerColor}>
      <View style={[styles.container, styles.iconMargin]}>
        <Icon
          name="arrow-left"
          size={20}
          onPress={() => props.navigation.navigate('Main')}
        />
        <Text style={styles.titleText}>{props.title}</Text>
        <Icon
          style={[styles.emptyIcon, styles.iconMargin]}
          name="arrow-left"
          size={20}
        />
      </View>
    </View>
  );
};

export default PopTab;
