import React from 'react';
import { View, StyleSheet } from 'react-native';

interface VideoPlayerProps {
    videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
    if (!videoId) return null;

    return (
        <View style={styles.container}>
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
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
});
