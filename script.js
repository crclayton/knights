/*todo: change banned squares while locked
        colors fade
        Show fork shapes.
        Drag for banned squares.
*/


var live = true;
var global_origin;
var banned = [];
var arr;

var container = document.getElementById("container");


function chess_coord(i, j) {
  return numToSSColumn(+j + 1) + "" + (8 - +i);
}



function numToSSColumn(num) {
  var s = '',
    t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = (num - t) / 26 | 0;
  }
  return s || undefined;
}



function getPossible(i, j, a) {

  var next = [];

  if (a[i + 1] != undefined && (i + 1 >= 0 && j + 2 >= 0) && (i + 1 < 10 && j + 2 < 10)) next.push({
    node: a[i + 1][j + 2],
    x: i + 1,
    y: j + 2
  })
  if (a[i - 1] != undefined && (i - 1 >= 0 && j + 2 >= 0) && (i + 1 < 10 && j + 2 < 10)) next.push({
    node: a[i - 1][j + 2],
    x: i - 1,
    y: j + 2
  })
  if (a[i + 2] != undefined && (i + 2 >= 0 && j + 1 >= 0) && (i + 1 < 10 && j + 2 < 10)) next.push({
    node: a[i + 2][j + 1],
    x: i + 2,
    y: j + 1
  })
  if (a[i - 2] != undefined && (i - 2 >= 0 && j + 1 >= 0) && (i + 1 < 10 && j + 2 < 10)) next.push({
    node: a[i - 2][j + 1],
    x: i - 2,
    y: j + 1
  })
  if (a[i + 1] != undefined && (i + 1 >= 0 && j - 2 >= 0) && (i + 1 < 10 && j + 2 < 10)) next.push({
    node: a[i + 1][j - 2],
    x: i + 1,
    y: j - 2
  })
  if (a[i - 1] != undefined && (i - 1 >= 0 && j - 2 >= 0) && (i + 1 < 10 && j + 2 < 10)) next.push({
    node: a[i - 1][j - 2],
    x: i - 1,
    y: j - 2
  })
  if (a[i + 2] != undefined && (i + 2 >= 0 && j - 1 >= 0) && (i + 1 < 10 && j + 2 < 10)) next.push({
    node: a[i + 2][j - 1],
    x: i + 2,
    y: j - 1
  })
  if (a[i - 2] != undefined && (i - 2 >= 0 && j - 1 >= 0) && (i + 1 < 10 && j + 2 < 10)) next.push({
    node: a[i - 2][j - 1],
    x: i - 2,
    y: j - 1
  })

  var next2 = [];
  for (var n = 0; n < next.length; n++) {
    var coords = [next[n].x, next[n].y];
    if (!isItemInArray(banned, coords)) {
      next2.push(next[n]);
    }
  }

  return next2;
}


function create_paths() {

  var origin, start_x, start_y;
  if (!live) {
    origin = global_origin;
    start_x = origin.getAttribute("x");
    start_y = origin.getAttribute("y");
  }

  if ($("#mv4").is(":checked"))
   for (var row = 0; row < 8; row++)
      for (var column = 0; column < 8; column++) {

        if (live) {
          origin = arr[row][column];
          start_x = row;
          start_y = column;
        }

        var one_move = getPossible(start_x, start_y, arr);
        for (var i = 0; i < one_move.length; i++) {
          var two_move = getPossible(one_move[i].x, one_move[i].y, arr);
          for (var j = 0; j < two_move.length; j++) {
            var three_move = getPossible(two_move[j].x, two_move[j].y, arr);
            for (var k = 0; k < three_move.length; k++){
            	var four_move = getPossible(three_move[k].x, three_move[k].y, arr);
            	for (var nn = 0; nn < four_move.length; nn++)              
           		   set_color(origin, $(four_move[nn].node), "#DFDFDF");
            }
          }
        }
      }


  if ($("#mv3").is(":checked"))
    for (var row = 0; row < 8; row++)
      for (var column = 0; column < 8; column++) {

        if (live) {
          origin = arr[row][column];
          start_x = row;
          start_y = column;
        }

        var one_move = getPossible(start_x, start_y, arr);
        for (var i = 0; i < one_move.length; i++) {
          var two_move = getPossible(one_move[i].x, one_move[i].y, arr);
          for (var j = 0; j < two_move.length; j++) {
            var three_move = getPossible(two_move[j].x, two_move[j].y, arr);
            for (var k = 0; k < three_move.length; k++)
              set_color(origin, $(three_move[k].node), "#EDF7F3");
          }
        }
      }

  if ($("#mv2").is(":checked"))
    for (var row = 0; row < 8; row++)
      for (var column = 0; column < 8; column++) {

        if (live) {
          origin = arr[row][column];
          start_x = row;
          start_y = column;
        }

        var one_move = getPossible(start_x, start_y, arr);
        for (var i = 0; i < one_move.length; i++) {
          var two_move = getPossible(one_move[i].x, one_move[i].y, arr);
          for (var j = 0; j < two_move.length; j++)
            set_color(origin, $(two_move[j].node), "#A3D8BF");
        }
      }

  if ($("#mv1").is(":checked"))
    if (live) {
      for (var row = 0; row < 8; row++)
        for (var column = 0; column < 8; column++) {

          origin = arr[row][column];
          start_x = row;
          start_y = column;

          var one_move = getPossible(start_x, start_y, arr);
          for (var i = 0; i < one_move.length; i++) {
            set_color(origin, $(one_move[i].node), "#327556");
          }
        }
    } else {
      var one_move = getPossible(start_x, start_y, arr);
      for (var i = 0; i < one_move.length; i++) {
        set_color(origin, $(one_move[i].node), "#327556");
      }
    }


  for (var row = 0; row < 8; row++)
    for (var column = 0; column < 8; column++) {

      if (live) {
        origin = arr[row][column];
        start_x = row;
        start_y = column;
      }

      set_color(origin, $(origin), "#597368");
    }

}



