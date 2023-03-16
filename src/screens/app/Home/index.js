import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from '@src/commons';
import { COLORS, ROUTES } from '@src/constants';
import { Text } from '@src/core-ui';
import { getData, scale, verticalScale } from '@src/helpers';
import { useIsFocused } from "@react-navigation/native";

export const Home = (props) => {
    const [numberOfCars, setNumberOfCars] = useState(0)
    const isFocused = useIsFocused();

    // its to refetch the stored data every time this screen focused
    useEffect(() => {
        if (isFocused) {
            getNumberOfCars();
        }
    }, [props, isFocused]);

    // geting number of cars stored in storage

    const getNumberOfCars = () => {
        getData('cars').then((cars) => {
            if (cars) {
                setNumberOfCars(cars.length)
            } else {
                setNumberOfCars(0)
            }
        })
    }
    // navigating to the adding vehicle
    const onBtnPress = () => {
        try {
            props.navigation.navigate(ROUTES.ADD_VEHICLE)
        } catch (error) { }
    };
    // navigating to the show all vehicle screen
    const onShowAllVehiclesBtnPress = () => {
        try {
            props.navigation.navigate(ROUTES.ALL_VEHICLES)
        } catch (error) { }
    }

    return (
        <View style={{ flex: 1, }}>
            <View style={{ height: verticalScale(80), backgroundColor: COLORS.PRIMARY, paddingBottom: verticalScale(6), alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text customStyle={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: scale(16) }}>{'CAR MANAGMENT SYSTEM'}</Text>
            </View>
            <View style={{ flex: 0.2, justifyContent: 'center', paddingHorizontal: scale(12) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text customStyle={{ color: COLORS.BLACK }}>{'No of Registerd Cars'}</Text>
                    <Text customStyle={{ color: COLORS.BLACK }}>{numberOfCars}</Text>
                </View>
                {numberOfCars > 0 && <Button onPress={onShowAllVehiclesBtnPress}> SHOW ALL VEHICLES</Button>}
            </View>

            <View style={{ flex: 0.8, justifyContent: 'flex-end' }}>
                <Button onPress={onBtnPress}> ADD NEW VEHICLE</Button>
            </View>
        </View>
    );
};
