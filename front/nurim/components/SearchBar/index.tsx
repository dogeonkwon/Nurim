import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../screens/RootStack';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  // 검색창 스타일
  container: {
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 280,
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingHorizontal: 3,
    width: 160,
  },
});

type Props = NativeStackScreenProps<RootStackParams, 'Main'>;

const SearchBar = ({openDrawer}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="bars"
          size={30}
          color="#000000"
          onPress={() => openDrawer()}
        />
        <TextInput placeholder="장소 검색" style={styles.input} />
        <Icon name="search" size={25} color="#000000" />
      </View>
    </SafeAreaView>
  );
};

export default SearchBar;
