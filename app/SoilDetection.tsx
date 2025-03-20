import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function SoilDetection() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F5F5DC] p-5">
            <View className="flex-1 justify-centerp-6">
                {/* Image Container */}
                <View className="w-full aspect-[3/4] mb-4 overflow-hidden">
                    <Image
                        source={require('../assets/soil-detection-image.png')}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Text Content */}
                <View className="w-full items-center px-6 mb-4">
                    <Text className="text-2xl font-semibold mb-2 text-center">
                        Soil detection
                    </Text>
                    <Text className="text-gray-700 text-base text-center">
                        Detect soil type, pH, moisture, nutrients, and other properties
                        to get recommended about what to do
                    </Text>
                </View>

                {/* Button */}
                <View className="items-center">
                    <TouchableOpacity
                        className="bg-[#0B4D26] w-3/4 py-2 rounded-sm"
                        onPress={() => router.push('MethodSelection')}
                    >
                        <Text className="text-white text-center text-lg font-medium">
                            Start now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
