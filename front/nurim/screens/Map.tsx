import {StyleSheet} from 'react-native';
import SearchBar from '../components/SearchBar';
import MainWidget from '../components/MainWidget';
import FilterBar from '../components/FilterBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from './RootStack';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = NativeStackScreenProps<RootStackParams, 'Map'>;

const Map = ({navigation}: Props) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar openDrawer={openDrawer} />
      <FilterBar />
      <MainWidget />
    </SafeAreaView>
  );
};

export default Map;
