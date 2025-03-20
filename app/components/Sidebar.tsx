import { View, Text, Pressable, Image, ScrollView, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuItems = [
    { icon: 'grid-outline', label: 'Dashboard', route: '/(main)/dashboard' as const },
    { icon: 'analytics-outline', label: 'Analytics', route: '/(main)/analytics' as const },
    { icon: 'leaf-outline', label: 'Harvest', route: '/(main)/harvest' as const },
    { icon: 'calendar-outline', label: 'Schedule', route: '/(main)/schedule' as const },
    { icon: 'star-outline', label: 'Recommends', route: '../recommends' as const },
    { icon: 'cloudy-outline', label: 'Weather', route: '/(main)/weather' as const },
    { icon: 'scan-outline', label: 'Soil detects', route: '/../SoilDetection' as const },
    { icon: 'people-outline', label: 'Community', route: '/(main)/community' as const },
    { icon: 'settings-outline', label: 'Settings', route: '/(main)/settings' as const },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const router = useRouter();
    const [activeRoute, setActiveRoute] = useState('/(main)/dashboard');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await fetch('https://agrisense-tlsx.onrender.com/user', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setUsername(data.user.username);
                    } else {
                        console.error('Failed to fetch user data');
                    }
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token'); // Remove auth token
            router.replace('/signin'); // Redirect to signin screen
            onClose(); // Close the sidebar
        } catch (error) {
            Alert.alert('Error', 'Failed to logout. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <SafeAreaView style={styles.overlay} className='mt-10'>
            <View style={styles.sidebar}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={require('../../assets/profile-pic.png')}
                        style={styles.profilePic}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.greeting}>Good Day👋</Text>
                        <Text style={styles.name}>{username}</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <ScrollView style={styles.menuContainer} className='mt-5' >
                    {menuItems.map((item, index) => (
                        <Pressable
                            className={`flex p-2 flex-row items-center mb-2 gap-3 mx-2 rounded-lg ${
                                activeRoute === item.route
                                ? 'bg-[#0B4D26]'
                                : 'hover:bg-gray-100'
                            }`}
                            key={index}
                            onPress={() => {
                                setActiveRoute(item.route);
                                router.push(item.route as any);
                                onClose();
                            }}
                        >
                            <Ionicons
                                name={item.icon as any}
                                size={24}
                                color={activeRoute === item.route ? '#ffffff' : '#4B5563'}
                            />
                            <Text className={`${
                                activeRoute === item.route
                                ? 'text-white font-medium'
                                : 'text-gray-600'
                            }`}>
                                {item.label}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Logout Button */}
                <Pressable
                    className='flex flex-row items-center gap-3'
                    onPress={handleLogout}
                    style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && styles.pressedMenuItem
                    ]}
                >
                    <Ionicons name="log-out-outline" size={24} color="#DC2626" />
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>
            </View>
            <Pressable
                style={styles.overlayClose}
                onPress={onClose}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row'
    },
    sidebar: {
        width: '50%', // Changed to 50% of screen width
        height: '100%',
        backgroundColor: 'white'
    },
    profileSection: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        gap: 8
    },
    profilePic: {
        width: 36,
        height: 36,
        borderRadius: 18
    },
    profileInfo: {
        flex: 1
    },
    greeting: {
        fontSize: 13,
        color: '#4B5563'
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        flexShrink: 1,
        flexWrap: 'wrap'
    },
    menuContainer: {
        flex: 1
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 8
    },
    iconStyle: {
        marginRight: 10 // Ensure icons and text are aligned properly
    },
    activeMenuItem: {
        backgroundColor: 'rgba(11,77,38,0.1)'
    },
    pressedMenuItem: {
        backgroundColor: 'rgba(11,77,38,0.08)',
        opacity: 0.9
    },
    menuText: {
        color: '#4B5563',
        fontSize: 14
    },
    activeMenuText: {
        color: '#0B4D26',
        fontWeight: '500'
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5'
    },
    logoutText: {
        marginLeft: 12,
        color: '#4B5563',
        fontSize: 16
    },
    overlayClose: {
        flex: 1
    }
});
