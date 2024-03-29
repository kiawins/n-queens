// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var queens = 0;
      _.each(this.rows()[rowIndex], function(element, index){
        if (element === 1){
          queens++;
        }
      });
      if (queens > 1){
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var hasConflict = false;

      _.each(this.rows(), function(element, index){
        if (this.hasRowConflictAt(index)){
          hasConflict = true;
        }
      }.bind(this));
      return hasConflict;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var queens = 0;
      _.each(this.rows(), function(element, index){
        if (element[colIndex] === 1){
          queens++;
        }
      })
      if (queens > 1){
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var hasConflict = false;

      _.each(this.rows(), function(element, index){
        if (this.hasColConflictAt(index)){
          hasConflict = true;
        }
      }.bind(this));
      return hasConflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var queens = 0;
      var x = 0;
      var n = this.rows().length;


      for (var y = majorDiagonalColumnIndexAtFirstRow; y < n; y++) {
        if (this.rows[x][y] && this.rows[x][y] === 1) {
          queens++;
        }
        if (y >= 0){
          x++;
        }
      }

      if (queens > 1) {
        return true;
      } else {
        return false;
      }
    return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // var n = this.rows().length;
      // // var hasConflict = false;
      // // //loop from (-this.rows.length+1) to (this.rows.length -1)
      // // _.each(this.rows[0], function(element, index) {
      // //   if (this.hasMajorDiagonalConflictAt(index)) {
      // //     hasConflict = true;
      // //   }
      // // })
      // // var copy = [];
      // // for (var i = 0; i < this.rows.length; i++) {
      // //   copy[i] = this.rows[i];
      // // }

      // // while (copy.length > 0) {
      // //   if (this.hasMajorDiagonalConflictAt.call(copy, 0)){
      // //     hasConflict = true;
      // //   }
      // //   copy.shift();
      // // }
      // var hasConflict = false;
      // for (var i = 0; i < n; i ++){
      //   if (this.hasMajorDiagonalConflictAt(i)){
      //     hasConflict = true;
      //   }
      // }
      // // _.each(this.rows(), function(element, index){
      // //   if (this.hasMajorDiagonalConflictAt(index)){
      // //     hasConflict = true;
      // //   }
      // // }.bind(this));
        
      // return hasConflict;
      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var queens = 0;
      var x = 0;
      var n = this.length;


      for (var y = minorDiagonalColumnIndexAtFirstRow; y >= minorDiagonalColumnIndexAtFirstRow - n + 1; y--) {
        if (this[x][y] === 1) {
          queens++;
        }
        x++;
      }

      if (queens > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var hasConflict = false;

      _.each(this[0], function(element, index) {
        if (this.hasMinorDiagonalConflictAt(index)) {
          hasConflict = true;
        }
      })

      var copy = [];
      for (var i = 0; i < this.length; i++) {
        copy[i] = this[i];
      }

      while (copy.length > 0) {
        if (this.hasMinorDiagonalConflictAt.call(copy, arr.length - 1)){
          hasConflict = true;
          return hasConflict;
        }
        copy.shift();
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
