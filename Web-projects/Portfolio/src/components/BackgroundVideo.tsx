import '../styles/BackgroundVideo.css';

const BackgroundVideo = () => {
  return (
    <div className="video-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background__video"
      >
        <source src="/videos/BackgroundVideo.mp4" type="video/mp4" />
      </video>
      <div className="video-background__overlay" />
    </div>
  )
}

export default BackgroundVideo