function set_color(o, c, color) {


  if (live) {
    $(o).on("mouseover", function() {
      c.css({
        backgroundColor: color
      }, 50);
    });

    $(o).on("mouseleave", function() {
      c.css({
        backgroundColor: "white"
      }, 50);
    });
  } else {
    c.css({
      backgroundColor: color
    }, 50);
  }
}


function isItemInArray(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] == item[0] && array[i][1] == item[1]) {
      return true;
    }
  }
  return false;
}


function removeItemFrom(array, item) {
  var a = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] == item[0] && array[i][1] == item[1]) {

    } else {
      a.push([array[i][0], array[i][1]]);
    }
  }
  return a;
}




function click(e) {

  if (e.which == 1) {
    right(this);
    if (!live) {
      //console.log("putting back to origin");
      //left(origin, false);
      console.log("Banning while locked");


    }

  } else if (e.which == 2 || e.which == undefined) {
    left(this, false);
  }
}

function right(t) {
  var coord = [t.getAttribute("x"), t.getAttribute("y")];

  if (isItemInArray(banned, coord)) {
    banned = removeItemFrom(banned, coord);
  } else {
    banned.push(coord);
  }

  var unavail = "";
 
  if (banned.length != 0) {
    for (var i = 0; i < banned.length; i++) {
      unavail += " " + chess_coord(banned[i][0], banned[i][1]);
    }
    unavail += " "
  } else {
      unavail = "none";
  }


  document.querySelector("#banned").innerText = "Unavailable squares (" + unavail + ")";


  if (!live) {
    apply_banned();
    create_paths();


  } else {
    generate();
  }
}



function left(t, generated) {

  live = !live;

  if (!live) {
    global_origin = t;

    $("#status").text("Fixed origin square ( " + chess_coord(global_origin.getAttribute("x"), global_origin.getAttribute("y")) + " )");
    t.style.border = "1px solid black";

    for (var row = 0; row < 8; row++)
      for (var column = 0; column < 8; column++) {
        $(arr[row][column]).off("mouseover");
        $(arr[row][column]).off("mouseleave");
      }

  } else {
    generate();
    $("#status").text("Fixed origin square (none)");
  }
}


function apply_banned() {
  for (var row = 0; row < 8; row++) {
    for (var column = 0; column < 8; column++) {
      var cell = arr[row][column];
      var b = [row, column];

      if (live)
        $(cell).mousedown(click);

      if (isItemInArray(banned, [cell.getAttribute("x"), cell.getAttribute("y")])) {
        cell.style.border = "1px solid red";
      } else {
        cell.style.border = "1px solid white";
      }
    }
  }
}


function make_rows(rows, cols) {
  container.innerHTML = "";
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);

  arr = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];


  for (var row = 0; row < 8; row++) {
    for (var column = 0; column < 8; column++) {
      var cell = document.createElement("div");
      container.appendChild(cell).className = "grid-item square";

      if (row == 0) {
        var d = document.createElement("div");
        d.innerText = numToSSColumn(column + 1);
        d.className = "d";
        cell.appendChild(d);
      }

      if (column == 0) {
        var b = document.createElement("div");
        b.innerText = 8 - (row);
        b.className = "b";
        cell.appendChild(b);
      }


      cell.setAttribute("x", row);
      cell.setAttribute("y", column);

      arr[row][column] = cell;

    }
  }
}


function generate() {
  make_rows(8, 8);
  apply_banned();
  create_paths();
}


generate();

$("#mv1, #mv2, #mv3, #mv4").on("click", function() {
  generate();
});
