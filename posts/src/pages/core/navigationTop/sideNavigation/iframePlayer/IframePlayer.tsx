const IframePlayer = ({ mode }) => {
  return (
    <div className="absolute flex justify-center bottom-0">
      <iframe
        src={`https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator${mode === 'dark' && '&theme=0'}`}
        width="90%"
        height="200"
        allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  )
}

export default IframePlayer
