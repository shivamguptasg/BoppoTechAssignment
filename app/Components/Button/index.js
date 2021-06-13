import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './style';

function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.conatainer, props.style]}
      onPress={props.onPress}>
      <Text
        style={{
          fontSize: 17,
          color: '#fff',
          textAlign: 'center',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
