/*
* this script is intended for functions responsible to manage the background
* - loading sky and sea
* - attribute tinkering
*/

var cloud_index = 0, selected_cloud, pick;
var wave_index = 0, selected_wave;
const numbOfClouds = 13, numbOfWaves = 5;
var inProgress = false;

function load_svg(){
  return new Promise((resolve, reject) => {
    xhr_sky = new XMLHttpRequest();
    xhr_sea = new XMLHttpRequest();
    xhr_sky.open("GET","images/sky.svg", true);
    xhr_sea.open("GET","images/sea.svg", true);
    // Following line is just to be on the safe side;
    // not needed if your server delivers SVG with correct MIME type
    xhr_sky.overrideMimeType("image/svg+xml");
    xhr_sea.overrideMimeType("image/svg+xml");
    xhr_sky.onload = function(e) {
      if(xhr_sky.readyState == 4){
        document.getElementById("bg-img").appendChild(xhr_sky.responseXML.documentElement);
      }
    }
    xhr_sea.onload = function(e) {
      if(xhr_sea.readyState == 4){
        document.getElementById("bg-img").appendChild(xhr_sea.responseXML.documentElement);
      }
    }
    xhr_sea.send(null);
    xhr_sky.send(null);
    resolve("svg are loaded");
  })
}

async function loadBG(){
  try {
    const res = await load_svg();
  } catch (e) {
    console.log(e);
  }
}

setTimeout(async function() {
  var anim_timer = setInterval(function() {
    selected_wave = '[id=wave' + wave_index + ']';
    var wave = document.querySelector(selected_wave);
    if(wave !== null){
      wave.classList.add("wavy");
    } else {
      console.log(selected_wave+" not found");
    }
    wave_index++;
    if(wave_index > numbOfWaves){
      clearInterval(anim_timer);
    }
  }, 500);
}, 300);

setTimeout(async function() {
  var anim_timer = setInterval(function() {
    selected_cloud = '[id=cloud' + cloud_index + ']';
    var wave = document.querySelector(selected_cloud);
    if(wave !== null){
      pick = cloud_index % 3;
      switch (pick) {
        case 0:
          wave.classList.add("windy-fast");
          break;
        case 1:
          wave.classList.add("windy-medium");
          break;
        case 2:
          wave.classList.add("windy-slow");
      }
    } else {
      console.log(selected_cloud+" not found");
    }
    cloud_index++;
    if(cloud_index > numbOfClouds){
      clearInterval(anim_timer);
    }
  }, 2000);
}, 300);

function newTransPossible(){
  inProgress = false;
}

function wobble(item){
  console.log(item);
}

$(function(){
  loadBG();
  $(".deeper_info").hide();
  $("#page_filler").get(0).addEventListener("transitionend", newTransPossible, true);
  $("scroll-page").scroll(function(){
    if(!inProgress && $(".page-header").is(":visible")){
      inProgress = true;
      // intro should disappear
      $(".page-header").fadeOut();
      // directions to scroll should disappear
      $("#directions").slideUp();
      // social should disappear
      $(".social-grid").slideUp();
      // sea level should raise
      $("#svg841").css("bottom", "66vh");
      // a div expands to recreate sea bottom
      $("#page_filler").css("height", "66vh");
      // the grid adjusts to fit more info
      $(".body-grid").delay(300).css("z-index", "3");
      $(".details").delay(300).css("grid-row", "2 / 5");
      $(".body-grid").delay(300).css("margin", "15vh auto 5vh");
      // the clouds fall behind the sea level
      $("#svg947").delay(300).css("z-index", "-1");
      // new info apper
      // $(".deeper_info").delay(2000).slideDown(3000);
      $(".deeper_info").delay(2000).effect("slide", { to: {height: "100%"} }, 10000, ()=>{console.log("i ma done");});

    } else if(!inProgress && $(".deeper_info").is(":visible")){
      if($(".deeper_info").get(0).getBoundingClientRect().top > 299){
        console.log("going back");
        inProgress = true;
        // sea level should lower
        $("#svg841").css("bottom", "0");
        // a div expands to recreate sea bottom
        $("#page_filler").css("height", "2vh");

        //change this with something better
        // it slides towards up but we want down
        // $(".deeper_info").slideUp();

        $("deeper_info").delay(300).show("slide", {direction: "up"})

        $(".body-grid").delay(300).css("margin", "10vh auto");
        $(".details").delay(300).css("grid-row", "2 / 4");
        $(".body-grid").delay(300).css("z-index", "1");
        // directions to scroll should disappear
        $("#directions").delay(2500).slideDown();
        // social should disappear
        $(".social-grid").delay(2500).slideDown();
        $(".page-header").delay(2500).fadeIn();
      }
    }
  });
})
