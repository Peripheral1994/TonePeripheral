$(document).ready(function(){
  $('#chordForm').on('submit', function(e){
    //The index of the note is useful for the chord math.
    var noteArray = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
    //mp3Array provides the names of the mp3 files in the same index as the noteArray counterpart.
    var mp3Array = ['A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5'];
    //NOTE: Change e.target... to something more direct (same at 2nd-to-last line of code in this function)!
    var note = e.target[7].value;
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
      if (chord === 'dominant_7th'){
        notes.push(notes[2] + 3);
      }
      if (chord === 'major_7th'){
        notes.push(notes[2] + 4);
      }
      if (chord === 'major' || chord === 'minor' || chord === 'augmented' || chord === 'diminished'){
        var $chordSet = $('<div id=' + 'chordSet' + chord + '><div>The ' + chord + ' chord is: ' + noteArray[notes[0]] + ' ' + noteArray[notes[1]] + ' ' + noteArray[notes[2]] + '</div><form><input type="submit" value="Play Chord"></form></div>');
        $('.chords').append($chordSet);
      } else {
        var $chordSet = $('<div id=' + 'chordSet' + chord + '><div>The ' + chord + ' chord is: ' + noteArray[notes[0]] + ' ' + noteArray[notes[1]] + ' ' + noteArray[notes[2]] + ' ' + noteArray[notes[3]] + '</div><form><input type="submit" value="Play Chord"></form></div>');
        $('.chords').append($chordSet);
      }
      $('#chordSet' + chord).on('submit', function(){
        new Audio('app/notes/' + mp3Array[notes[0]] + '.mp3').play();
        new Audio('app/notes/' + mp3Array[notes[1]] + '.mp3').play();
        new Audio('app/notes/' + mp3Array[notes[2]] + '.mp3').play();
        if (chord === 'dominant_7th' || chord === 'major_7th'){
          new Audio('app/notes/' + mp3Array[notes[3]] + '.mp3').play();
        }
        return false;
      });
    };
    
    var chordNodes = $('#checkArray :checkbox:checked');
    if (chordNodes.length === 0){
      alert('Please choose the chords you would like to see!');
      return false;
    }
    for (var i = 0; i < chordNodes.length; i++){
      chordMaker(valArray, chordNodes[i].value);
    }

    e.target[7].value = '';
    return false;
  });
});
