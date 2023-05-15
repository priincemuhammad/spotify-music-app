import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/artists/${track?.artists?.[0]?.adamid}`)}
      className="felx flex-col p-4 w-[250px] bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >
      <img src={track?.images.coverart} alt="Artist" />
      <p className="mt-4 text-white text-lg font-semibold truncate">
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
