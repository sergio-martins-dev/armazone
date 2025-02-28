const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/react/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "./" // Garante que os arquivos sejam encontrados no Electron
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				type: "asset/resource"
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/react/index.html",
			filename: "index.html",
			inject: "body" // Garante que os scripts do React sejam incluídos
		})
	],
	devServer: {
		static: path.join(__dirname, "dist"),
		compress: true,
		port: 3000,
		hot: false,
		liveReload: false,
		client: {
			webSocketURL: "ws://localhost:3000/ws"
		}
	}
};
