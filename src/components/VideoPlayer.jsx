const VideoPlayer = ({
  src,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = true,
  className = "",
}) => {
  if (!src) return null;

  return (
    <div className="relative w-full aspect-[9/16] max-h-[80vh] bg-black rounded-lg overflow-hidden mt-2">
      <video
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        className={`absolute inset-0 w-full h-full object-contain ${className}`}
      />
    </div>
  );
};

export default VideoPlayer;
