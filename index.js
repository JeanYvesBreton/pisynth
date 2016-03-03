var flock = require("flocking"),
    enviro = flock.init();

var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events 
keypress(process.stdin);

var s = flock.synth({
    synthDef: {
        ugen: "flock.ugen.sin",
        freq: {
            id: "main_freq",
            ugen: "flock.ugen.lfNoise",
            freq: 2,
            mul: 180,
            add: 180
        },
        mul: {
            ugen: "flock.ugen.envGen",
            envelope: {
                type: "flock.envelope.sin",
                duration: 0.5
            },
            gate: {
                ugen: "flock.ugen.lfPulse",
                width: 0.5,
                freq: 1
            }
        }
    },
    addToEnvironment: false
});

enviro.play();
s.play();

// listen for the "keypress" event 
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    s.pause();
    process.stdin.pause();
  }
  if (key && key.name == 'q') {
    s.set("main_freq.freq", 1);
  }
  if (key && key.name == 'w') {
    s.set("main_freq.freq", 2);
  }
});
 
process.stdin.setRawMode(true);
process.stdin.resume();
