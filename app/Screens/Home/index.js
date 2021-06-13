/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Product from './Component/Product';

export default function Home(props) {
  const productList = useSelector(state => state.user.productList);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}>
      <FlatList
        data={productList}
        renderItem={data => <Product {...data.item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
