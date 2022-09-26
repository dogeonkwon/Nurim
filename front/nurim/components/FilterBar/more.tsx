/* eslint-disable react-native/no-inline-styles */
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalDropdown from 'react-native-modal-dropdown';
import {Icon} from '@react-native-material/core';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 7,
    marginVertical: 5,
    marginHorizontal: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    alignItems: 'center',
  },
  box: {
    width: '20%',
    alignItems: 'flex-end',
  },
});

const morelist = [
  {
    title: '더 보기',
  },
  {
    title: '교육',
  },
  {
    title: '복지',
  },
  {
    title: '공공시설',
  },
  {
    title: '주거',
  },
  {
    title: '숙박',
  },
  {
    title: '금융',
  },
  {
    title: '공공기관',
  },
  {
    title: '공장',
  },
];

const more = () => {
  return (
    <SafeAreaView>
      <ModalDropdown
        style={styles.dropdown}
        defaultValue="➕ 더 보기"
        options={morelist.map(list => {
          return list.title;
        })}
        defaultTextStyle={{fontWeight: '900'}}
        dropdownStyle={styles.box}
        dropdownTextStyle={{fontWeight: '900'}}
        dropdownTextHighlightStyle={{backgroundColor: 'gray'}}
      />
    </SafeAreaView>
  );
};

export default more;
