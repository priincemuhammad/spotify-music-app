import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, RelatedSongs, Error, Loader } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
} from "../redux/services/musicApi";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { data: songData, isFetching, error } = useGetSongDetailsQuery(songid);

  const { data: relatedData, isFetching: isFetchingRelated } =
    useGetRelatedSongsQuery(songid);

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching || isFetchingRelated)
    return <Loader title="Fetching song details..." />;

  if (error) return <Error />;

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handlePlay = (i, data, song) => {
    dispatch(setActiveSong({ i, data, song }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData.sections[1].text.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, lyrics aren't available for this song
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        handlePlay={handlePlay}
        handlePause={handlePause}
        isPlaying={isPlaying}
        activeSong={activeSong}
        data={Object.values(relatedData?.resources["shazam-songs"])}
      />
    </div>
  );
};

export default SongDetails;
