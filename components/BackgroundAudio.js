import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import { COLOR } from "../pages/_app";

const StyledSvg = styled.svg`
  fill: ${COLOR.light};
`;

const Playing = () => {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <title />
      <g id="icomoon-ignore"></g>
      <path d="M359.765 415.765c-6.143 0-12.283-2.343-16.971-7.028-9.372-9.372-9.372-24.568 0-33.941 65.503-65.503 65.503-172.085 0-237.588-9.372-9.373-9.372-24.569 0-33.941 9.372-9.371 24.569-9.372 33.941 0 40.797 40.795 63.265 95.037 63.265 152.733s-22.468 111.938-63.265 152.735c-4.686 4.687-10.828 7.030-16.97 7.030v0zM274.51 370.51c-6.143 0-12.283-2.343-16.971-7.029-9.373-9.373-9.373-24.567 0-33.94 40.55-40.55 40.55-106.529 0-147.078-9.373-9.373-9.373-24.569 0-33.941s24.568-9.372 33.941 0c59.265 59.265 59.265 155.696 0 214.961-4.686 4.684-10.828 7.027-16.97 7.027z" />
      <path d="M208.003 480c-4.164 0-8.256-1.625-11.317-4.687l-123.313-123.313h-57.373c-8.836 0-16-7.163-16-16v-160c0-8.836 7.164-16 16-16h57.373l123.313-123.314c4.577-4.577 11.458-5.945 17.437-3.468s9.877 8.311 9.877 14.782v416c0 6.472-3.898 12.306-9.877 14.782-1.979 0.82-4.059 1.218-6.12 1.218z" />
    </StyledSvg>
  );
};
const Paused = () => {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <title />
      <g id="icomoon-ignore"></g>
      <path d="M480 309.574v42.426h-42.426l-53.574-53.574-53.574 53.574h-42.426v-42.426l53.574-53.574-53.574-53.574v-42.426h42.426l53.574 53.574 53.574-53.574h42.426v42.426l-53.574 53.574 53.574 53.574z" />
      <path d="M208.003 480c-4.164 0-8.256-1.625-11.317-4.687l-123.313-123.313h-57.373c-8.836 0-16-7.163-16-16v-160c0-8.836 7.164-16 16-16h57.373l123.313-123.314c4.577-4.577 11.458-5.945 17.437-3.468s9.877 8.311 9.877 14.782v416c0 6.472-3.898 12.306-9.877 14.782-1.979 0.82-4.059 1.218-6.12 1.218z" />
    </StyledSvg>
  );
};
const useAudio = (url) => {
  const [audio, setAutio] = useState(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);
  const handleLoad = () => {
    playing ? audio.play() : audio.pause();
  };
  useEffect(() => {
    setAutio(new Audio(url));
    playing ? audio.play() : audio.pause();
    audio.onLoad(handleLoad);
  }, [playing]);

  // useEffect(() => {
  //   audio.addEventListener('ended', () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener('ended', () => setPlaying(false));
  //   };
  // }, []);

  return [playing, toggle];
};
export default function BackgroundAudio({ settings }) {
  return null;
  //settings.data.background_audio.url
  // const [playing, toggle] = useAudio(settings.data.background_audio.url);
  const [play, { stop }] = useSound(settings.data.background_audio.url);
  const [state, setState] = useState(true);
  const changeState = () => {
    state ? play() : stop();
    setState(!state);
  };
  useEffect(() => {}, [state]);
  return (
    <div /* onClick={toggle} */>
      <button onClick={() => playSound()}>Play Sound</button>
    </div>
  );
}
