/* eslint-disable react-native/no-inline-styles */
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalDropdown from 'react-native-modal-dropdown';
import {Icon} from '@react-native-material/core';

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
    id: 0,
    title: '더 보기',
  },
  {
    id: 1,
    title: '공공기관',
  },
  {
    id: 2,
    title: '교육',
  },
  {
    id: 3,
    title: '공공시설',
  },
  {
    id: 4,
    title: '복지',
  },
  {
    id: 8,
    title: '장례시설',
  },
  {
    id: 9,
    title: '숙박',
  },
  {
    id: 10,
    title: '금융',
  },
  {
    id: 11,
    title: '주거',
  },
  {
    id: 12,
    title: '공장',
  },
];

type MoreProps = {
  getCategory: (catenum: string) => void;
  catenum: string;
};

const More = (Props: MoreProps) => {
  return (
    <SafeAreaView>
      <ModalDropdown
        style={styles.dropdown}
        defaultValue="➕ 더 보기"
        options={morelist.map(list => {
          return list.title;
        })}
        onSelect={e => {
          if (Number(e) >= 5) {
            if (Number(e) >= 7) {
              Props.getCategory(String(Number(e) + 3));
              // setCatenum(String(Number(e) + 3));
            } else {
              Props.getCategory('0' + String(Number(e) + 3));
              // setCatenum('0' + String(Number(e) + 3));
            }
          } else {
            Props.getCategory('0' + e);
            // setCatenum('0' + e);
          }
        }}
        defaultTextStyle={{fontWeight: '900'}}
        dropdownStyle={styles.box}
        dropdownTextStyle={{fontWeight: '900'}}
        dropdownTextHighlightStyle={{backgroundColor: 'gray'}}
      />
    </SafeAreaView>
  );
};

export default More;
