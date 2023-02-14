import {
    FaunaCollectionCount,
    FaunaPostOnePerson,
    FaunaReadAllData
} from "../../../lib/handlers";

import faunadb, {query as q } from 'faunadb'

let client = new faunadb.Client(
    {
        secret: 'fnAE7F7ViWAA0qzMA57iBRKgdtYfNDFImMLJ1vuW',
        domain: 'db.fauna.com',
        port: 443,
        scheme: 'https',

    }
)

const Persons = async (req, res) => {
    const method = req.method;
    switch (method) {
        case "GET":
            try {
                const countAllDocs = FaunaCollectionCount(client, q, 'person', 'person_id')

                if(countAllDocs === 0){
                    // console.log('Table is empty.')
                    // return res.status(200).json({"message:":`No person with the id ${id}`});
                    return res.status(200).json({
                        "read all data seccess": false,
                        "message:":`Table 'person' is empty.`,
                        "data": []
                    });
                }

                let doc= await FaunaReadAllData(client, q)
                console.log('doc', doc)
                // const dataAllDocs =
                //     {
                //         "id": doc.id,
                //         "firstname": doc.firstname,
                //         "lastname": doc.lastname,
                //         "role": doc.role
                //     }
                // console.log('dataAllDocs =', dataAllDocs )
                return res.status(200).json({
                    "seccess": true,
                    "message:":`all docs in table 'person'`,
                    "data": doc
                })
                // return doc
                //     ? res.status(200).send(doc)
                //     : res.end(`Database don't return any data`);

            }catch (e) {
                return res.status(400).json({
                    success: false,
                    "message": "Don't read all documents from Fauna.db"
                });
            }
        case "POST":
            try {
                // console.log('in POST')
                const body = req.body
                // console.log('body', body)
                // console.log('typeof body', typeof body)
                let doc = await FaunaPostOnePerson(client, q, body)
                console.log('doc in FaunaPostOnePerson in person/index', doc)
                return doc
                    ? res.status(200).send(doc)
                    : res.end(`Database don't return any data`);

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

export default Persons
