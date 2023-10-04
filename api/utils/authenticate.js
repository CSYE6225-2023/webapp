import Account from "../models/account.js";
import bcrypt from "bcrypt";

export const authenticate = async (req, res, next)  => {
  const base64Auth = (req.headers.authorization || "").split(" ")[1] || ""; 
  const [email, password] = Buffer.from(base64Auth, "base64").toString().split(":");

  if( email && password ) {
    try {
      const account = await Account.findOne({ where: { email } });
      if (account && (await bcrypt.compare(password, account.password))) {
        req.user = { email, AccountId: account.id };
      return next();
      }
    } catch (error) {
      console.log(error);
    }
  }

  res.set("WWW-Authenticate", 'Basic realm="401"');
  res.status(401).send("Authentication required.");
};