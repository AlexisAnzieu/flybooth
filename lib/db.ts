import mysql from "serverless-mysql";

const connection = mysql({
  config: {
    host: process.env.MYSQL_ENDPOINT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: +process.env.MYSQL_PORT! || 3306,
  },
});

const sql = async <T>(query: string, params?: any[]) => {
  try {
    let results = await connection.query(query, params);
    await connection.end();
    return results as T;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { sql };
