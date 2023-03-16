import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Button } from '@src/commons';
import { COLORS, IMAGES, ROUTES } from '@src/constants';
import { Text, TextInput } from '@src/core-ui';
import { getData, scale, storeData, verticalScale } from '@src/helpers';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// this is the initial state of the car that need to be added
const carModel = {
    category: '',
    color: '',
    model: '',
    make: '',
    registrationNo: '',
};

export const Addvehicle = (props, { initialValues = carModel }) => {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // there i am validating the all fields
    const validate = () => {
        let errs = {};

        if (!car.category) {
            errs = { ...errs, category: 'Category is required' };
        }

        if (!car.color) {
            errs = { ...errs, color: 'Color is required' };
        }

        if (!car.model) {
            errs = { ...errs, model: 'Model is required' };
        }

        if (!car.make) {
            errs = { ...errs, make: 'Make is required' };
        }

        if (!car.registrationNo) {
            errs = { ...errs, registrationNo: 'Registration No is required' };
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };
    // here the data is stored in the local storage
    // first it will check if theres any data in local storage it will get all data and push new data into it
    // and if theres no data it simply adding data to the storage
    const handleSubmit = () => {
        if (validate()) {
            getData('cars').then((cars) => {
                if (cars) {
                    let allCars = cars
                    allCars.push(car)
                    storeData('cars', allCars)
                    Alert.alert('Vehicle Added', 'New Vehicle Added to the database', [
                        { text: 'OK', onPress: () => { props.navigation.goBack() } },
                    ]);

                } else {
                    storeData('cars', [car])
                    Alert.alert('Vehicle Added', 'New Vehicle Added to the database', [
                        { text: 'OK', onPress: () => { props.navigation.goBack() } },
                    ]);

                }
            })
            // onSubmit(car);
        }
    };
    // render

    return (
        <View style={{ flex: 1, }}>
            <View style={{ height: verticalScale(80), backgroundColor: COLORS.PRIMARY, flexDirection: 'row', paddingBottom: verticalScale(6), alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <Image
                            source={IMAGES.backArrow}
                            resizeMode={'contain'}
                            style={{ height: scale(30), width: scale(30), marginLeft: scale(12) }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text customStyle={{ color: COLORS.WHITE, fontWeight: 'bold', textAlign: 'center', fontSize: scale(16) }}>{'VEHICLE INFORMATION'}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>

                </View>
            </View>

            <View style={{ padding: scale(12), flex: 0.7 }}>

                <View style={{ zIndex: 999 }}>
                    <DropDownPicker
                        items={[
                            { label: 'SUV', value: 'suv' },
                            { label: 'Sedan', value: 'sedan' },
                            { label: 'Hatchback', value: 'hatchback' },
                        ]}
                        open={open}
                        setOpen={setOpen}
                        value={car.category}
                        defaultValue={car.category}
                        placeholder="Select category"
                        containerStyle={styles.dropdownContainer}
                        style={styles.dropdown}
                        itemStyle={styles.dropdownItem}
                        dropDownStyle={styles.dropdownList}
                        onSelectItem={(item) => {
                            setCar((prev) => ({ ...prev, category: item.value }))
                        }}
                    />
                    {errors.category && (
                        <Text customStyle={styles.error}>{errors.category}</Text>
                    )}
                </View>
                <KeyboardAwareScrollView style={{ flex: 1 }}
                    keyboardShouldPersistTaps="always">
                    <TextInput
                        customStyle={styles.input}
                        placeholder="Color"
                        label="Color"
                        value={car.color}
                        onChangeText={(text) =>
                            setCar((prev) => ({ ...prev, color: text }))
                        }

                    />
                    {errors.color && <Text customStyle={styles.error}>{errors.color}</Text>}

                    <TextInput
                        label="Model"
                        placeholder="Model"
                        value={car.model}
                        onChangeText={(text) =>
                            setCar((prev) => ({ ...prev, model: text }))
                        }
                        customStyle={styles.input}
                    />
                    {errors.model && <Text customStyle={styles.error}>{errors.model}</Text>}
                    <TextInput
                        label="Make"
                        placeholder="Make"
                        value={car.make}
                        onChangeText={(text) =>
                            setCar((prev) => ({ ...prev, make: text }))
                        }
                        customStyle={styles.input}
                    />
                    {errors.make && <Text customStyle={styles.error}>{errors.make}</Text>}
                    <TextInput
                        label="Registration No"
                        placeholder="Registration No"
                        value={car.registrationNo}
                        onChangeText={(text) =>
                            setCar((prev) => ({ ...prev, registrationNo: text }))
                        }
                        customStyle={styles.input}
                    />
                    {errors.registrationNo && (
                        <Text customStyle={styles.error}>{errors.registrationNo}</Text>
                    )}
                </KeyboardAwareScrollView>

            </View>

            <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
                <Button onPress={handleSubmit}> ADD VEHICLE</Button>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        height: 60,
        marginVertical: 8,
    },
    dropdown: {
        backgroundColor: '#fafafa',
    },
    dropdownList: {
        backgroundColor: '#fafafa',
    },
    dropdownItem: {
        justifyContent: 'flex-start',
    },
    input: {
        marginVertical: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    button: {
        width: '40%',
    },
    error: {
        color: 'red',
        marginBottom: 8,
    },
});







