$(document).ready(function(){
  $('#chordForm').on('submit', function(e){
    //The index of the note is useful for the chord math.
    var noteArray = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
    var note = e.target[0].value;
    var noteValue;
    var valArray = [];
    //Check if the note is flat (2nd character is 'b'). If so, convert to sharp or other equivalent.
    if (note[1] === '#'){
      noteValue = _.indexOf(noteArray, note[0]) + 1;
      if (noteValue === 0){
        alert('That\'s not a musical note! Please make sure your note is uppercase, and that you have used only one sharp or flat symbol.');
        return false;
      }
    }
    if (note === 'Cb'){
      noteValue = 2;
    }
    else if (note === 'Fb'){
      noteValue = 7;
    }
    //Check if the submitted note is legal.
    if (noteValue === undefined){
      noteValue = _.indexOf(noteArray, note);
      if (noteValue === -1){
        alert('That\'s not a musical note! Please make sure your note is uppercase, and that you have used only one sharp or flat symbol.');
        return false;
      }
    }

    //Calculate the major chord (increment 4 steps in array, then 3, subtract 12 if over 11).
    valArray[0] = noteValue;
    valArray[1] = noteValue + 4;
    valArray[2] = noteValue + 7;

    $('.chords').html('');
    //Allowing defined chords for future capability to select which chords are desired.
    var chordMaker = function(notes, chord){
      var notes = Array.prototype.slice.call(notes);
      if (chord === 'minor' || chord === 'diminished'){
        notes[1] -= 1;
        if (chord === 'diminished'){
          notes[2] -=1;
        }
      }
      if (chord === 'augmented'){
        notes[2] += 1;
      }
      if (chord === 'dominant 7th'){
        modifier = notes[2] + 3;
      }
      if (chord === 'major 7th'){
        modifier = notes[2] + 4;
      }
      if (chord === 'major' || chord === 'minor' || chord === 'augmented' || chord === 'diminished'){
        $('.chords').append('<div>The ' + chord + ' chord is: ' + noteArray[notes[0]] + ' ' + noteArray[notes[1]] + ' ' + noteArray[notes[2]] + '</div>');
      } else {
        $('.chords').append('<div>The ' + chord + ' chord is: ' + noteArray[notes[0]] + ' ' + noteArray[notes[1]] + ' ' + noteArray[notes[2]] + ' ' + noteArray[modifier] + '</div>');
      }
    };
    chordMaker(valArray, 'major');
    chordMaker(valArray, 'minor');
    chordMaker(valArray, 'augmented');
    chordMaker(valArray, 'diminished')
    chordMaker(valArray, 'dominant 7th');
    chordMaker(valArray, 'major 7th');

    e.target[0].value = '';
    return false;
  });
});
