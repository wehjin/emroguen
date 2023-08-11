SRC_DIR := src
OBJ_DIR := build
DIST_DIR := dist

SRC	:= $(wildcard $(SRC_DIR)/*.c)
OBJ	:= $(SRC:$(SRC_DIR)/%.c=$(OBJ_DIR)/%.o)
JS	:= $(DIST_DIR)/output.js
HTML	:= $(DIST_DIR)/output.html

CC = emcc -g

CFLAGS	:= \
	-Wno-incompatible-function-pointer-types\
	-Wno-implicit-int\
	-Wno-return-type\
	-Wno-implicit-function-declaration\
	-c -DUNIX -DUNIX_SYS5 -DCURSES

LDFLAGS := \
	--emrun\
	--preload-file assets/etc/termcap@/etc/termcap\
	--preload-file assets/usr/games@/usr/games

OPTIONS := \
	-sEXIT_RUNTIME\
	-sASYNCIFY

.PHONY: all
all: $(HTML)

.PHONY: js
js: $(JS)

$(HTML): $(OBJ) | $(DIST_DIR)
	$(CC) $(LDFLAGS) $(OPTIONS) $^ -o $@

$(JS): $(OBJ) | $(DIST_DIR)
	$(CC) $(LDFLAGS) $(OPTIONS) $^ -o $@

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c | $(OBJ_DIR)
	$(CC) $(CFLAGS) $(OPTIONS) -c $< -o $@

$(DIST_DIR) $(OBJ_DIR):
	mkdir -p $@

.PHONY: clean
clean:
	@$(RM) -rv $(DIST_DIR) $(OBJ_DIR)

.PHONY: run
run:
	emrun --no_browser $(HTML)

-include $(OBJ:.o=.d)
