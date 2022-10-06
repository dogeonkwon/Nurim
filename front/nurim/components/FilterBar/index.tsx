/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import More from './more';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 4,
  },
});

const choice = [
  {
    id: 5,
    name: '상가',
    color: 'orange',
    image: 'store',
  },
  {
    id: 6,
    name: '문화',
    color: 'green',
    image: 'palette',
  },
  {
    id: 7,
    name: '의료',
    color: 'red',
    image: 'heartbeat',
  },
];

interface filter_type {
  id: number;
  name: string;
  color: string;
  image: string;
}

type FilterBarProps = {
  getCategory: (catenum: string) => void;
  catenum: string;
};

const FilterBar = (Props: FilterBarProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {choice.map((data: filter_type, idx: number): any => (
        // 상가, 의료, 문화
        <TouchableOpacity
          style={styles.button}
          key={idx}
          onPress={() => {
            if (Props.catenum === '0') {
              Props.getCategory('0' + String(data.id));
            } else {
              Props.getCategory('00');
            }
          }}>
          <Icon
            style={{paddingHorizontal: 2}}
            name={data.image}
            size={20}
            color={data.color}
          />
          <Text style={{fontWeight: '700', paddingHorizontal: 2}}>
            {data.name}
          </Text>
        </TouchableOpacity>
      ))}
      {/* 더보기 */}
      <More getCategory={Props.getCategory} catenum={Props.catenum} />
    </SafeAreaView>
  );
};

export default FilterBar;
