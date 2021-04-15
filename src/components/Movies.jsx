import React, { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";

function Movies() {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState(getMovies());
  const [genres, setGenres] = useState(getGenres());
  const [selectedGenres, setSelectedGenres] = useState();

  const filtered =
    selectedGenres && selectedGenres._id
      ? allMovies.filter((m) => m.genre._id === selectedGenres._id)
      : allMovies;

  const movies = paginate(filtered, currentPage, pageSize);
  function deleteMovie(movie) {
    setAllMovies(allMovies.filter((m) => m._id !== movie._id));
  }

  function handleLike(movie) {
    const newMovies = [...allMovies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...allMovies[index] };
    newMovies[index].liked = !newMovies[index].liked;
    setAllMovies(newMovies);
    console.log(genres);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleGenreSelect(genre) {
    setSelectedGenres(genre);
    setCurrentPage(1);
  }

  useEffect(() => {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    setGenres(genres);
  }, []);

  if (allMovies.length === 0) return <p>There are no movies in the database</p>;

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenres}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <p>Showing {filtered.length} movies in the database</p>
        <MoviesTable
          movies={movies}
          onLike={handleLike}
          onDelete={deleteMovie}
        />
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Movies;
