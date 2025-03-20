import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MethodSelection() {
    const router = useRouter();
    const [isSensorEnabled, setIsSensorEnabled] = useState(true);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);

    const toggleSensorSwitch = () => {
        if (!isSensorEnabled) {
            setIsSensorEnabled(true);
            setIsCameraEnabled(false);
        }
    };

    const toggleCameraSwitch = () => {
        if (!isCameraEnabled) {
            setIsCameraEnabled(true);
            setIsSensorEnabled(false);
        }
    };

    const handleNext = () => {
        if (isSensorEnabled) {
            router.push('/DeviceConnection');
        } else {
            // Handle other navigation if needed
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F5F5DC] px-6 py-4 items-center">
            <View className='px-4 py-5 flex-1'>
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text className="text-lg font-bold ml-4">Method</Text>
            </View>

            <Text className="text-base mb-6 text-gray-800">
                If you need a quick analysis, go with Camera. For detailed and real-time monitoring, use Sensor.
            </Text>

            <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
                <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-gray-900">Sensor</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#0B4D26" }}
                        thumbColor={isSensorEnabled ? "#fff" : "#f4f3f4"}
                        onValueChange={toggleSensorSwitch}
                        value={isSensorEnabled}
                    />
                </View>
                {isSensorEnabled && (
                    <Text className="mt-2 text-gray-700">
                        Use a connected soil sensor to get real-time data on moisture, nutrients, and pH levels.
                    </Text>
                )}
            </View>

            <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
                <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-gray-900">Camera</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#0B4D26" }}
                        thumbColor={isCameraEnabled ? "#fff" : "#f4f3f4"}
                        onValueChange={toggleCameraSwitch}
                        value={isCameraEnabled}
                    />
                </View>
                {isCameraEnabled && (
                    <Text className="mt-2 text-gray-700">
                        Capture an image of your soil, and our AI will analyze its texture, color, and possible issues.
                    </Text>
                )}
            </View>

            <TouchableOpacity className="bg-[#0B4D26] py-2 items-center mt-auto" onPress={handleNext}>
                <Text className="text-white text-lg font-medium">Next</Text>
                </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}
