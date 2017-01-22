$(document).ready(function(){
  navItemsCounter = 0;
  path = [];
  navItemsArray = [];
  setTimeout(function(){
    getData();
  }, 500);
});

var navItem = function(id, node, path, tabs, content, isSettingTab){
  this.id = id;
  this.node = node;
  this.path = [];
  for (i=0; i<path.length; i++) {
    this.path.push(path[i]);
  }
  this.tabs = tabs;
  this.content = content;
  this.isSettingTab = isSettingTab;
};


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
  path.push(data.name);
  $.each(data.navigation, function(i, node){
    navItemsArray.push(new navItem(navItemsCounter, node.name, path, node.settings, node.directions, false));
    path.pop();
    getNode(node);
  });
};

function getNode(data){
  navItemsCounter++;
  path.push(data.name);
  $.each(data.settings, function(i, node){
    navItemsArray.push(new navItem(navItemsCounter, node.name, path, node.settings, node.directions, true));
    getNode(node);
  });
  $.each(data.directions, function(i, node){
    navItemsArray.push(new navItem(navItemsCounter, node.name, path, node.settings, node.directions, false));
    //console.log(node.name, path, node.settings, node.directions);
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
