import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Geolocation from 'react-native-geolocation-service';
import { useSidebar } from '../context/SidebarContext';


export default function Dashboard() {
    const [location, setLocation] = useState('Fetching location...');
    const [district, setDistrict] = useState('Fetching district...');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('Overview');
    const { toggleSidebar } = useSidebar();

    useEffect(() => {
        Geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                const data = await response.json();
                setLocation(`${data.city}, ${data.countryName}`);
                setDistrict(data.locality || 'District unavailable');
            },
            (error) => {
                console.error(error);
                setLocation('Location unavailable');
                setDistrict('District unavailable');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const carouselItems = [
        { image: require('../../assets/latest-update.png'), title: 'Get to know your soil' },
        { image: require('../../assets/latest-update.png'), title: 'More updates' },
        { image: require('../../assets/latest-update.png'), title: 'Additional update 1' },
        { image: require('../../assets/latest-update.png'), title: 'Additional update 2' },
        { image: require('../../assets/latest-update.png'), title: 'Additional update 1' },
        { image: require('../../assets/latest-update.png'), title: 'Additional update 2' },
        { image: require('../../assets/latest-update.png'), title: 'Additional update 1' },
        { image: require('../../assets/latest-update.png'), title: 'Additional update 2' },
        { image: require('../../assets/latest-update.png'), title: 'Additional update 1' },
        { image: require('../../assets/latest-update.png'), title: 'Additional update 2' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <Text>Overview Content</Text>;
            case 'Soil status':
                return <Text>Soil Status Content</Text>;
            case 'Weather':
                return <Text>Weather Content</Text>;
            case 'Recommend':
                return <Text>Recommend Content</Text>;
            case 'Irrigation':
                return <Text>Irrigation Content</Text>;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#FAF9F6]">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="bg-green-800 py-10 px-4">
                    <View className="flex-row justify-between items-center">
                        <TouchableOpacity onPress={toggleSidebar}>
                            <Ionicons name="menu-outline" size={24} color="white" />
                        </TouchableOpacity>
                        <View>

                            <View className="flex-row items-center">
                                <Ionicons name="location-outline" size={20} color="white" style={{ marginRight: 5 }} />
                                <Text className="text-white">{location}</Text>
                            </View>
                        </View>
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    </View>

                    {/* Search Bar */}
                    <View className="flex-row items-center mt-10 bg-white p-2 rounded-lg">
                        <Ionicons name="search-outline" size={20} color="#0B4D26" />
                        <TextInput
                            placeholder="Search.."
                            placeholderTextColor="#0B4D26"
                            className="flex-1 ml-2"
                        />
                    </View>
                </View>

                {/* Latest Update */}
                <View className="p-4">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-bold">#Latest Update</Text>
                        <Text className="text-green-700">See all</Text>
                    </View>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => {
                            const slideSize = event.nativeEvent.layoutMeasurement.width;
                            const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
                            setCurrentIndex(index);
                        }}
                        scrollEventThrottle={16}
                    >
                        {carouselItems.map((item, index) => (
                            <View key={index} className="w-64 h-36 mr-2">
                                <Image source={item.image} className="w-full h-full rounded-lg" />
                            </View>
                        ))}
                    </ScrollView>
                    <View className="flex-row justify-center mt-2">
                        {carouselItems.map((_, index) => (
                            <View
                                key={index}
                                className={`w-2 h-2 rounded-full mx-1 ${currentIndex === index ? 'bg-blue-800' : 'bg-gray-400'}`}
                            />
                        ))}
                    </View>
                </View>

                {/* Recommended For You */}
                <View className="p-4">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-bold">Recommended For You</Text>
                        <Text className="text-green-700">See all</Text>
                    </View>
                    <ScrollView horizontal className="mt-2">
                        {['Overview', 'Soil status', 'Weather', 'Recommend', 'Irrigation'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                className={`p-2 rounded-lg mr-2 ${activeTab === tab ? 'bg-green-200' : 'bg-gray-200'}`}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Tab Content */}
                <View className="p-4">
                    {renderContent()}
                </View>

                {/* Hourly Forecast */}
                <View className="p-4">
                    <Text className="text-lg font-bold">{district}</Text>
                    <Text className="text-sm">Hourly Forecast</Text>
                    <ScrollView horizontal className="mt-2">
                        <View className="flex items-center mr-4">
                            <Ionicons name="sunny-outline" size={24} color="black" />
                            <Text>6:00am</Text>
                            <Text>28°C</Text>
                        </View>
                        <View className="flex items-center mr-4">
                            <Ionicons name="cloud-outline" size={24} color="black" />
                            <Text>6:00am</Text>
                            <Text>28°C</Text>
                        </View>
                        <View className="flex items-center mr-4">
                            <Ionicons name="rainy-outline" size={24} color="black" />
                            <Text>6:00am</Text>
                            <Text>28°C</Text>
                        </View>
                        <View className="flex items-center mr-4">
                            <Ionicons name="partly-sunny-outline" size={24} color="black" />
                            <Text>6:00am</Text>
                            <Text>28°C</Text>
                        </View>
                    </ScrollView>
                </View>

                {/* Yesterday's Weather */}
                <View className="p-4">
                    <View className="bg-white p-4 rounded-lg shadow">
                        <Text className="text-sm">Yesterday</Text>
                        <Text className="text-lg font-bold">Light rain showers</Text>
                        <Text className="text-sm">17° ↑ 10° ↓</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
