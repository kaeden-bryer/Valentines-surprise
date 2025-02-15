import React, { useState, useRef, useEffect } from "react";

const BackgroundMusic: React.FC = () => {
  const [, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle play/pause

  // Automatically start playing when the component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume (0.0 to 1.0)
      audioRef.current.loop = true; // Loop the music
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  return (
    <div className="hidden">
      <audio ref={audioRef} src="./MyJinji.mp3" />
    </div>
  );
};

export default BackgroundMusic;