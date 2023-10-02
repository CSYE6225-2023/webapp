import { Sequelize } from "sequelize";



const Account = databaseConnection.define("account", {
  id: {
    type: DataTypes.UUID, // Universally Unique Identifier
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},
{
  createdAt: "account_created",
  updatedAt: "account_updated",
});




export default Account;