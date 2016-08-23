/*
  testing.js
  run this file to make sure it all works, I guess.
*/

var dex = require('./godex'),
  details = false; // change to true to print data

// Some Helper Functions

function note(message, data) {
  if (data && details) console.log("GoDEX:", message, data);
  else console.log("GoDEX:", message);
}

function space(num) {
  for (var x = 0; x < num;x++) {
    console.log(""); // for pretty printing in console.
  }
}

function check(thing) {
  if (Array.isArray(thing)) {
    return (thing.length > 0) ? "SUCCESS" : "ERROR!";
  } else {
    return thing ? "SUCCESS" : "ERROR!";
  }
}

// AND NOW WE TEST
space(1);
note("------------TESTING DATA------------");
space(1);

var pokemon = dex.list(true);
note("# OF POKEMON: " + pokemon.length, pokemon);

var types = dex.listTypes(true);
note("# OF POKEMON TYPES: " + types.length, types);

var moves = dex.listMoves(true);
note("# OF POKEMON MOVES: " + moves.length, moves);

space(2);
note("---------VERIFYING: METHODS---------");
space(1);

var i, methodData;

note("VERIFYING: dex.get()");
for (i in pokemon) {
  methodData = dex.get(i);
}
note("CHECKING: dex.get('Bulbasaur')");
methodData = dex.get('Bulbasaur');
note("METHOD: dex.get('Bulbasaur'): " + check(methodData), methodData);


note("VERIFYING: dex.getType()");
for (i in types) {
  methodData = dex.getType(i);
}
note("CHECKING: dex.getType('Bug')");
methodData = dex.getType('Bug');
note("METHOD: dex.getType('Bug'): " + check(methodData), methodData);


note("VERIFYING: dex.getMove()");
for (i in moves) {
  methodData = dex.getMove(i);
}
note("CHECKING: dex.getMove('Twister')");
methodData = dex.getMove('Twister');
note("METHOD: dex.getMove('Twister'): " + check(methodData), methodData);


note("VERIFYING: dex.byType()");
for (i in types) {
  methodData = dex.byType(i);
}
note("CHECKING: dex.byType('Bug')");
methodData = dex.byType('Bug');
note("METHOD: dex.byType('Bug'): " + check(methodData), methodData);

space(2);
note("---------VERIFYING: POKEMON---------");
space(1);

var vPoke = 0, uPoke = 0, // counting
  ePoke = {}; // error collection

for (var _p in pokemon) {
  var isGood = true,
    key = pokemon[_p].key,
    poke = dex.get(key);

  if (!poke) {
    if (!ePoke[key]) ePoke[key] = [];
    ePoke[key].push(key + " CRITICAL ERROR, NO DATA FOUND.");
    isGood = false;
  } else {
    // test types
    for (var _t in poke.types) {
      var type = dex.getType(poke.types[_t]);
      if (!type) {
        if (!ePoke[key]) ePoke[key] = [];
        ePoke[key].push(poke.name + " Type Error: " + poke.types[_t]);
        isGood = false;
      }
    }
    // test quick moves
    for (var _q in poke.quickMoves) {
      var quick = dex.getMove(poke.quickMoves[_q]);
      if (!quick) {
        if (!ePoke[key]) ePoke[key] = [];
        ePoke[key].push(poke.name + " Quick Move Error: " + poke.quickMoves[_q]);
        isGood = false;
      }
    }
    // test charge moves
    for (var _c in poke.chargeMoves) {
      var charge = dex.getMove(poke.chargeMoves[_c]);
      if (!charge) {
        if (!ePoke[key]) ePoke[key] = [];
        ePoke[key].push(poke.name + " Charge Move Error: " + poke.chargeMoves[_c]);
        isGood = false;
      }
    }
  }

  if (!isGood) {
    uPoke += 1;
  } else {
    vPoke += 1;
  }
}

note("POKEMON VERIFIED: " + vPoke + ", ERROR: " + uPoke);
if (uPoke > 1 || ePoke.length) {
  for (var mon in ePoke) {
    for (var err in ePoke[mon]) {
      note(ePoke[mon][err]);
    }
  }
}

space(2);
note("------------DONE-CHECKING-----------");
space(1);
