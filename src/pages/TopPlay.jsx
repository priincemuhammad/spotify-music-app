import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PlayPause from "../components/PlayPauseCard";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/musicApi";
import "swiper/css";
import "swiper/css/free-mode";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useRef, useEffect } from "react";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
  data,
}) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#158b68be] py-2 p-1 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          src={song?.images?.coverart}
          alt={song?.title}
          className="w-[50px] h-[50px] rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className="text-base font-bold text-gray-300 mt-1">
              {song?.subtitle}
            </p>
          </Link>
        </div>
      </div>

      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePause}
        handlePlay={() => {
          handlePlay(song, i, data);
        }}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery(10);

  if (isFetching) return <Loader title="Loading Top charts..." />;
  if (error) return <Error />;

  const topPlays = data?.tracks?.slice(0, 5);

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handlePlay = (song, i, data) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl ">Top Charts</h2>
          <Link to={"/top-charts"}>
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePause}
              handlePlay={handlePlay}
              data={data.tracks}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="w-full flex flex-col mt-5">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to={"/top-artists"}>
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-2"
          >
            {topPlays?.map((song, i) => (
              <SwiperSlide
                key={song.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img
                    src={song?.images?.background}
                    alt="name"
                    className="rounded-full w-[100%] object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default TopPlay;
