size(500,500);
background(255);
strokeWeight(5);
smooth();

int foo = 255;
int x = 0;
int currentx = x;

for(int counter = 0; counter < 6; counter++){
  fill(foo, foo, foo);
  rect(0,currentx,500,currentx+100);
  currentx = currentx + 100;
  foo = foo - 20;
}
