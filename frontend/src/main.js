const { spawn } = require("child_process");
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

if (!app.requestSingleInstanceLock()) {
	app.quit();
}

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

	console.log("Backend path:", backendPath);
	console.log("Backend path:", spawn(process.execPath, [backendPath]));

	const child = spawn(process.execPath, [backendPath], { stdio: "inherit" });
	child.on("close", (code) => {
		console.log(`Backend finalizado com código ${code}`);
	});
}

function createMainWindow() {
	if (mainWindow) return;

	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "production";
	const isDev = NODE_ENV !== "production";

	const startURL = isDev
		? "http://localhost:3000"
		: url.format({
				pathname: path.join(__dirname, "../dist/index.html"),
				protocol: "file:",
				slashes: true
		  });

	console.log("🔍 Carregando URL no Electron:", startURL);
	mainWindow
		.loadURL(startURL)
		.catch((err) => console.error("❌ Erro ao carregar URL no Electron:", err));

	mainWindow.webContents.once(
		"did-fail-load",
		(event, errorCode, errorDescription) => {
			console.error("❌ Falha ao carregar página:", errorDescription);
		}
	);
}

app.whenReady().then(() => {
	startBackend();
	createMainWindow();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
