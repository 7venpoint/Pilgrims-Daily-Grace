import React, { useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useMusic } from '@/contexts/MusicContext';
import { useApp } from '@/contexts/AppContext';

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function MiniMusicPlayer() {
  const { theme, isDark } = useApp();
  const {
    currentTrack,
    isPlaying,
    isLoading,
    position,
    duration,
    togglePlayPause,
    nextTrack,
    prevTrack,
    seekTo,
  } = useMusic();

  const progressBarRef = useRef<View>(null);
  const progressBarWidth = useRef(0);
  const playScale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playScale.value }],
  }));

  const handlePlayPress = async () => {
    playScale.value = withSpring(0.9, {}, () => {
      playScale.value = withSpring(1);
    });
    await togglePlayPause();
  };

  const progress = duration > 0 ? position / duration : 0;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        if (progressBarWidth.current > 0) {
          const x = evt.nativeEvent.locationX;
          const ratio = Math.max(0, Math.min(1, x / progressBarWidth.current));
          seekTo(ratio * (duration || 0));
        }
      },
      onPanResponderMove: (evt) => {
        if (progressBarWidth.current > 0) {
          const x = evt.nativeEvent.locationX;
          const ratio = Math.max(0, Math.min(1, x / progressBarWidth.current));
          seekTo(ratio * (duration || 0));
        }
      },
    })
  ).current;

  const bg = isDark ? 'rgba(30,27,75,0.95)' : 'rgba(237,233,254,0.97)';
  const trackColor = theme.tint;
  const subText = theme.textSecondary;

  return (
    <View style={[styles.container, { backgroundColor: bg, borderColor: theme.cardBorder }]}>
      <View style={styles.trackInfo}>
        <View style={[styles.albumIcon, { backgroundColor: theme.tintLight }]}>
          <Ionicons name="musical-notes" size={16} color={theme.tint} />
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.text, fontFamily: 'Inter_600SemiBold' }]} numberOfLines={1}>
            {currentTrack?.title ?? 'Worship Music'}
          </Text>
          <Text style={[styles.artist, { color: subText, fontFamily: 'Inter_400Regular' }]} numberOfLines={1}>
            {currentTrack?.artist ?? ''}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable onPress={prevTrack} hitSlop={10} style={styles.controlBtn}>
          <Ionicons name="play-skip-back" size={20} color={trackColor} />
        </Pressable>

        <Animated.View style={animStyle}>
          <Pressable onPress={handlePlayPress} style={[styles.playBtn, { backgroundColor: trackColor }]}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#fff" style={isPlaying ? {} : { marginLeft: 2 }} />
            )}
          </Pressable>
        </Animated.View>

        <Pressable onPress={nextTrack} hitSlop={10} style={styles.controlBtn}>
          <Ionicons name="play-skip-forward" size={20} color={trackColor} />
        </Pressable>
      </View>

      <View style={styles.progressSection}>
        <View
          ref={progressBarRef}
          style={[styles.progressBar, { backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)' }]}
          onLayout={e => { progressBarWidth.current = e.nativeEvent.layout.width; }}
          {...panResponder.panHandlers}
        >
          <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: trackColor }]} />
          <View
            style={[
              styles.progressThumb,
              { backgroundColor: trackColor, left: `${progress * 100}%` },
            ]}
          />
        </View>
        <View style={styles.timeRow}>
          <Text style={[styles.timeText, { color: subText, fontFamily: 'Inter_400Regular' }]}>
            {formatTime(position)}
          </Text>
          <Text style={[styles.timeText, { color: subText, fontFamily: 'Inter_400Regular' }]}>
            {formatTime(duration)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  albumIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    marginBottom: 2,
  },
  artist: {
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  controlBtn: {
    padding: 4,
  },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSection: {
    gap: 6,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
    overflow: 'visible',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  progressThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    top: -4,
    marginLeft: -6,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 11,
  },
});
