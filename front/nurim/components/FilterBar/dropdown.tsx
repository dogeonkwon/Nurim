import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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

interface Props {
  label: string;
}

const Dropdown: FC<Props> = ({label}) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <Text style={styles.dropdown}>
          {morelist.map(p => {
            return p.title;
          })}
        </Text>
      );
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
      {renderDropdown()}
      <Icon name="chevron-down" />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 30,
    width: '25%',
    paddingHorizontal: 10,
    zIndex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 4,
    borderRadius: 15,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    // fontWeight: '100',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
    flexDirection: 'row',
  },
});

export default Dropdown;
