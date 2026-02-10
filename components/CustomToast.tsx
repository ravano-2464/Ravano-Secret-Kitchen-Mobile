import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';

interface CustomToastProps {
    text1?: string;
    text2?: string;
    type: 'success' | 'error' | 'info';
}

const CustomToast = ({ text1, text2, type }: CustomToastProps) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const hideToast = () => {
        Toast.hide();
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (_, gestureState) => {
                if (Math.abs(gestureState.dx) > 100) {
                    Animated.timing(pan, {
                        toValue: { x: gestureState.dx > 0 ? 500 : -500, y: 0 },
                        duration: 200,
                        useNativeDriver: false
                    }).start(() => hideToast());
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false
                    }).start();
                }
            }
        })
    ).current;

    const getBackgroundColor = () => {
        switch (type) {
            case 'success': return '#10B981'; // Green
            case 'error': return '#EF4444'; // Red
            case 'info': return '#3B82F6'; // Blue
            default: return '#333';
        }
    };

    const getIconName = () => {
        switch (type) {
            case 'success': return 'checkmark-circle';
            case 'error': return 'alert-circle';
            case 'info': return 'information-circle';
            default: return 'notifications';
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { transform: [{ translateX: pan.x }], backgroundColor: getBackgroundColor() }
            ]}
            {...panResponder.panHandlers}
        >
            <View style={styles.iconContainer}>
                <Ionicons name={getIconName()} size={28} color="#fff" />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text1}>{text1}</Text>
                {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
            </View>

            <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
                <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    );
};

export const toastConfig: ToastConfig = {
    success: (props: ToastConfigParams<any>) => (
        <CustomToast text1={props.text1} text2={props.text2} type="success" />
    ),
    error: (props: ToastConfigParams<any>) => (
        <CustomToast text1={props.text1} text2={props.text2} type="error" />
    ),
    info: (props: ToastConfigParams<any>) => (
        <CustomToast text1={props.text1} text2={props.text2} type="info" />
    ),
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
        marginTop: 10,
    },
    iconContainer: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 2,
    },
    text2: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    closeButton: {
        padding: 4,
        alignSelf: 'flex-start',
        marginLeft: 4,
        marginTop: -4,
    },
});
