import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
  artistId,
}) => {
  console.log(data);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={i}
            artistId={artistId}
            song={song}
            i={i}
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
