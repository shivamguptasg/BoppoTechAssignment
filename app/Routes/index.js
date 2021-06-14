/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../Redux/UserSlice';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import ProductDetail from '../Screens/ProductDetails';
import Cart from '../Screens/Cart';

const headerInfoScreens = ['Home', 'ProductDetail', 'Cart'];

const Stack = createStackNavigator();
const Routes = params => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const myCart = useSelector(state => state.user.myCart);
  const dispatch = useDispatch();

  function setLogin(navigation) {
    if (isLoggedIn) {
      dispatch(setAuth(false));
    } else {
      navigation.navigate('Login');
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerLeftContainerStyle: {marginLeft: 10},
          headerRightContainerStyle: {marginRight: 10},
          headerTitle: props => (
            <Text
              style={[
                {
                  textAlign: 'center',
                },
                styles.tile,
              ]}>
              {props.children}
            </Text>
          ),
          headerTintColor: '#fff',

          headerLeft: props =>
            headerInfoScreens.includes(route.name) ? (
              <Text style={styles.tile} onPress={() => setLogin(navigation)}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </Text>
            ) : null,

          headerRight: () =>
            headerInfoScreens.includes(route.name) ? (
              <View style={styles.cart}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                  }}
                  onPress={() => navigation.navigate('Cart')}>
                  <Text style={styles.tile}>MyCart : </Text>
                  <Text style={[styles.tile]}>{myCart.length}</Text>
                </TouchableOpacity>

                <Text style={styles.tile}>{`₹ ${myCart.reduce(function (
                  acc,
                  item,
                ) {
                  return acc + item.price * item.quantity;
                },
                0)}`}</Text>
              </View>
            ) : null,
        })}>
        <Stack.Screen
          screenOptions={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          screenOptions={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          screenOptions={{headerShown: false}}
          name="ProductDetail"
          component={ProductDetail}
        />
        <Stack.Screen
          screenOptions={{headerShown: false}}
          name="Cart"
          component={Cart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({
  tile: {
    fontWeight: 'bold',
    color: '#fff',
  },
  cart: {
    flexDirection: 'row',
    width: 110,
    justifyContent: 'space-between',
  },
});
