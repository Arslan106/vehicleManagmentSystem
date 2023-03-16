import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Button } from '@src/commons';
import { COLORS, IMAGES, ROUTES } from '@src/constants';
import { Text } from '@src/core-ui';
import { getData, scale, storeData, verticalScale } from '@src/helpers';
import { useIsFocused } from "@react-navigation/native";


export const AllVehicles = (props) => {
    const [allCars, setAllCars] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    // this is to get all vehicles every time the user focused this screen
    useEffect(() => {
        if (isFocused) {
            getAllCars();
        }
    }, [props, isFocused]);

    // getting all stored cars from local storage
    const getAllCars = () => {
        getData('cars').then((cars) => {
            if (cars) {
                setIsLoading(false);
                setAllCars(cars)
            } else {
                setIsLoading(false);
                setAllCars([])
            }
        })
    }
    // it will refresh the flatlist when the user delete any car
    const onRefresh = async () => {
        setRefreshing(true);
        await getAllCars();
        setRefreshing(false);
    };
    // if theres no data in flatlist this section will show up
    const renderEmptyComponent = () => (
        <View style={{ marginTop: verticalScale(60), justifyContent: 'center', alignItems: 'center' }}>
            <Text customStyle={{ fontWeight: 'bold', color: COLORS.BLACK, fontSize: scale(16) }}>No data to display</Text>
        </View>
    );
    // here rendering the flatlist data
    const renderItem = ({ item, index }) => (
        <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: scale(12), padding: scale(12), marginHorizontal: scale(12), marginBottom: allCars.length - 1 == index ? verticalScale(12) : 0, marginTop: verticalScale(12) }}>
            <View style={{ flexDirection: 'row', }}>
                <Text customStyle={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: scale(16) }}>{'Category :'}</Text><Text customStyle={{ fontWeight: 'bold', color: COLORS.PRIMARY, fontSize: scale(14), paddingLeft: scale(14) }}>{item.category}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <Text customStyle={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: scale(16) }}>{'Color :'}</Text><Text customStyle={{ fontWeight: 'bold', color: COLORS.PRIMARY, fontSize: scale(14), paddingLeft: scale(14) }}>{item.color}</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Text customStyle={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: scale(16) }}>{'Make :'}</Text><Text customStyle={{ fontWeight: 'bold', color: COLORS.PRIMARY, fontSize: scale(14), paddingLeft: scale(14) }}>{item.make}</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Text customStyle={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: scale(16) }}>{'Model :'}</Text><Text customStyle={{ fontWeight: 'bold', color: COLORS.PRIMARY, fontSize: scale(14), paddingLeft: scale(14) }}>{item.model}</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Text customStyle={{ color: COLORS.BLACK, fontWeight: 'bold', fontSize: scale(16) }}>{'Registration No :'}</Text><Text customStyle={{ fontWeight: 'bold', color: COLORS.PRIMARY, fontSize: scale(14), paddingLeft: scale(14) }}>{item.registrationNo}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button customStyle={{ flex: 1, marginLRight: scale(12) }} onPress={() => {
                    let data = {
                        carModel: {
                            category: item.category,
                            color: item.color,
                            model: item.model,
                            make: item.make,
                            registrationNo: item.registrationNo,
                        },
                        selectedIndex: index
                    }
                    props.navigation.navigate(ROUTES.UPDATE_VEHICLE, { data })
                }}>Update</Button>
                <Button customStyle={{ flex: 1, marginLeft: scale(12) }} onPress={() => {
                    setRefreshing(true)
                    setTimeout(() => {
                        allCars.splice(index, 1);
                        setAllCars(allCars)
                        storeData('cars', allCars)
                        setRefreshing(false)
                    }, 2000);

                    console.log(allCars);
                }}>Delete</Button>
            </View>
        </View>
    );


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
                    <Text customStyle={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: scale(16) }}>{'ALL VEHICLE'}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                </View>
            </View>
            <>
                {isLoading ? (
                    <ActivityIndicator size="large" color={'gray'} />
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        extraData={allCars}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={renderEmptyComponent}
                        data={allCars}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                )}
            </>

        </View>
    );
};
