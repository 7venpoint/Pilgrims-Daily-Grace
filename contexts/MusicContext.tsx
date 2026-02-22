import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MusicTrack {
  id: string;
  title: string;
  uri: string;
}

interface MusicContextValue {
  isPlaying: boolean;
  isLoaded: boolean;
  currentTrack: MusicTrack | null;
  volume: number;
  togglePlayback: () => void;
  nextTrack: () => void;
  setVolume: (vol: number) => void;
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

const MUSIC_STORAGE_KEY = 'daily_grace_music_enabled';
const VOLUME_STORAGE_KEY = 'daily_grace_music_volume';

const WORSHIP_TRACKS: MusicTrack[] = [
  {
    id: 'ambient1',
    title: 'Peaceful Worship',
    uri: 'https://cdn.pixabay.com/audio/2024/11/29/audio_d4b82e519c.mp3',
  },
  {
    id: 'ambient2',
    title: 'Grace Melody',
    uri: 'https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08e0.mp3',
  },
  {
    id: 'ambient3',
    title: 'Still Waters',
    uri: 'https://cdn.pixabay.com/audio/2023/10/24/audio_3f4914c175.mp3',
  },
  {
    id: 'ambient4',
    title: 'Morning Light',
    uri: 'https://cdn.pixabay.com/audio/2024/09/10/audio_6e1fae1324.mp3',
  },
];

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolumeState] = useState(0.3);
  const [musicEnabled, setMusicEnabledState] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    loadPreferences();
    return () => {
      isMountedRef.current = false;
      unloadSound();
    };
  }, []);

  const loadPreferences = async () => {
    try {
      const [savedEnabled, savedVolume] = await Promise.all([
        AsyncStorage.getItem(MUSIC_STORAGE_KEY),
        AsyncStorage.getItem(VOLUME_STORAGE_KEY),
      ]);
      if (savedEnabled === 'true') {
        setMusicEnabledState(true);
      }
      if (savedVolume) {
        setVolumeState(parseFloat(savedVolume));
      }
    } catch (e) {
      console.error('Error loading music preferences:', e);
    }
  };

  const unloadSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    } catch (e) {}
  };

  const loadAndPlayTrack = useCallback(async (trackIndex: number) => {
    try {
      await unloadSound();
      
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });

      const track = WORSHIP_TRACKS[trackIndex];
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true, volume, isLooping: true },
        (status) => {
          if (!isMountedRef.current) return;
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
            setIsLoaded(true);
          }
        }
      );
      
      soundRef.current = sound;
      if (isMountedRef.current) {
        setIsPlaying(true);
        setIsLoaded(true);
      }
    } catch (e) {
      console.error('Error loading track:', e);
      if (isMountedRef.current) {
        setIsLoaded(false);
        setIsPlaying(false);
      }
    }
  }, [volume]);

  useEffect(() => {
    if (musicEnabled) {
      loadAndPlayTrack(currentTrackIndex);
    } else {
      unloadSound();
      setIsPlaying(false);
      setIsLoaded(false);
    }
  }, [musicEnabled]);

  const togglePlayback = useCallback(async () => {
    try {
      if (!soundRef.current) {
        if (musicEnabled) {
          await loadAndPlayTrack(currentTrackIndex);
        }
        return;
      }

      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundRef.current.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (e) {
      console.error('Error toggling playback:', e);
    }
  }, [musicEnabled, currentTrackIndex, loadAndPlayTrack]);

  const nextTrack = useCallback(async () => {
    const newIndex = (currentTrackIndex + 1) % WORSHIP_TRACKS.length;
    setCurrentTrackIndex(newIndex);
    if (musicEnabled) {
      await loadAndPlayTrack(newIndex);
    }
  }, [currentTrackIndex, musicEnabled, loadAndPlayTrack]);

  const setVolume = useCallback(async (vol: number) => {
    setVolumeState(vol);
    AsyncStorage.setItem(VOLUME_STORAGE_KEY, vol.toString());
    try {
      if (soundRef.current) {
        await soundRef.current.setVolumeAsync(vol);
      }
    } catch (e) {}
  }, []);

  const setMusicEnabled = useCallback((enabled: boolean) => {
    setMusicEnabledState(enabled);
    AsyncStorage.setItem(MUSIC_STORAGE_KEY, enabled.toString());
  }, []);

  const currentTrack = WORSHIP_TRACKS[currentTrackIndex];

  return (
    <MusicContext.Provider value={{
      isPlaying,
      isLoaded,
      currentTrack,
      volume,
      togglePlayback,
      nextTrack,
      setVolume,
      musicEnabled,
      setMusicEnabled,
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
