import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {serverIP, apis} from '../../common/urls';

interface chartDataType {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const chartConfig = {
  backgroundColor: '#000000',
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  style: {
    borderRadius: 14,
  },
};

type PlaceDetailTabProps = {
  locationId: number;
};

const colors = [
  '#F5E72A',
  '#D6B024',
  '#EBA42B',
  '#D46C1C',
  '#F75020',
  '#2A88F5',
  '#24BDD6',
  '#2AEBB6',
  '#1CD455',
  '#3DF720',
  '#43C285',
  '#43C0C2',
  '#4380C2',
  '#4643C2',
  '#8543C2',
  '#C243BF',
  '#0598FF',
  '#04DE03',
  '#39F512',
  '#DED504',
  '#FAAA02',
];
const PlaceDetailChart = ({locationId}: PlaceDetailTabProps) => {
  const [chartData, setChartData] = useState<chartDataType[]>([]);
  const getWordCount = () => {
    fetch(serverIP + apis.wordCount + locationId, {method: 'GET'})
      .then(response => response.json())
      .then(response => {
        console.log(response);
        const key = Object.keys(response.word);
        const value = Object.values(response.word);
        let data: any[] = [];
        for (let i = 0; i < key.length; i++) {
          data.push([key[i], value[i]]);
        }
        data.sort((a, b) => b[1] - a[1]);
        let newDatas: chartDataType[] = [];
        newDatas = data.map((d, index) => {
          return {
            name: d[0],
            population: d[1],
            color: colors[index],
            legendFontColor: 'black',
            legendFontSize: 16,
          };
        });
        setChartData(newDatas);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getWordCount();
  }, []);
  return (
    <View>
      <PieChart
        data={chartData}
        width={400}
        height={250}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'20'}
        center={[10, 10]}
        absolute
      />
    </View>
  );
};

export default PlaceDetailChart;
