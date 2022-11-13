import { Sequelize } from "sequelize";
import config from "./config.json";
const sequelize = new Sequelize("tmdt", "sa", "123456", {
	host: "localhost",
	dialect: "mssql",
	logging: false,
	raw:true
	// DESKTOP-VVF1AMR
});

const connect_mssql = async () => {
	try {
		await sequelize.authenticate();
		console.log(`Connect successfully Sql Server ${config.development.database}.`);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

module.exports = connect_mssql;
