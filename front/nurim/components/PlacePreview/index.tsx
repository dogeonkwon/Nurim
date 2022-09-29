import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  // 검색창 스타일
  header: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingHorizontal: 3,
    width: '70%',
  },
});

type Props = {openDrawer: void};

const SearchBar = ({openDrawer}: Props) => {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.search}>
        <TextInput placeholder="장소 미리 보기" style={styles.input} />
      </View>
    </SafeAreaView>
  );
};

export default SearchBar;
