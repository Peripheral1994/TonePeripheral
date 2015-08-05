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

    //Clear out the chords and progressions.
    $('.chords').html('');
    $('.progressions').html('');
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
      //Set up the listener to the button, to play all the notes needed to play the chord.
      $('#chordSet' + chord).on('submit', function(){
        //This each function currently does not work - here for future development.
        $('audio').each(function(){
          this.pause();
        });
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

    //Generate the default progressions here!
    var audioPlayer = function(noteOne, noteTwo, noteThree){
      new Audio('app/notes/' + mp3Array[noteOne] + '.mp3').play();
      new Audio('app/notes/' + mp3Array[noteTwo] + '.mp3').play();
      new Audio('app/notes/' + mp3Array[noteThree] + '.mp3').play();
    }
    var progressionArray = [['1451', 'I-IV-V-I'], ['1251', 'I-ii-V-I'], ['1645', 'I-vi-IV-V'], ['1625', 'I-vi-ii-V'], ['1465', 'I-IV-vi-V'], ['1564', 'I-V-vi-IV'], ['1563', 'I-V-vi-iii']];
    var progressionMaker = function(prog, notes){
      var notes = Array.prototype.slice.call(notes);
      var notesStorage = Array.prototype.slice.call(notes);
      $('.progressions').append('<div id=' + prog[0] + '><form>Click to play the ' + prog[1] + ' progression!<input type="submit" value="Play Progression"></form></div>');

      $('#' + prog[0]).on('submit', function(){
        audioPlayer(notes[0], notes[1], notes[2]);

        var con = this;
        setTimeout(function(con){
          //First point will always be 'I', no need to check initial condition as this time.
          if (prog[0][1] === '2'){
            notes[0] += 2;
            notes[1] += 1;
            notes[2] += 2;
          }
          else if (prog[0][1] === '4'){
            notes[0] += 5;
            notes[1] += 5;
            notes[2] += 5;
          }
          else if (prog[0][1] === '5'){
            notes[0] += 7;
            notes[1] += 7;
            notes[2] += 7;
          }
          else if (prog[0][1] === '6'){
            notes[0] += 9;
            notes[1] += 8;
            notes[2] += 9;
          }
          audioPlayer(notes[0], notes[1], notes[2]);
        }, 2000);
        setTimeout(function(con){
          if (prog[0][1] === '2'){
            //Only current possible transition is from 2->5, skipping if check.
            notes[0] += 5;
            notes[1] += 6;
            notes[2] += 5;
          }
          else if (prog[0][1] === '4'){
            if (prog[0][2] === '5'){
              notes[0] += 2;
              notes[1] += 2;
              notes[2] += 2;
            } else {
              //Else, the next progression is 6.
              notes[0] += 4;
              notes[1] += 3;
              notes[2] += 4;
            }
          }
          else if (prog[0][1] === '5'){
            //5 only goes to 6 at this step.
            notes[0] += 2;
            notes[1] += 1;
            notes[2] += 2;
          }
          else if (prog[0][1] === '6'){
            if (prog[0][2] === '2'){
              notes[0] -= 7;
              notes[1] -= 7;
              notes[2] -= 7;
            } else {
              //Otherwise, 6 goes to 4 at this step.
              notes[0] -= 2;
              notes[1] -= 1;
              notes[2] -= 2;
            }
          }
          audioPlayer(notes[0], notes[1], notes[2]);
        }, 4000);
        setTimeout(function(con){
          if (prog[0][2] === '2'){
            //Only possible step is to 5 at this step.
            notes[0] += 5;
            notes[1] += 6;
            notes[2] += 5;
          }
          else if (prog[0][2] === '4'){
            //Only possible step is to 5 at this step.
            notes[0] += 2;
            notes[1] += 2;
            notes[2] += 2;
          }
          else if (prog[0][2] === '5'){
            //Only possible step is to 1 at this step.
            notes[0] -= 7;
            notes[1] -= 7;
            notes[2] -= 7;
          }
          else if (prog[0][2] === '6'){
            if (prog[0][3] === '3'){
              notes[0] -= 5;
              notes[1] -= 5;
              notes[2] -= 5;
            }
            else if (prog[0][3] === '4'){
              notes[0] -= 4;
              notes[1] -= 3;
              notes[2] -= 4;
            } else {
              //Otherwise, 6 goes to 5.
              notes[0] -= 2;
              notes[1] -= 1;
              notes[2] -= 2;
            }
          }
          audioPlayer(notes[0], notes[1], notes[2]);
        }, 6000);

        notes = Array.prototype.slice.call(notesStorage);
        return false;
      });
    };

    for (var i = 0; i < progressionArray.length; i++){
      progressionMaker(progressionArray[i], valArray);
    }

    e.target[7].value = '';
    return false;
  });
});
