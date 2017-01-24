path = [];
navItemsArray = [];

$(document).ready(function(){
  getData();
  dropdowns();
});

// class for each node in navigation tree
var navItem = function(id, node, path, tabs, content, isSettingTab, additionalClass){
  this.id = id;
  this.node = node;
  this.path = [];
  for (i=0; i<path.length; i++) {
    this.path.push(path[i]);
  }
  this.tabs = tabs;
  this.content = content;
  this.isSettingTab = isSettingTab;
  this.additionalClass = additionalClass;
};

// get data from json file
function getData(){
  (function() {
    $.getJSON("navigation.json", function(data) {
      getAllNodes(data);
    }).done(function() {
      display(0);
      navigate();
      setTimeout(function(){
        $('.spinner-overlay').fadeOut();
      }, 500);
    });
  })();
};

function getAllNodes(data){
  $.each(data.navigation, function(i, node){
    path.push(node.id);
    navItemsArray.push(new navItem(node.id, node.name, path, node.settings, node.directions, false));
    path.pop();
    getNode(node);
  });
};

function getNode(data){
  path.push(data.id);
  $.each(data.settings, function(i, node){
    navItemsArray.push(new navItem(node.id, node.name, path, node.settings, node.directions, true, node.additionalClass));
    getNode(node);
  });
  $.each(data.directions, function(i, node){
    path.push(node.id);
    navItemsArray.push(new navItem(node.id, node.name, path, node.settings, node.directions, false, node.additionalClass));
    path.pop();
    getNode(node);
  });
  path.pop();
};

function pathList(path){
  var html = '';
  var current;
  for(i=0; i<path.length; i++) {
    current = $.grep(navItemsArray, function(e){ return e.id == path[i]; })[0];
    html +=
      '<li><a class="navigationTrigger" href="" data-id="' + current.id + '">'
      + current.node
      + '</a></li>';
  }
  return html;
};

function optionsList(options){
  var html = '';
  for(i=0; i<options.length; i++) {
    html +=
      '<li><a class="navigationTrigger" href="" data-id="' + options[i].id + '">'
      + options[i].name
      + '</a></li>';
  }
  return html;
};

function contentList(content){
  var html = '';
  var additionalClass = '';
  for(i=0; i<content.length; i++) {
    if ( content[i].additionalClass != undefined ) {
      additionalClass = content[i].additionalClass + ' ';
    } else {
      additionalClass = '';
    }
    html +=
      '<button class="' + additionalClass + 'navigationTrigger white-button setting-options__button" data-id="' + content[i].id + '">'
      + content[i].name
      + '</button>';
  }
  return html;
};

function display(queryId, trigger){
  var current = $.grep(navItemsArray, function(e){ return e.id == queryId; })[0];
  if ( current.content.length > 0 || current.tabs.length > 0 ) {
    $('#content_name').text(current.node);
    $('#content').html(contentList(current.content));
    if( !current.isSettingTab ) {
      $('#primary').html(pathList(current.path));
      $('#settingsTabs').html(optionsList(current.tabs));
      if ($('#settingsTabs').is(':empty')){
        $('.secondary-nav').slideUp();
        $('#primary li').removeClass('has_secondary');
      } else {
        $('.secondary-nav').slideDown();
        $('#primary li:last-child').addClass('has_secondary');
        $('.secondary-nav li:first-child a').click();
      }
    } else {
      $('.secondary-nav ul li a').removeClass('active');
      trigger.addClass('active');
    }
  }
}

function navigate(){
  var trigger;
  $('.app').on('click.navigate', '.navigationTrigger', function(event){
    event.preventDefault();
    trigger = $(this);
    display($(this).data("id"), trigger);
  });
};

function dropdowns(){
  var openedDropdown;
  $('.app').on('click.dropdown', '.dropdown-toggle', function(event){
    event.stopPropagation();
    openedDropdown = $(this).parent();
    $('.dropdown-holder').not(openedDropdown).find('.dropdown-toggle').removeClass('active');
    $('.dropdown-holder').not(openedDropdown).find('.dropdown').slideUp();
    openedDropdown.find('.dropdown-toggle').toggleClass('active');
    openedDropdown.find('.dropdown').slideToggle();
    $('.app').on("click.dropdownHide", function(event){
      //if( $(event.target) != openedDropdown ) {
        openedDropdown.find('.dropdown-toggle').removeClass('active');
        openedDropdown.find('.dropdown').slideUp();
        $('.app').off("click.dropdownHide");
      //}
    });
  });
};
