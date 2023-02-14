import {
    FaunaPostOnePerson,
    FaunaReadDataByID
} from "../../../../lib/handlers";

import faunadb, {query } from 'faunadb'

let domain, port, scheme
let client = new faunadb.Client(
    {
        secret: 'fnAE7F7ViWAA0qzMA57iBRKgdtYfNDFImMLJ1vuW',
        domain: 'db.fauna.com',
        port: 443,
        scheme: 'https',

    }
)
let q = query
const PersonById = async (req, res) => {

    const method = req.method;
    const id = req.query.id

    switch (method) {
        case "GET":
            try {
                let doc= await FaunaReadDataByID(client, q, id)

                return doc
                    ? res.status(200).send(doc)
                    : res.end(`Database don't return any data`);

            }catch (e) {
                return res.status(400).json({
                    success: false,
                    "message": "Don't read all documents from Fauna.db"
                });
            }
        case "POST":
            try {


                // let data = {
                //     firstname: req.body.firstname,
                //     lastname: req.body.lastname,
                //     role: req.body.role
                // };
                //
                // const dataStringify = JSON.stringify(data.firstname + data.lastname + data.role)
                // let buff = new Buffer(dataStringify);
                // let base64data = buff.toString('base64');
                //
                // const sqlCreateOnePerson = `INSERT
                //             INTO person (firstname, lastname, role, code)
                //             VALUES ("${data.firstname}","${data.lastname}","${data.role}", "${base64data}")`;
                // await dbCreateOnePerson(db, sqlCreateOnePerson)
                //
                // let sqlReadPesonByCode = `SELECT
                //             id,
                //             firstname,
                //             lastname,
                //             role
                //        FROM person
                //        WHERE code="${base64data}"`;
                // let getData = await dbReadAllData(db, sqlReadPesonByCode)
                //
                // await dbCloseConnection(db)

                await FaunaPostOnePerson(client, q, id)

                return res
                    ? res.status(200).json(getData)
                    : res.end(`No person with the lastname ${lastname}`);


            }catch (e) {
                return res.status(400).json({
                    success: false,
                });
            }
        case "DELETE":
            try {
                let db = await dbOpenConnection(sqlite3)

                const sqlDropTable= "DROP TABLE IF EXISTS person"
                await dbDropTable(db, sqlDropTable)

                const sqlCreateTable = "CREATE TABLE " +
                    "IF NOT EXISTS " +
                    "                               person (" +
                    "                                       id INTEGER PRIMARY KEY, " +
                    "                                       firstname TEXT, " +
                    "                                       lastname TEXT, " +
                    "                                       role TEXT, " +
                    "                                       code TEXT UNIQUE)"
                await dbCreateTable(db, sqlCreateTable)

                await dbCloseConnection(db)

                return res
                    ? res.status(200).json({"message": "table 'person' is empty"})
                    : res.end(`No person with the lastname ${lastname}`);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                });
            }
        default:
            res.setHeader("Allow", ["GET", "POST", "DELETE"]);
            return res
                .status(405)
                .json({ success: false, "message": `Method ${method} Not Allowed` })
        // .end(`Method ${method} Not Allowed`);
    }
}

export default PersonById
