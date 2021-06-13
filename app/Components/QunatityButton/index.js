/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setQuantity} from '../../Redux/UserSlice';

export default function quantityButton(props) {
  const quantity = useSelector(state => state.user.quantity);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
      }}>
      <Text
        style={{backgroundColor: 'grey', padding: 10}}
        onPress={() => {
          if (quantity > 0) dispatch(setQuantity(quantity - 1));
        }}>
        -
      </Text>
      <Text style={{backgroundColor: '#fff', padding: 10, color: '#000'}}>
        {quantity}
      </Text>
      <Text
        style={{backgroundColor: 'grey', padding: 10}}
        onPress={() => dispatch(setQuantity(quantity + 1))}>
        +
      </Text>
    </View>
  );
}
