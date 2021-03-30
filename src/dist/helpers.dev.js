"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatPrice = formatPrice;
exports.rando = rando;
exports.slugify = slugify;
exports.getFunName = getFunName;

function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}

function getFunName() {
  var adjectives = ["adorable", "beautiful", "clean", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "ugliest", "unsightly", "angry", "bewildered", "clumsy", "defeated", "embarrassed", "fierce", "grumpy", "helpless", "itchy", "jealous", "lazy", "mysterious", "nervous", "obnoxious", "panicky", "repulsive", "scary", "thoughtless", "uptight", "worried"];
  var nouns = ["women", "men", "children", "teeth", "feet", "people", "leaves", "mice", "geese", "halves", "knives", "wives", "lives", "elves", "loaves", "potatoes", "tomatoes", "cacti", "foci", "fungi", "nuclei", "syllabuses", "analyses", "diagnoses", "oases", "theses", "crises", "phenomena", "criteria", "data"];
  return "".concat(rando(adjectives), "-").concat(rando(adjectives), "-").concat(rando(nouns));
}