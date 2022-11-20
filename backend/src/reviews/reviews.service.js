const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function update(updatedReview) {
  return knex("reviews as r")
    .select("*")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview, "*")
    .then(updatedRecord => updatedRecord[0]);
}

function getCritic(criticId) {
  return knex("critics as c").select("*").where({ "c.critic_id": criticId }).first();
}

module.exports = {
  destroy,
  read,
  update,
  getCritic,
};
