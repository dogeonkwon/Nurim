import {StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from './RootStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import Map from '../components/Map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = NativeStackScreenProps<RootStackParams, 'Main'>;

const Main = ({navigation}: Props) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Map openDrawer={openDrawer} />
    </SafeAreaView>
  );
};

export default Main;
