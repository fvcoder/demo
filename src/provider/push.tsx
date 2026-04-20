import { toast } from "@heroui/react";
import { useEffect, useRef } from "react";

import { useSW } from "@/hooks/useSW";

export function PushProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { subscribe } = useSW();

  useEffect(() => {
    return subscribe((event) => {
      if (event.type === "push" && event.push.isFocused) {
        toast(event.push.data.title, {
          description: event.push.data.body,
        });
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          audioRef.current.play();
        }
      }
    });
  }, []);

  return (
    <>
      {children}
      <audio ref={audioRef} src="/audio/universfield-new-notification-014-363678.mp3" />
    </>
  );
}
