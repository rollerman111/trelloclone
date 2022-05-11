const Sequelize = require("sequelize");

let db
if (process.env.DATABASE_URL) {

  db = new Sequelize(process.env.DATABASE_URL, {

    logging: false,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }

  });

} else {

  db = new Sequelize("postgres://postgres:147258369@localhost:5432/postgres", {

    logging: false,

  });

}

module.exports = db;