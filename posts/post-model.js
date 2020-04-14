const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db("posts");
}

function findBy(filter) {
  return db("posts").where(filter);
}

async function add(post) {
  const [id] = await db("posts").insert(post, "id");

  return findById(id);
}

function findById(id) {
  return db("posts").where("id", id).first();
}

function update(id, changes) {
  return db("posts")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? this.findById(id) : null));
}

function remove(id) {
  return db("posts").where({ id }).del();
}
