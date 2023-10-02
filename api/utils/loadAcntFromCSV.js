import csvParser from "csv-parser";
import { databaseConnection} from "../services/database-service";
import fs from "fs";
import Account from "../models/account.js";


export const loadAcntFromCSV = async() => {
  try{
    await databaseConnection.authenticate();
    console.log("Connection has been established with database successfully.");
  
    await databaseConnection.sync({ force: false });

    fs.createReadStream("./opt/user.csv")
    .pipe(csvParser())
    .on("data", async (row) => {
      try {
        const existingAccount = await Account.findOne({
          where: { email: row.email },
        });

        if (!existingAccount) {
          await Account.create(row);
          console.log(`Create Account with email: ${row.email}`);
          }
          } catch (err) {
            console.error(`Error while loading account from from CSv: ${err.message}`);
          }
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
        });
      } catch (err) {
        console.error(`Unable to connect to the database: ${err.message}`);
      }
  };

