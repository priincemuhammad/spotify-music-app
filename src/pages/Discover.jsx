import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/musicApi";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetTopChartsQuery(20);

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  if (isFetching) {
    return <Loader title={"Loading songs..."} />;
  } else if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col text-white">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h1 className="font-bold text-3xl text-left">
          Discover {genreTitle || "POP"}
        </h1>
        <select
          className="bg-black outline-none border-none p-3 rounded-lg text-gray-300 sm:mt-0 mt-5 cursor-pointer"
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "POP"}
        >
          {genres?.map((lists, index) => (
            <option
              key={index}
              value={lists.value}
              className="bg-black cursor-pointer"
            >
              {lists.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-between justify-center gap-8">
        {data?.tracks.map((song, i) => (
          <SongCard
            key={song.key}
            i={i}
            data={data}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
