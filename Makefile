# === Настройки ===
FRONT = frontend

# === Цели ===
install: preinstall
	npm ci --prefix frontend

preinstall:
	npm ci

build:
	@cd $(FRONT) && npm run build

start:
	npx start-server -s ./frontend/dist