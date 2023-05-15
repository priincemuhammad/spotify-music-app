import React from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/musicApi";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  console.log(data);

  if (isFetching) return <Loader title="Loading Top Charts..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-between gap-8">
        {data?.tracks.map((song, i) => (
          <SongCard
            i={i}
            key={song.key}
            song={song}
            data={data}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
