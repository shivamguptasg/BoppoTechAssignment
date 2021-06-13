import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './style';
// 'number-pad'
export default function TextField(props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        style={[styles.textField, props.style]}
        onChangeText={props.onChangeText}
        placeholderTextColor="#999999"
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType || 'default'}
      />
      {props.errorMessage ? (
        <Text style={[styles.text, props.errorTextStyle]}>
          {props.errorMessageText}
        </Text>
      ) : null}
    </View>
  );
}
