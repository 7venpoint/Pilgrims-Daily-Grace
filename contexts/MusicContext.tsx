import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  uri: string;
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: '1',
    title: 'Amazing Grace',
    artist: 'Christian Hymn',
    uri: 'https://archive.org/download/02-jesus-all-for-jesus/04%20-%20Amazing%20Grace%20(My%20Chains).mp3',
  },
  {
    id: '2',
    title: 'How Great Thou Art',
    artist: 'Traditional Hymn',
    uri: 'https://archive.org/download/02-jesus-all-for-jesus/06%20-%20How%20Great%20Thou%20Art.mp3',
  },
  {
    id: '3',
    title: 'Jesus, All For Jesus',
    artist: 'Worship Song',
    uri: 'https://archive.org/download/02-jesus-all-for-jesus/02%20-%20Jesus%20All%20For%20Jesus.mp3',
  },
  {
    id: '4',
    title: "Refiner's Fire",
    artist: 'Worship Song',
    uri: 'https://archive.org/download/02-jesus-all-for-jesus/05%20-%20Refiners%20Fire%20(Purify%20My%20Heart).mp3',
  },
  {
    id: '5',
    title: "God's Love Is The Best Love",
    artist: 'Gospel Song',
    uri: 'https://archive.org/download/02-jesus-all-for-jesus/03%20-%20Gods%20Love%20Is%20The%20Best%20Love.mp3',
  },
  {
    id: '6',
    title: 'The Solid Rock',
    artist: 'Traditional Hymn',
    uri: 'https://archive.org/download/one_foundation_wonderful/one_foundation_wonderful.mp3',
  },
];

interface MusicContextValue {
  tracks: MusicTrack[];
  currentTrack: MusicTrack | null;
  currentIndex: number;
  isPlaying: boolean;
  isLoading: boolean;
  position: number;
  duration: number;
  togglePlayPause: () => Promise<void>;
  playTrack: (index: number) => Promise<void>;
  nextTrack: () => Promise<void>;
  prevTrack: () => Promise<void>;
  seekTo: (positionMs: number) => Promise<void>;
}

const MusicContext = createContext<MusicContextValue | null>(null);

const STORAGE_KEY = 'daily_grace_last_track_index';

export function MusicProvider({ children }: { children: ReactNode }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const isLoadingRef = useRef(false);
  const pendingIndexRef = useRef<number | null>(null);

  useEffect(() => {
    initAudio();
    return () => {
      soundRef.current?.unloadAsync().catch(() => {});
    };
  }, []);

  const initAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const idx = parseInt(saved, 10);
        if (!isNaN(idx) && idx >= 0 && idx < MUSIC_TRACKS.length) {
          setCurrentIndex(idx);
        }
      }
    } catch {}
  };

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    setPosition(status.positionMillis ?? 0);
    setDuration(status.durationMillis ?? 0);
    setIsPlaying(status.isPlaying);
    if (status.didJustFinish) {
      setCurrentIndex(prev => {
        const next = (prev + 1) % MUSIC_TRACKS.length;
        loadAndPlay(next);
        return next;
      });
    }
  }, []);

  const loadAndPlay = async (index: number) => {
    if (isLoadingRef.current) {
      pendingIndexRef.current = index;
      return;
    }
    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync().catch(() => {});
        await soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
      setPosition(0);
      setDuration(0);
      const track = MUSIC_TRACKS[index];
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true, progressUpdateIntervalMillis: 500 },
        onPlaybackStatusUpdate
      );
      soundRef.current = sound;
      setCurrentIndex(index);
      await AsyncStorage.setItem(STORAGE_KEY, index.toString());
    } catch (e) {
      console.warn('Music load error:', e);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
      if (pendingIndexRef.current !== null) {
        const pending = pendingIndexRef.current;
        pendingIndexRef.current = null;
        loadAndPlay(pending);
      }
    }
  };

  const togglePlayPause = async () => {
    if (isLoadingRef.current) return;
    const sound = soundRef.current;
    if (!sound) {
      await loadAndPlay(currentIndex);
      return;
    }
    try {
      const status = await sound.getStatusAsync();
      if (!status.isLoaded) {
        await loadAndPlay(currentIndex);
        return;
      }
      if (status.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch {
      await loadAndPlay(currentIndex);
    }
  };

  const playTrack = async (index: number) => {
    await loadAndPlay(index);
  };

  const nextTrack = async () => {
    const next = (currentIndex + 1) % MUSIC_TRACKS.length;
    await loadAndPlay(next);
  };

  const prevTrack = async () => {
    if (position > 3000) {
      await soundRef.current?.setPositionAsync(0);
      return;
    }
    const prev = (currentIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    await loadAndPlay(prev);
  };

  const seekTo = async (positionMs: number) => {
    await soundRef.current?.setPositionAsync(positionMs);
  };

  return (
    <MusicContext.Provider
      value={{
        tracks: MUSIC_TRACKS,
        currentTrack: MUSIC_TRACKS[currentIndex],
        currentIndex,
        isPlaying,
        isLoading,
        position,
        duration,
        togglePlayPause,
        playTrack,
        nextTrack,
        prevTrack,
        seekTo,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}
