import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface VideoPlayerProps {
    videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
    const [playing, setPlaying] = useState(false);

    if (!videoId) return null;

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    if (!playing) {
        return (
            <TouchableOpacity style={styles.container} onPress={() => setPlaying(true)} activeOpacity={0.8}>
                <Image
                    source={{ uri: thumbnailUrl }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <View style={styles.playButton}>
                        <Ionicons name="play" size={32} color="#fff" style={styles.playIcon} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <WebView
                style={styles.webview}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsFullscreenVideo
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#ff0000" />
                    </View>
                )}
                source={{
                    uri: `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&controls=1`,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 220,
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 8,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    playButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        marginLeft: 4,
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
});
