import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/musicApi";

const CountryTracks = () => {
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(countryCode);

  console.log(data);

  useEffect(() => {
    // my apikey = at_0HUOauUSQNKKIGv5U6LgRVaL5LIdj
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_UtiCVbWclQUewqvJEvYT5uvBR2Bbl`
      )
      .then((res) => setCountryCode(res?.data.location.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [countryCode]);

  if (loading || isFetching) return <Loader title="Loading Around you..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you {countryCode}
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-between gap-8">
        {data?.map((song, i) => (
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

export default CountryTracks;
