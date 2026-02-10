import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

interface VideoPlayerProps {
    videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
    if (!videoId) return null;

    return (
        <View style={styles.container}>
            <WebView
                style={styles.webview}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsFullscreenVideo
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                source={{
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                            <style>
                                * { margin: 0; padding: 0; }
                                html, body { width: 100%; height: 100%; background: #000; }
                                iframe { width: 100%; height: 100%; border: none; }
                            </style>
                        </head>
                        <body>
                            <iframe
                                src="https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </body>
                        </html>
                    `,
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
    webview: {
        flex: 1,
    },
});
