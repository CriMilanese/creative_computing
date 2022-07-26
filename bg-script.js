/*
* this script is intended for functions responsible to manage the background
* - loading sky and sea
* - attribute tinkering
*/

var cloud_index = 0, selected_cloud, pick;
var wave_index = 0, selected_wave;
const numbOfClouds = 13, numbOfWaves = 5;
var inProgress = false;
// the upper limit for the scroll animations with the waves to revert to the sky
var SCROLLING_GAP = 0;

function load_svg(path, parentID){
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    // Following line is just to be on the safe side;
    // not needed if your server delivers SVG with correct MIME type
    xhr.overrideMimeType("image/svg+xml");
    xhr.onload = function(e) {
      if(xhr.readyState == 4){
        document.getElementById(parentID).appendChild(xhr.responseXML.documentElement);
      }
    }
    xhr.send(null);
    resolve("svg are loaded");
  })
}

async function loadBG(){
  try {
    await load_svg("images/sea.svg", "bg-img");
    await load_svg("images/sky.svg", "bg-img");
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
  console.log("resetting transition");
  inProgress = false;
}

// function setSurfaceLimit(){
//   if(SURFACE == -1){
//     SURFACE = $(".deeper_info").get(0).getBoundingClientRect().top;
//     console.log(SURFACE)
//   }
// }


$(function(){
  loadBG();
  $("scroll-page").scrollTop(0);
  SCROLLING_GAP = $("#scroll-gap").height();
  $("#page_filler").get(0).addEventListener("transitionend", newTransPossible, true);
  $("scroll-page").scroll(function(){
    console.log(parseInt($(".deeper_info").get(0).getBoundingClientRect().top));
    if(!inProgress && $(".page-header").is(":visible")){
      inProgress = true;
      // directions to scroll should disappear
      $("scroll-page").scrollTop(SCROLLING_GAP);
      $("#directions").slideUp();
      // social should disappear
      $(".social-grid").slideUp();
      // intro should disappear
      $(".page-header").slideUp(2500);
      // sea level should raise
      $("#svg841").css("bottom", "66vh");
      // a div expands to recreate sea bottom
      $("#page_filler").css("height", "66vh");
      // the grid adjusts to fit more info
      $(".body-grid").delay(300).css("height", "85vh");
      // $(".body-grid").delay(300).css("margin", "15vh auto 5vh");
      // the clouds fall behind the sea level
      $("#svg947").delay(300).css("z-index", "-1");
      // new info apper
      // setTimeout(() => {
      //   setSurfaceLimit();
      // }, 2000)

    } else if(!inProgress && $(".deeper_info").is(":visible")){
      if($(".deeper_info").get(0).getBoundingClientRect().top > SCROLLING_GAP){
        console.log("going back");
        inProgress = true;
        // $("scroll-page").animate({
        //   scrollTop: $(".scroll-page").offset().top
        // }, 100);
        // sea level should lower
        $("#svg841").css("bottom", "0");
        // a div expands to recreate sea bottom
        $("#page_filler").css("height", "2vh");

        //change this with something better
        // it slides towards up but we want down
        // $(".deeper_info").slideUp();
        $("scroll-page").scrollTop(SCROLLING_GAP);

        // height of grid goes back to normal, to give space to
        // the footer
        $(".body-grid").delay(300).css("height", "70vh");

        $(".page-header").slideDown(2500);

        // directions to scroll should reappear
        $("#directions").delay(3000).slideDown();
        // social should reappear
        $(".social-grid").delay(3000).slideDown();
      }
    }
  });
})
