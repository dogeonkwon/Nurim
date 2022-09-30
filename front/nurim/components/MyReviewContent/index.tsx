import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: '1%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderStyle: 'solid',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewGreen: {
    backgroundColor: 'green',
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDate: {
    fontSize: 13,
    textAlign: 'right',
  },
  textContent: {
    fontSize: 14,
    width: '80%',
  },
  imogeStyle: {
    padding: 5,
    fontSize: 22,
  },
});

type MyReviewContentProps = {
  locationName: string;
  content: string;
  date: string;
  type: number;
};

const MyReviewContent = (props: MyReviewContentProps) => {
  const dateFormatChange = (date: string): string => {
    // 20220929115634

    return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(
      6,
      8,
    )} ${date.substring(8, 10)}:${date.substring(10, 12)}:${date.substring(
      12,
      14,
    )} 작성`;
  };
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.textTitle}>{props.locationName}</Text>
      <Text style={styles.textDate}>{dateFormatChange(props.date)}</Text>
      <View style={styles.viewContent}>
        {props.type === 1 ? (
          <Text style={styles.imogeStyle}>🟢</Text>
        ) : props.type === 2 ? (
          <Text style={styles.imogeStyle}>🟠</Text>
        ) : (
          <Text style={styles.imogeStyle}>🔴</Text>
        )}
        <Text style={styles.textContent}>{props.content}</Text>
      </View>
    </View>
  );
};

export default MyReviewContent;
