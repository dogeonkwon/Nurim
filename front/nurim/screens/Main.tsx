import {StyleSheet, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams, MainStackNavigationProp} from './RootStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import Map from '../components/Map';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const Main = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Map openDrawer={openDrawer} />
      <Button
        title="gkdl"
        onPress={() => {
          navigation.navigate('PlaceDetail');
        }}
      />
    </SafeAreaView>
  );
};

export default Main;
