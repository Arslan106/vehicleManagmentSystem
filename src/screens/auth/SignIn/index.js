import React, { useState, useEffect } from 'react';
import { Alert, Image, View } from 'react-native';
import { Button, Footer } from '@src/commons';
import { COLORS, IMAGES, ROUTES } from '@src/constants';
import { Text, TextInput } from '@src/core-ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale } from '@src/helpers/Scaling';
import { getData, storeData } from '@src/helpers';
import { CommonActions } from '@react-navigation/native';
export const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [password, setPassword] = useState('');

  //  it will check if the user already login 
  useEffect(() => {
    getData('user').then((user) => {
      if (user) {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: ROUTES.HOME },
            ],
          })
        );
        // props.navigation.navigate(ROUTES.HOME)
      }
    })


  }, [])
  // using this dummy api for logging
  const onBtnPress = () => {
    try {
      if (!isValidEmail || email !== '' && password !== "") {
        fetch('http://restapi.adequateshop.com/api/authaccount/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
          .then((response) => response.json())
          .then(async (json) => {
            // handle the API response here
            if (json?.data) {
              storeData('user', json?.data)
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: ROUTES.HOME },
                  ],
                })
              );
            } else {
              Alert.alert(json.message)
            }
            console.log(json);
          })
          .catch((error) => {
            Alert.alert(error)
            // handle any errors here
            // console.error(error);
          });
      } else {
        Alert.alert('Please enter values')
      }


    } catch (error) { }
  };

  // validating email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  // validating password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwordRegex.test(password);
  }
  // seting the email to the state
  const handleEmailChange = (email) => {
    setEmail(email);
    setIsValidEmail(validateEmail(email));
  }
  // seting the password to the state
  const handlePasswordChange = (password) => {
    setPassword(password);
    setIsValidPassword(validatePassword(password));
  }
  return (
    <View style={{ flex: 1, marginTop: verticalScale(80) }}>
      <KeyboardAwareScrollView
        style={{ paddingHorizontal: scale(15) }}
        keyboardShouldPersistTaps="always">
        <Image
          source={IMAGES.logo}
          resizeMode={'contain'}
          style={{ height: scale(160), width: scale(160), alignSelf: 'center' }}
        />
        <View style={{ marginTop: verticalScale(12) }}>
          <TextInput
            placeholder={'Email'}
            placeholderTextColor={COLORS.BLACK}
            value={email}
            onChangeText={handleEmailChange}
          />
          {!isValidEmail && <Text customStyle={{ color: COLORS.ERROR, fontSize: scale(10), padding: verticalScale(4) }}>Please enter a valid email address</Text>}
          <TextInput
            placeholder={'Password'}
            placeholderTextColor={COLORS.BLACK}
            value={password}
            onChangeText={handlePasswordChange}
          />
          {/* {!isValidPassword && <Text customStyle={{color:COLORS.ERROR,fontSize:scale(10), padding:verticalScale(4)}}>Please enter a valid email password</Text>} */}
        </View>
        <Button onPress={onBtnPress}> Sign in</Button>
        <Footer footerText1={"Don't have an account?"} footerText2={' Sign up'} onPress={() => {
          props.navigation.navigate(ROUTES.SIGN_UP)
        }} />
      </KeyboardAwareScrollView>
    </View>
  );
};
