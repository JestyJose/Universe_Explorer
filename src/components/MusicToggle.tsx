import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Volume2, VolumeX } from "lucide-react";

export const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Space ambient music URL (royalty-free)
    const audioUrl = "https://cdn.pixabay.com/audio/2022/01/18/audio_32ab04c03f.mp3";
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 cosmic-glow bg-card/80 backdrop-blur-sm hover:bg-card"
      title={isPlaying ? "Mute ambient music" : "Play ambient music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-primary" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </Button>
  );
};
