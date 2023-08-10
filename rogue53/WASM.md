Compile and link
================
emcc -Wno-incompatible-function-pointer-types -Wno-implicit-int -Wno-return-type -Wno-implicit-function-declaration -DUNIX -DUNIX_SYS5 -DCURSES *.c -o output.html --preload-file etc/termcap@/etc/termcap --preload-file usr@/usr -sEXIT_RUNTIME -sASYNCIFY


Generate termcap
================
infocmp -r -C

Start web-server
================
http-server -c-1
