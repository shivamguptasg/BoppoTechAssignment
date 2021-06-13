/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setSelectedProductId} from '../../../../Redux/UserSlice';

export default function Product(props) {
  const {id, name, price} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => {
        dispatch(setSelectedProductId(id));
        navigation.navigate('ProductDetail');
      }}>
      <Text style={styles.label}>Name: {name}</Text>
      <Text style={styles.price}>MRP: ₹ {price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 13,
    borderWidth: 1,
  },
  label: {color: '#000', fontSize: 18, fontWeight: 'bold'},
  price: {color: '#000', fontSize: 16},
});
