import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/musicApi";

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams();

  const {
    data: artistData,
    isFetching: isFetchingArtist,
    error,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtist) return <Loader title="Loading artist details..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.resources} />

      <RelatedSongs
        artistId={artistId}
        data={Object.values(artistData?.resources.songs)}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
