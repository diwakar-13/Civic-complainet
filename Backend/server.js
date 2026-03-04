import "dotenv/config"; // ✅ MUST BE FIRST LINE

import app from "./app.js";
import { superAdminCreateIfNotExist } from "./utils/superAdminLogin.js";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`server running on this port: http://localhost:${port}`);
  await superAdminCreateIfNotExist();
});
