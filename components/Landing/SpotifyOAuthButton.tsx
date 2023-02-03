import Link from 'next/link';
import Button from '../Button';
import { BsSpotify } from 'react-icons/bs';

function SpotifyOAuthButton() {
  const ENDPOINT = 'https://accounts.spotify.com/authorize';
  const SCOPES = [
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public',
    'user-read-private',
    'user-top-read',
    'user-read-email',
  ];
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  let SCOPE_PARAM = SCOPES.join('%20');
  const LOGIN_LINK = `${ENDPOINT}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${SCOPE_PARAM}&response_type=code&show_dialog=true`;
  return (
    <Link
      href={LOGIN_LINK}
      className='mx-auto w-full max-w-xs md:max-w-[21rem]  '>
      <button className='rounded-full py-3 flex items-center justify-center bg-accent-500 text-xl md:text-2xl w-full font-bold  hover:brightness-105 active:brightness-95'>
        <BsSpotify className='mr-2 text-white' />
        <span className='text-white'>LOGIN</span>
      </button>
    </Link>
  );
}

export default SpotifyOAuthButton;
