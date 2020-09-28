
size(800, 800);

float x = 0;
float y = 0;
float line_len = 100;
float target_x = 0;
float target_y = 0;
int loops = 1000;
float increment = 0.05;
float whuffle = 1;

for (int i = 0; i < loops; i=i+1){
  x = width * noise(whuffle);
  y = height * noise(i);
  line_len = 100 * noise(whuffle,i);
  line(x, y, (x+line_len), (y+line_len));
  whuffle = whuffle + increment;
}
