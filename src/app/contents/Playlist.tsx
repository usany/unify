import { useTheme } from '@/app/context/ThemeContext';

const Playlist = () => {
  const { theme } = useTheme();
  return (
    <div className='flex justify-center'>
      <iframe
        src={'https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator' + `${theme !== 'light' ? '&theme=0' : ''}`}
        width="315px"
        height="152px"
        allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  )
}

export default Playlist