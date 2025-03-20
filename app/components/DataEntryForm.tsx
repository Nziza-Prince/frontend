import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DataEntryForm() {
    const [formData, setFormData] = useState({
        image: '',
        temperature: '',
        humidity: '',
        rainfall: '',
        nitrogen: '',
        phosphorus: '',
        potassium: '',
    });

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData({ ...formData, image: result.uri });
        }
    };

    return (
        <ScrollView className="p-4">
            <Text className="text-lg font-bold mb-2">Enter Data</Text>
            <TouchableOpacity onPress={pickImage} className="bg-gray-200 p-2 rounded-lg mb-2">
                <Text>Select Image</Text>
            </TouchableOpacity>
            {formData.image ? <Image source={{ uri: formData.image }} style={{ width: 100, height: 100 }} /> : null}
            <TextInput
                placeholder="Temperature"
                value={formData.temperature}
                onChangeText={(value) => handleInputChange('temperature', value)}
                keyboardType="numeric"
                className="bg-white p-2 rounded-lg mb-2"
            />
            <TextInput
                placeholder="Humidity"
                value={formData.humidity}
                onChangeText={(value) => handleInputChange('humidity', value)}
                keyboardType="numeric"
                className="bg-white p-2 rounded-lg mb-2"
            />
            <TextInput
                placeholder="Rainfall"
                value={formData.rainfall}
                onChangeText={(value) => handleInputChange('rainfall', value)}
                keyboardType="numeric"
                className="bg-white p-2 rounded-lg mb-2"
            />
            <TextInput
                placeholder="Nitrogen"
                value={formData.nitrogen}
                onChangeText={(value) => handleInputChange('nitrogen', value)}
                keyboardType="numeric"
                className="bg-white p-2 rounded-lg mb-2"
            />
            <TextInput
                placeholder="Phosphorus"
                value={formData.phosphorus}
                onChangeText={(value) => handleInputChange('phosphorus', value)}
                keyboardType="numeric"
                className="bg-white p-2 rounded-lg mb-2"
            />
            <TextInput
                placeholder="Potassium"
                value={formData.potassium}
                onChangeText={(value) => handleInputChange('potassium', value)}
                keyboardType="numeric"
                className="bg-white p-2 rounded-lg mb-2"
            />
        </ScrollView>
    );
}
