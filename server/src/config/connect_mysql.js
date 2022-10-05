import { Sequelize } from "sequelize";
import config from "./config.json";
const sequelize = new Sequelize("TMDT", "root", null, {
	host: "localhost",
	dialect: "mysql",
	logging: false,
	// DESKTOP-VVF1AMR
});

const connect_mysql = async () => {
	try {
		await sequelize.authenticate();
		console.log(`Connect successfully MySql ${config.development.database}.`);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

module.exports = connect_mysql;
