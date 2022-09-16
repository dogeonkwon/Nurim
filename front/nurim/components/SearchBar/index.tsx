import {StyleSheet, SafeAreaView, View, Pressable} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Foundation';

const styles = StyleSheet.create({
  // 검색창 스타일
  searchbar: {
    marginTop: 30,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 4,
    padding: 20,
    width: 280,
    flexDirection: 'row',
  },
});

const SearchBar = () => {
  return (
    <SafeAreaView>
      <View style={styles.searchbar}>
        <Pressable>
          <Icon2 name="list" size={30} color="#000000" />
        </Pressable>
        <TextInput style={{width: 190, height: 30}} />
        <Pressable>
          <Icon name="search" size={30} color="#000000" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SearchBar;
