/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../Components/Button';
import QuantityButton from '../../Components/QunatityButton';
import {addToCart, setQuantity} from '../../Redux/UserSlice';

export default function ProductDetail(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const productList = useSelector(state => state.user.productList);
  const selectedProductId = useSelector(state => state.user.selectedProductId);
  const details = productList.find(item => item.id === selectedProductId);
  const quantity = useSelector(state => state.user.quantity);
  const myCart = useSelector(state => state.user.myCart);

  /**
   * checking product available in cart
   */
  const productInCart = myCart.find(item => item.id === details.id);

  /**
   * set default quatity if product already in the cart
   */
  React.useEffect(() => {
    if (productInCart) {
      dispatch(setQuantity(productInCart.quantity));
    } else {
      dispatch(setQuantity(0));
    }
  }, [productInCart]);

  function checkAuth() {
    if (!isLoggedIn) {
      Alert.alert('Login Required', 'Please login to add product in cart', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => props.navigation.navigate('Login')},
      ]);
      return false;
    } else return true;
  }

  function addItem() {
    /**
     * Check user's login before adding item to the cart
     */
    if (checkAuth()) {
      if (quantity > 0) {
        if (productInCart) {
          //check item alerady added to cart and update with new quantity
          dispatch(
            addToCart(
              myCart.map(item =>
                item.id === selectedProductId ? {...details, quantity} : item,
              ),
            ),
          );
        } else {
          //add item to the cart
          dispatch(addToCart(myCart.concat({...details, quantity})));
        }
      } else {
        //removing item from cart
        /**
         * Removing product from cart on try to add with quantity 0
         */
        if (productInCart && quantity === 0) {
          dispatch(
            addToCart(myCart.filter(item => item.id !== selectedProductId)),
          );
        }
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.label}>{`Name: ${details.name}`}</Text>
            <Text style={styles.price}>{`MRP: ₹ ${details.price}`}</Text>
          </View>
          <QuantityButton />
        </View>
      </View>
      <Text style={styles.total}>Total: {details.price * quantity}</Text>
      <Button title="Add To Cart" onPress={() => addItem()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  innerContainer: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {color: '#000', fontSize: 18, fontWeight: 'bold'},
  price: {color: '#000', fontSize: 16},
  total: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
