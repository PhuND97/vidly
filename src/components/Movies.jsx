import React, { useEffect, useState } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";

function Movies() {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const [totalCount, setTotalCount] = useState(0);
  const [movies, setMovies] = useState([]);

  async function handleDelete(movie) {
    const originalMovies = [...movies];
    setAllMovies(allMovies.filter((m) => m._id !== movie._id));
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      setMovies(originalMovies);
    }
  }

  function handleLike(movie) {
    const newMovies = [...allMovies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...allMovies[index] };
    newMovies[index].liked = !newMovies[index].liked;
    setAllMovies(newMovies);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleGenreSelect(genre) {
    setSelectedGenres(genre);
    setCurrentPage(1);
    setSearchQuery("");
  }

  function handleSearch(query) {
    setSearchQuery(query);
    setSelectedGenres(null);
    setCurrentPage(1);
  }

  function handleSort(path) {
    if (sortColumn.path === path) {
      setSortColumn({
        path: path,
        order: sortColumn.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortColumn({
        path: path,
        order: "asc",
      });
    }
  }

  useEffect(async () => {
    console.log(1);
    const { data } = await getGenres();
    const { data: moviesFromService } = await getMovies();

    const genres = [{ _id: "", name: "All Genres" }, ...data];
    setGenres(genres);
    setAllMovies(moviesFromService);
    if (getPagedData.totalCount === 0)
      return <p>There are no movies in the database</p>;

    setTotalCount(getPagedData().totalCount);
    setMovies(getPagedData().data);
  }, []);

  useEffect(() => {
    if (getPagedData.totalCount === 0)
      return <p>There are no movies in the database</p>;

    setTotalCount(getPagedData().totalCount);
    setMovies(getPagedData().data);
  }, [
    currentPage,
    searchQuery,
    totalCount,
    allMovies,
    sortColumn,
    selectedGenres,
  ]);

  function getPagedData() {
    let filtered = [...allMovies];
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenres && selectedGenres._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenres._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered?.length, data: movies };
  }

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
        <Link
          to="/movies/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Movie
        </Link>
        <p>Showing {totalCount} movies in the database</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MoviesTable
          movies={movies}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Movies;
