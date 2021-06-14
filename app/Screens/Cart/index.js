/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import Product from '../../Components/Product';

export default function Cart(props) {
  const myCart = useSelector(state => state.user.myCart);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}>
      <FlatList
        data={myCart}
        renderItem={data => <Product {...data.item} showDetails={true} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
