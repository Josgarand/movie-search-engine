import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { MovieCard } from "@/widgets/cards";

export function Movies() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("popular"); // por defecto cartelera
  const [search, setSearch] = useState(""); // NUEVO: estado de búsqueda
  const [isSearching, setIsSearching] = useState(false); // NUEVO: controla si estamos en modo búsqueda

  // PETICIONES DE FILTRO (popular, now_playing, etc.)
  useEffect(() => {
    if (isSearching) return; // si estoy buscando, no llamo a los filtros

    fetch(
      `https://api.themoviedb.org/3/movie/${filter}?api_key=ffa3a8b6f577c6aefd2d2a8540752b2d&language=es-ES`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [filter, isSearching]);

  // FUNCIÓN DE BÚSQUEDA
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setIsSearching(false); // si no hay texto, vuelvo a filtros normales
      return;
    }

    setIsSearching(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ffa3a8b6f577c6aefd2d2a8540752b2d&language=es-ES&query=${encodeURIComponent(
        search
      )}&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.error("Error searching movies:", error));
  };

  return (
    <div className="p-6">
      {/* SEARCHBAR */}
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // controla el input
            className="block w-full p-4 ps-12 text-lg text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-black focus:border-black"
            placeholder="Search movies..."
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-6 h-6 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-black hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2"
          >
            Search
          </button>
        </form>
      </div>

      {/* BOTONES DE FILTRO (solo activos si NO estoy buscando) */}
      
      {!isSearching && (
        <div className="flex flex-wrap gap-4 mb-8 justify-center">

        <Button
            onClick={() => setFilter("popular")}
            className={`px-6 py-2 rounded-lg ${
              filter === "popular"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Populares
          </Button>

          <Button
            onClick={() => setFilter("now_playing")}
            className={`px-6 py-2 rounded-lg ${
              filter === "now_playing"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            En cartelera
          </Button>
          
          <Button
            onClick={() => setFilter("upcoming")}
            className={`px-6 py-2 rounded-lg ${
              filter === "upcoming"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Próximos estrenos
          </Button>
          <Button
            onClick={() => setFilter("top_rated")}
            className={`px-6 py-2 rounded-lg ${
              filter === "top_rated"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Mejor valoradas
          </Button>
        </div>
      )}

      {/* GRID DE PELÍCULAS */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            poster_path={m.poster_path}
            title={m.title}
            vote_average={m.vote_average}
            release_date={m.release_date}
            overview={m.overview}
          />
        ))}
      </div>
    </div>
  );
}

export default Movies;













{/*       
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["companies", "members", "budget", "completion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div> */}