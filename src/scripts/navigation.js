$(document).ready(function(){
  getData();
});

var navItem = function(node, label, primary/*, secondary, content*/){
  this.node = node;
  this.label = label;
  this.primary = '<li><a href="#">' + label + '</a></li>'
};

var navItemsArray = [];


function getData(){
  (function() {
    $.getJSON("navigation.json", function(data) {
      getAllNodes(data);
    }).done(function() {
      console.log(navItemsArray);
    });
  })();
};


function getAllNodes(data){
  $.each(data.navigation, function(i, node){
    getNode(node);
  });
};

path = [];
function getNode(data){
  var currentNode;
  path.push(data.name);
  $.each(data.settings, function(i, node){
    console.log(node.name, path);
    //var temp = navItem(node.name, node.name, path);
    //navItemsArray.push(temp);
    getNode(node);
  });
  $.each(data.directions, function(i, node){
    console.log(node.name, path);
    //var temp = navItem(node.name, node.name, path);
    //navItemsArray.push(temp);
    getNode(node);
  });
  path.pop();
};


/*
function getSettings(data){
  $.each(data.settings, function(i, node){
    if ( node.settings.length > 0 ) {
      getSettings(node);
    }
    if ( node.directions.length > 0 ) {
      getDirections(node);
    }
  });
};

function getDirections(data){
  $.each(data.directions, function(i, node){
    if ( node.settings.length > 0 ) {
      getSettings(node);
    }
    if ( node.directions.length > 0 ) {
      getDirections(node);
    }
  });
};


*/

/******************************/





/*


function navigation(){
  (function() {
    $.getJSON("navigation.json", function(data) {
      $(".primary").append(
        '<button class="white-button nav-element">'
        + data.root.name
        + '</button>'
      );
      $.each(data.root.directions, function(i, direction){
        $(".secondary").append(
          '<button class="white-button nav-element" data-node="'
          + direction.name
          + '">'
          + direction.name
          + '</button>'
        );
      });
    });
  })();
};


function goTo(){
  $('.wrapper').on('click', '.nav-element', function(){
    currentNew = $(this).data('node');
    alert(currentNew);
    $.getJSON("navigation.json", function(data) {
      $.each(data.root.directions, function(i, item){
        if ( item.name == currentNew ) {
          hatml = '';
          $(".primary").append(
            '<button class="white-button nav-element">'
            + item.name
            + '</button>'
          );
          $.each(item.directions, function(i, direction){
            hatml +=
            '<button class="white-button nav-element" data-node="'
            + direction.name
            + '">'
            + direction.name
            + '</button>';

            $(".secondary").html(hatml);
          });
        }
      });
    });
  });
};
*/
