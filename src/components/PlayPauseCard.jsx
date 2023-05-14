import { HiPause, HiPlay } from "react-icons/hi";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <HiPause size={50} className="text-gray-300" onClick={handlePause} />
  ) : (
    <HiPlay size={50} className="text-gray-300" onClick={handlePlay} />
  );

export default PlayPause;
