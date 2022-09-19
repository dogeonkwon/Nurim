import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const facilities = [
  {
    id: 0,
    name: '교육',
    color: 'orange',
    image: 'store',
  },
  {
    id: 1,
    name: '복지',
    color: 'red',
    image: 'heartbeat',
  },
  {
    id: 2,
    name: '공공시설',
    color: 'green',
    image: 'palette',
  },
  {
    id: 3,
    name: '주거',
    color: 'black',
    image: 'caret-down',
  },
  {
    id: 3,
    name: '숙박',
    color: 'black',
    image: 'caret-down',
  },
  {
    id: 3,
    name: '금융',
    color: 'black',
    image: 'caret-down',
  },
  {
    id: 3,
    name: '공공기관',
    color: 'black',
    image: 'caret-down',
  },
  {
    id: 3,
    name: '공장',
    color: 'black',
    image: 'caret-down',
  },
];

interface facilities_type {
  id: number;
  name: string;
  color: string;
  image: string;
}

const more = () => {
  return (
    <SafeAreaView>
      {facilities.map((data, idx) => (
        <TouchableOpacity>
          <Text>{data.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default more;
