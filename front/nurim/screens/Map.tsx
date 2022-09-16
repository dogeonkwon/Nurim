import {SafeAreaView, View, StyleSheet} from 'react-native';
import SearchBar from '../components/SearchBar';
import MainWidget from '../components/MainWidget';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface Props {}
const Map = ({}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <MainWidget />
    </SafeAreaView>
  );
};

export default Map;
