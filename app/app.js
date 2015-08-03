$(document).ready(function(){
  $('#chordForm').on('submit', function(e){
    //The index of the note is useful for the chord math.
    var noteArray = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    var note = e.target[0].value;
    var noteValue;
    var valArray = [];
    //Check if the note is flat (2nd character is 'b'). If so, convert to sharp or other equivalent.
    if (note[1] === 'b'){
      noteValue = _.indexOf(noteArray, note[0]) - 1;
      if (noteValue === -2){
        alert('That\'s not a musical note!');
        return false;
      }
      else if (noteValue === -1){
        noteValue = 11;
      }
    }
    //Check if the submitted note is legal.
    if (noteValue === undefined){
      noteValue = _.indexOf(noteArray, note);
      if (noteValue === -1){
        alert('That\'s not a musical note!');
        return false;
      }
    }

    //Calculate the major chord (increment 4 steps in array, then 3, subtract 12 if over 11).
    valArray[0] = noteValue;
    valArray[1] = noteValue + 4;
    valArray[2] = noteValue + 7;
    for (var i = 1; i <= 2; i++){
      if (valArray[i] > 11){
        valArray[i] -= 12;
      }
    }
    $('.chords').html('');
    $('.chords').append('<div>The major chord is: ' + noteArray[valArray[0]] + ' ' + noteArray[valArray[1]] + ' ' + noteArray[valArray[2]] + '</div>');
    //The minor chord is identical to the major chord, just subtract 1 from the middle item.
    if (valArray[1] === 0){
      valArray[1] = 12;
    }
    $('.chords').append('<div>The minor chord is: ' + noteArray[valArray[0]] + ' ' + noteArray[valArray[1] - 1] + ' ' + noteArray[valArray[2]] + '</div>');

    e.target[0].value = '';
    return false;
  });
});
