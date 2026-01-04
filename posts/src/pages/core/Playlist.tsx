import useSelectors from 'src/hooks/useSelectors';

interface Props {
  open: boolean
}
const Playlist = ({open}: Props) => {
  const theme = useSelectors((state) => state.theme.value);
  return (
    <div
      className={`fixed bottom-0 left-0 z-[120] flex justify-start transition-all ${
        open ? 'opacity-100 pointer-events-auto duration-250' : 'opacity-0 pointer-events-none duration-0'
      }`}
    >
      <div className="flex w-[350px] justify-center">
      <iframe
        src={import.meta.env.VITE_SPOTIFY_URL+`${theme !== 'light' ? '&theme=0' : ''}`}
        width="90%"
        height="200"
        allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
        loading="lazy"
      />
      </div>
    </div>
  )
}

export default Playlist
