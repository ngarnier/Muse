
function req (name) {
  return require ('./lib/' + name);
}

module.exports = {
  req('complement'),
  req('defn'),
  req('inc'),
  req('partial'),
}

console.log(module.exports);
