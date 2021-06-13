/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from '../../Components/Button';
import TextField from '../../Components/TextField';
import {setAuth} from '../../Redux/UserSlice';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passswordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  const submit = () => {
    if (email === '') {
      setEmailError('Required*');
    } else setEmailError('');

    if (password === '') {
      setPasswordError('Required*');
    } else setPasswordError('');

    if (email && password) {
      dispatch(setAuth(true));
      props.navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.conatiner}>
      <TextField
        label="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError('');
        }}
        errorMessage={emailError}
        errorMessageText={emailError}
      />

      <TextField
        label="Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError('');
        }}
        secureTextEntry
        errorMessage={passswordError}
        errorMessageText={passswordError}
      />
      <Button title="LOGIN" border onPress={() => submit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
