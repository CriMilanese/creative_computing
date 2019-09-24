var default_stroke_size = 3;
var bg_r, bg_g, bg_b;
var stroke_size;

PImage icons = [];
Box menu = [];
Box marker_sz = [];
Box colors = [];
var color_values [];
var box_size;
var curr_color;
var sizes_menu;

void setup() {
  size(600, 600);
  bg_r = int(random(0, 100));
  bg_g = int(random(0, 100));
  bg_b = int(random(0,100));
  background(bg_r, bg_g, bg_b);
  init_tools_menu();
  init_colors_menu();
  frameRate(300);
}

void draw() {
  draw_menu();
  if (mouseIsPressed) {
    which_tool();    // tools is checked any moment for you to erase the screen
    which_color();   // color is checked anytime for you to change marker color
    draw_fh();
  }
}

void draw_fh() {
  if(keyIsPressed){
    fill(bg_r, bg_g, bg_b);
    noStroke();
  } else {
    fill(curr_color);
    stroke(curr_color);
  }
  circle(pmouseX, pmouseY, 2 * stroke_size);
}

void which_tool() {
  if (pmouseX < 52 && pmouseY > 52 && pmouseY < 104) {  // if the clear button is pressed
    background(255);
  } else if (pmouseX < 52 && pmouseY < 52) { // if the pencil button is pressed
    stroke_size = 3;
    sizes_menu = true;
  } else if (pmouseY < 52 && pmouseX > 52 && pmouseX < (4*(2+box_size)) && sizes_menu == true) {  // size has to be selected
    stroke_size = which_size();
    sizes_menu = false;
  }
}

int which_size(){
  for (int i=0; i < marker_sz.length; i++) {
    if (pmouseX > marker_sz[i].box_x && pmouseX < (marker_sz[i].box_x + box_size)) {
      cover_previous_frame();
      return i+1;
    }
  }
  return default_stroke_size;
}

void which_color() {
  if (pmouseX > (width - box_size - 2)) {
    for (int i=0; i<colors.length; i++) {
      if (pmouseY > (colors[i].box_y) && pmouseY < (colors[i].box_y + box_size)) {
        curr_color = color_values[i];
      }
    }
  }
}

class Box{
  int box_x, box_y;
  color clr;

  Box(int bx, int by){
    box_x = bx;
    box_y = by;
    clr = #A79B75;
  }
}

void init_tools_menu() {
  box_size = 50;
  sizes_menu = false;

  // init boxes for default tools menu
  menu = new Box[2];
  for (int i=0; i<menu.length; i++) {
    menu[i] = new Box(2, (i * box_size) + (i+1)*2);
  }

  //init boxes for marker sizes
  marker_sz = new Box[3];
  for(int i=0; i < marker_sz.length; i++){
    marker_sz[i] = new Box((i+1) * (box_size + 4), 2);
  }
}

void init_colors_menu() {
  colors = new Box[4];
  for (int i=0; i<colors.length; i++) {
    colors[i] = new Box(width - box_size - 2, i * (box_size + 2));
  }
  color_values = new int[4];
  init_color_list();
}

void init_color_list() {
  color_values[0] = #FF0000;    //RED
  color_values[1] = #00FF00;  //GREEN
  color_values[2] = #0000FF;  //BLUE
  color_values[3] = #000000;  //BLACK
  curr_color = 0;
}

// called every frame to keep the menu up
void draw_menu() {
  stroke(0);
  icons = new PImage[2];
  icons[0] = loadImage("free_hand_icon.png");
  icons[1] = loadImage("eraser_icon.png");

  // draw default tool menu
  for (int i=0; i < menu.length; i++) {
    fill(menu[i].clr);
    rect(menu[i].box_x, menu[i].box_y, box_size, box_size, 10);
    image(icons[i], menu[i].box_x + 5, menu[i].box_y + 5, box_size - 10, box_size - 10);
  }

  // draw right side color menu
  for (int i=0; i < colors.length; i++) {
    fill(color_values[i]);
    rect(colors[i].box_x, colors[i].box_y, box_size, box_size, 7);
  }

  // draw size menu when marker is selected
  if(sizes_menu){
    for (int i=0; i < marker_sz.length; i++) {
      fill(128);
      rect(marker_sz[i].box_x, marker_sz[i].box_y, box_size, box_size, 7);
      fill(bg_r, bg_g, bg_b);
      circle(marker_sz[i].box_x + int((box_size/2)), marker_sz[i].box_y + int((box_size/2)), 2 * (i+1));
    }
  }
}

// covers up the left menu area to make size menu disappear by drawing a white box on top of it
void cover_previous_frame(){
  noStroke();
  fill(bg_r, bg_g, bg_b);
  rect(0, 0, 5 * (box_size + 2), 54);
  stroke(0);
}
