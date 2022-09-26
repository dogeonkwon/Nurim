import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  // 비상호출, 내위치 버튼 컴포넌트 위치
  wrap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 10,
  },
  // 버튼의 스타일
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
    margin: 10,
  },
});

const SearchBar = () => {
  return (
    <SafeAreaView style={styles.wrap}>
      <TouchableOpacity style={styles.button}>
        <Icon name={'car-emergency'} size={30} color="#01a699" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon2 name={'my-location'} size={30} color="#01a699" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchBar;
