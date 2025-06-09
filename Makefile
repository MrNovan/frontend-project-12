# === Настройки ===
FRONT = frontend

# === Цели ===
build:
	@cd $(FRONT) && npm run build

start:
	npx start-server -s ./frontend/dist