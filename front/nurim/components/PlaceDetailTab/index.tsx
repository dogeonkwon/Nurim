import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {serverIP, apis} from '../../common/urls';
import {Tab} from '@rneui/themed';
import PlaceReview from '../PlaceReview';
import PlaceDetailChart from '../PlaceDetailChart';
import {IPlace} from '../PlacePreview';
import {getColor} from '../../common/colors';

const chartConfig = {
  backgroundColor: '#000000',
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
  },
  selectedText: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 18,
    textAlign: 'center',
  },
  notSelectedText: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: 16,
    textAlign: 'center',
  },
  tabStyle: {
    backgroundColor: 'green',
  },
});

type PlaceDetailTabProps = {
  locationId: string;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  reviewInfo: IPlace | null;
};

const PlaceDetailTab = (props: PlaceDetailTabProps) => {
  const getWordCount = () => {
    fetch(serverIP + apis.wordCount + '100021', {method: 'GET'})
      .then(response => response.json())
      .then(response => {
        console.log(response.word['거리']);
        console.log(Object.keys(response.word));
        console.log(Object.values(response.word));
      })
      .catch(err => console.log(err));
  };
  getWordCount();
  return (
    <View>
      <Tab
        style={styles.tabStyle}
        value={props.tabIndex}
        onChange={e => props.setTabIndex(e)}
        indicatorStyle={{
          backgroundColor: '#36BC9B',
          height: 2,
        }}>
        <Tab.Item
          containerStyle={active => ({
            backgroundColor: 'white',
          })}>
          <View style={styles.textContainer}>
            <Text
              style={
                props.tabIndex === 0
                  ? styles.selectedText
                  : styles.notSelectedText
              }>
              리뷰보기
            </Text>
          </View>
        </Tab.Item>
        <Tab.Item
          containerStyle={active => ({
            backgroundColor: 'white',
          })}>
          <View style={styles.textContainer}>
            <Text
              style={
                props.tabIndex === 1
                  ? styles.selectedText
                  : styles.notSelectedText
              }>
              통계보기
            </Text>
          </View>
        </Tab.Item>
      </Tab>
    </View>
  );
};

export default PlaceDetailTab;
