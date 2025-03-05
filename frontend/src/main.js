const { spawn } = require("child_process");
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function startBackend() {
	const backendPath = path.join(
		__dirname,
		"..",
		"..",
		"backend",
		"dist",
		"src",
		"main.js"
	);
	const child = spawn(process.execPath, [backendPath], { stdio: "inherit" });

	child.on("close", (code) => {
		console.log(`Backend finalizado com código ${code}`);
	});
}

app.whenReady().then(() => {
	startBackend();
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});

	const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "production";

	const isDev = NODE_ENV !== "production";

	const startURL = isDev
		? "http://localhost:3000" // 🔹 Carrega o React em desenvolvimento
		: url.format({
				pathname: path.join(__dirname, "../dist/index.html"), // 🔹 Caminho correto para a build
				protocol: "file:",
				slashes: true
		  });

	console.log("🔍 Carregando URL no Electron:", startURL); // 🔥 Adiciona log para verificar se está carregando o certo
	mainWindow
		.loadURL(startURL)
		.catch((err) => console.error("❌ Erro ao carregar URL no Electron:", err));

	mainWindow.webContents.once(
		"did-fail-load",
		(event, errorCode, errorDescription) => {
			console.error("❌ Falha ao carregar página:", errorDescription);
		}
	);

	app.on("window-all-closed", () => {
		if (process.platform !== "darwin") {
			app.quit();
		}
	});
});
