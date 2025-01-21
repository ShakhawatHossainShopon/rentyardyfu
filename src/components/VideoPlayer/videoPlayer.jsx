import { useRef } from "react";
/* 
the component will portray like this
<PopUp isOpen={isModalOpen} onClose={closeModal}>
        <VideoPlayer
          src={video}
          controls
          autoplay={false}
          loop={false}
          muted={false}
/>
*/
export const VideoPlayer = ({
  src,
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  className = "",
}) => {
  const videoRef = useRef(null);

  // Simple validation function
  const isValidBoolean = (value) => typeof value === "boolean";

  return (
    <video
      ref={videoRef}
      src={src}
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
    />
  );
};
