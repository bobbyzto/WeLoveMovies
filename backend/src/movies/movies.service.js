const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listMoviesInTheaters() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .where({ is_showing: true })
    .groupBy("m.movie_id");
}

function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first();
}

function readTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .where({ "m.movie_id": movieId })
    .select("*");
}

function getCritic(criticId) {
  return knex("critics as c").where({ "c.critic_id": criticId }).first();
}

function readReview(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({ "r.movie_id": movieId });
}

module.exports = {
  list,
  listMoviesInTheaters,
  read,
  readTheaters,
  readReview,
  getCritic,
};
