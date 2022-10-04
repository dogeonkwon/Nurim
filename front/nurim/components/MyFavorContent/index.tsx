import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  viewContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderStyle: 'solid',
    marginTop: '1%',
  },
  viewDivider: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  viewContent: {
    width: '85%',
    flexDirection: 'column',
  },
  viewPicture: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 16,
    color: 'black',
    marginTop: 3,
    marginBottom: 3,
  },
  textContent: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 2,
  },
});

type MyFavorProps = {
  locationName: string; // 업체명
  locationAddress: string; // 주소
};

const MyFavorContent = ({locationName, locationAddress}: MyFavorProps) => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewDivider}>
        <View style={styles.viewContent}>
          <Text style={styles.textTitle}>{locationName}</Text>
          <Text style={styles.textContent}>{locationAddress}</Text>
        </View>
        <View style={styles.viewPicture}>
          <Icon name="favorite-border" size={30} />
        </View>
      </View>
    </View>
  );
};

export default MyFavorContent;
