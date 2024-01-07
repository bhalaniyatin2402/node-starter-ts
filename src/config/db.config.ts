import { Connection, connect } from "mongoose";

export async function connectToDB() {
  try {
    const db_url = process.env.DB_URL !== undefined ? process.env.DB_URL : ''

    const { connection } = await connect(db_url)

    if(connection) {
      console.log('connect to DB: ' + db_url);
    }

  } catch (error) {
    console.log('db connection error: ' + error);
    process.exit(1)
  }
}
