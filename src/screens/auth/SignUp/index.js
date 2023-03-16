import React, {useState} from 'react';
import {Image, View, Alert} from 'react-native';
import {Button, Footer} from '@src/commons';
import {COLORS, IMAGES, ROUTES} from '@src/constants';
import {Text, TextInput} from '@src/core-ui';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { scale, storeData, verticalScale } from '@src/helpers';
import { CommonActions } from '@react-navigation/native';

export const SignUp = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  // render

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwordRegex.test(password);
  }
  const handleEmailChange = (email) => {
    setEmail(email);
    setIsValidEmail(validateEmail(email));
  }

  const handlePasswordChange = (password) => {
    setPassword(password);
    // setIsValidPassword(validatePassword(password));
  }
  const onSignUpBtnPress = () => {
 
    try {
      if (!isValidEmail || email !== '' && password !== "") {
        fetch('http://restapi.adequateshop.com/api/authaccount/registration', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name:username,
            email: email,
            password: password
          })
        })
          .then((response) => response.json())
          .then((json) => {
            // handle the API response here
            if(json?.data){
              storeData('user', json?.data)
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: ROUTES.HOME },
                  ],
                })
              );
            }else{
              Alert.alert('This user is already registerd')
            }
          })
          .catch((error) => {
            console.log(error);
            Alert.alert(error)
            // handle any errors here
            // console.error(error);
          });
      } else {
        Alert.alert('Please enter values')
      }
     
    } catch (error) {}
  };

  return (
    <View style={{flex:1,marginTop:verticalScale(80)}}>
    <KeyboardAwareScrollView
      style={{flex: 1, paddingHorizontal: 20}}
      keyboardShouldPersistTaps="always">
      <Image
        source={IMAGES.logo}
        resizeMode={'contain'}
        style={{height: 200, width: 200, alignSelf: 'center'}}
      />
       <View style={{marginTop:verticalScale(12)}}>
      <TextInput
        placeholder={'UserName'}
        placeholderTextColor={COLORS.BLACK}
        value={username}
        onChangeText={text => {
          setUsername(text);
        }}
      />
      <TextInput
        placeholder={'Email'}
        placeholderTextColor={COLORS.BLACK}
        value={email}
        onChangeText={handleEmailChange}
      />
      {!isValidEmail && <Text customStyle={{color:COLORS.ERROR,fontSize:scale(10), padding:verticalScale(4)}}>Please enter a valid email address</Text>}
      <TextInput
        placeholder={'Password'}
        placeholderTextColor={COLORS.BLACK}
        value={password}
        onChangeText={handlePasswordChange}
      />
       {/* {!isValidPassword && <Text customStyle={{color:COLORS.ERROR,fontSize:scale(10), padding:verticalScale(4)}}>Please enter a valid email password</Text>} */}
      </View>
      <Button onPress={onSignUpBtnPress}> Signup</Button>
      <Footer footerText1={"Already have an account?"} footerText2={' Sign in'} onPress={()=>{
        props.navigation.navigate(ROUTES.SIGN_IN)
      }}/>
    </KeyboardAwareScrollView>
    </View>
  );
};
