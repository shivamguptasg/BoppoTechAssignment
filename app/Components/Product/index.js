/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, setSelectedProductId} from '../../Redux/UserSlice';

export default function Product(props) {
  const {id, name, price, quantity, showDetails = false} = props;
  const myCart = useSelector(state => state.user.myCart);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function removeProduct(id) {
    Alert.alert('Remove', 'Are You Sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          dispatch(addToCart(myCart.filter(item => item.id !== id))),
      },
    ]);
  }
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => {
        dispatch(setSelectedProductId(id));
        navigation.navigate('ProductDetail');
      }}>
      <Text style={styles.label}>Name: {name}</Text>
      <Text style={styles.price}>MRP: ₹ {price}</Text>
      {showDetails && (
        <View>
          <Text style={styles.price}>Qty: {quantity}</Text>
          <Text
            style={[styles.label, {marginTop: 5}]}
            onPress={() => removeProduct(id)}>
            Remove
          </Text>
        </View>
      )}
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
