import { useTheme } from '@/app/context/ThemeContext';

const Playlist = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`fixed bottom-0 left-0 z-[120] flex justify-start transition-all opacity-100 pointer-events-auto duration-250'
        }`}
    >
      <div className="flex w-[350px] justify-center">
        <iframe
          src={'https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator' + `${theme !== 'light' ? '&theme=0' : ''}`}
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