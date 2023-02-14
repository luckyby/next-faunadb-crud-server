import {
    FaunaCollectionCount, FaunaDeleteOnePersonById, FaunaPutOnePersonById,
    FaunaReadAllData, FaunaReadDataByID, setPostId
}
    from "../../../../lib/handlers";


import faunadb, {query as q } from 'faunadb'
import {loadGetInitialProps} from "next/dist/shared/lib/utils";

let client = new faunadb.Client(
    {
        secret: 'fnAE7F7ViWAA0qzMA57iBRKgdtYfNDFImMLJ1vuW',
        domain: 'db.fauna.com',
        port: 443,
        scheme: 'https',

    }
)

const PersonById = async (req, res) => {
    const id = req.query.id;
    const method = req.method;


    // read all data from fauna db
    // const sqlGetById = `SELECT id, firstname, lastname, role FROM person WHERE id = ${id}`
    // let row = await dbReadAllData(db, sqlGetById)
    // let allDocs = await FaunaReadAllData(client, q)

    const countAllDocs = FaunaCollectionCount(client, q, 'person', 'person_id')

    if(countAllDocs === 0){
        // console.log('Table is empty.')
        // return res.status(200).json({"message:":`No person with the id ${id}`});
        return res.status(200).json({
            "seccess": true,
            "message:":`table 'person' hasn't any data`,
            "data": []
        });
    }

    if(id > countAllDocs){
        return res.json({
            "seccess": true,
            "message":`No data with the id=${id} in table 'person'`,
            "data": []
        })
    }

    switch (method) {
        case "GET":

            try {
                let doc= await FaunaReadDataByID(client, q, id)
                // console.log('in [id] after FaunaReadDataById')
                // console.log('doc:', doc)
                if(doc.firstname === 'NOT exist'){
                    return res.json({
                        "seccess": false,
                        "message": `Document with id=${id} is NOT exist`,
                        "data": []
                    })
                }

                const data =
                {
                    "id": doc.id,
                    "firstname": doc.firstname,
                    "lastname": doc.lastname,
                    "role": doc.role
                }

                return res.status(200).json({
                    "seccess": true,
                    "message": `data in document with id=${id} is read`,
                    "data":  data
                })
                    // : res.end(`The database doesn't return any data after attempt read data by id=${id}`);

            }catch (e) {
                return res.status(400).json({
                    success: false,
                    "message": "There weren't read any documents from 'person' in Faunadb"
                });
            }

        case "PUT":
            // const allDocCount = FaunaCollectionCount(client, q, 'person', 'person_by_id')
            // if(id > countAllDocs){
            //     return res.json({"message":`No person with the id=${id}`})
            // }else{
                try {
                    // console.log('in PUT')
                    const body = req.body
                    // console.log('body in PUT i [id] = ', body)
                    // console.log('id = ', id)
                    const doc = await FaunaPutOnePersonById(client, q, id, body)
                    // console.log('doc:', doc)
                    return doc
                        ? res.status(200).send(doc)
                        : res.end(`Attempt to update data by id=${id} failed`);
                }catch (error) {
                    return res.status(400).json({
                        "error": error.message,
                        success: false,
                    });
                }
            // }

        case "DELETE":
            try {
                // console.log('in DELETE')
                // console.log('id = ', id)
                const docForDelete = await FaunaReadDataByID(client, q, id)
                console.log('docForDelete =', docForDelete)
                if(docForDelete.firstname === 'NOT exist'){
                    return res.json({
                        "seccess": false,
                        "message": `data with id=${id} is NOT exist and cann't be deleted`,
                        "data": []
                    })
                }



                const doc = await FaunaDeleteOnePersonById(client, q, id)
                // console.log('doc:', doc)
                // ===============IN CONSOLE====================
                // {
                //     "deleted": {
                //     "id": 3,
                //         "firstname": "Ben",
                //         "lastname": "Rogers",
                //         "role": "captain",
                //         "code": "IkJlblJvZ2Vyc2NhcHRhaW4i"
                // }
                // }

                const countAllDocs = await FaunaCollectionCount(client, q, 'person', 'person_id')
                if(countAllDocs === 0){
                    const initialData = {
                        "before_id": 0,
                        "id": 1,
                        "next_id": 2
                    }
                    setPostId(client, q, initialData)
                }
                const data =
                    {
                        "id": doc.id,
                        "firstname": doc.firstname,
                        "lastname": doc.lastname,
                        "role": doc.role
                    }
                return res.status(200).json({
                    "seccess": true,
                    "message": `data with id='${id}' firstname='${doc.firstname}' lastname='${doc.lastname}' role="${doc.role} deleted`,
                    "data": []
                })
                // return doc
                //     ? res.status(200).json({"deleted": doc})
                //     : res.end(`Attempt to delete data by id=${id} failed`);

                // return (
                //     res?
                //         res.status(200).json({"message": `deleted data by id=${id} in table 'person'`})
                //         : res.json({"message":`No person with the id=${id}`})
                // )

            } catch (e) {
                return res.status(400).json({
                    inCatch: true,
                    success: false,
                });
            }

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            return res
                .status(405)
                .json({ "API execute success": false, "message": `Method ${method} Not Allowed in sqlite server API` })
    }
};

export default PersonById