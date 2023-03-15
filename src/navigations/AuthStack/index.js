import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '@src/constants';
import {  SignIn, SignUp} from '@src/screens';
import { Addvehicle, AllVehicles, Home, UpdateVehicle } from '@src/screens/app';

export const AuthStack = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator
         initialRouteName={ROUTES.SIGN_IN} 
         screenOptions={{headerShown:false}}>
          <Stack.Screen
            component={SignIn}
            name={ROUTES.SIGN_IN}
          />
          <Stack.Screen
            component={SignUp}
            name={ROUTES.SIGN_UP}
          />
           <Stack.Screen
            component={Home}
            name={ROUTES.HOME}
          />
           <Stack.Screen
            component={Addvehicle}
            name={ROUTES.ADD_VEHICLE}
          />
             <Stack.Screen
            component={AllVehicles}
            name={ROUTES.ALL_VEHICLES}
          />
            <Stack.Screen
            component={UpdateVehicle}
            name={ROUTES.UPDATE_VEHICLE}
          />

      
        </Stack.Navigator>
        </NavigationContainer>
  );
};
