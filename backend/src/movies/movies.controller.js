const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// GET /movies /movies?is_showing=true
async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing)
    return res.json({ data: await service.listMoviesInTheaters() });
  res.json({ data: await service.list() });
}

// search db for movie
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  // incorrect movieId error
  next({ status: 404, message: "Movie cannot be found." });
}

// GET /movies/:movieId
function read(req, res) {
  res.json({ data: res.locals.movie });
}

// GET /movies/:movieId/theaters
async function readTheaters(req, res) {
  const movieId = res.locals.movie.movie_id;
  const data = await service.readTheaters(movieId);
  res.json({ data });
}

// GET /movies/:movieId/reviews
async function readReview(req, res) {
  const movieId = res.locals.movie.movie_id;
  const data = await service.readReview(movieId);
  const nestedData = await Promise.all(
    data.map(async (review) => {
      const critic = await service.getCritic(review.critic_id);
      review.critic = critic;
      return review;
    })
  );
  res.json({ data: nestedData });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  readTheaters: [asyncErrorBoundary(movieExists), readTheaters],
  readReview: [asyncErrorBoundary(movieExists), readReview]
};
