// import faunadb, {query as q} from 'faunadb'

// create client
// let adminClient = new faunadb.Client({secret: 'fnAE7F7ViWAA0qzMA57iBRKgdtYfNDFImMLJ1vuW'})
// let client = new faunadb.Client({secret: 'fnAE7F7ViWAA0qzMA57iBRKgdtYfNDFImMLJ1vuW'})

// create database
// adminClient.query(
//     q.CreateDatabase({name: 'my_app'})
// )
//     .then((ret)=>console.log(ret))

// create key
// adminClient.query(
//     q.CreateKey(
//         {
//             database: q.Database('my_app')
//         }
//     )
// )
//     .then((ret)=>console.log(ret))


// import {Collection, Get, query, Ref} from "faunadb";

// import {Var} from "faunadb";

import {query as q} from "faunadb";

export const FaunaCollectionCount = async (client, q, collectionName, indexName)=>{
    let count_object = await client.query(
        q.Count(
            q.Map(
                q.Paginate(q.Documents(q.Collection(collectionName))),
                q.Lambda(indexName, q.Get(q.Var(indexName)))
            )
        )
    )
    const count_id = count_object.data[0]

    return count_id
}

export const getCodeBybody = (body)=>{
    const dataStringify = JSON.stringify(body.firstname + body.lastname + body.role)
    const buff = new Buffer(dataStringify);
    const base64data = buff.toString('base64');
    return base64data
}


export const getPostId = async (client, q) => {
    try {
        let docById = await client.query(
            q.Get(q.Ref(q.Collection('reference'), '355442791191412946'))
        )
        console.log('docById = ', docById)
        const doc = docById.data
        console.log('doc = docById.data = ', doc)
        return doc
    }catch (e) {
        (err)=> console.error((
            'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description
        ))
    }
}

export const setPostId = async (client, q, data) => {
    // console.log('data in setPostId', data)
    try {
        let docById = await client.query(
            q.Update(
                // q.Ref(q.Collection('reference'), '1')),
                q.Ref(q.Collection("reference"), "355442791191412946"),
                {
                    data:
                        {
                            "before_id": data.before_id,
                            "id": data.id,
                            "next_id": data.next_id
                        }
                }
            )
        )
        console.log('docById = ', docById)
        const doc = docById.data

        return doc
    }catch (e) {
        (err)=> console.error((
            'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description
        ))
    }
}

export const FaunaPostOnePerson = async (client, q, body)=>{
    // const count_id = await FaunaCollectionCount(client, q, 'person', 'person_id')
    // const next_id = count_id + 1
    // console.log('ín POST')

    console.log('body in FaunaPostOnePerson in handlers= ', body)
    // try {
    //     const idForNewPost = await getPostId(client, q)
    //     console.log('idForNewPost =', idForNewPost)
    // }catch (e) {
    //     console.log('error ', e)
    // }

    const idForNewPost = await getPostId(client, q)
    console.log('idForNewPost OUT =', idForNewPost)

    const code = getCodeBybody(body)
    try {
        let createPersonQuery = await client.query(
            q.Create(
                q.Collection('person'),
                {
                    data: {
                        "id": Number(idForNewPost.id) ,
                        "firstname": `${body.firstname}`,
                        "lastname": `${body.lastname}`,
                        "role": `${body.role}`,
                        "code": `${code}`
                    }
                }
            )
        )
    }catch (e) {
        console.log('error ', e)
    }

    console.log('createPersonQuery = ', createPersonQuery)
    const newIdData = {
        "before_id": idForNewPost.before_id +1,
        "id": idForNewPost.id +1,
        "next_id": idForNewPost.next_id +1
    }
    // console.log('newIdData =', newIdData)
    // try {
    //     const idForNextPost = await setPostId(client, q, newIdData)
    //     console.log('idForNextPost =', idForNextPost)
    // }catch (e) {
    //     console.log('error ', e)
    // }
    const idForNextPost = await setPostId(client, q, newIdData)
    console.log('idForNextPost =', idForNextPost)

    const createdPersonData = createPersonQuery.data
    // console.log('createdPersonData = ', createdPersonData)
    return createdPersonData

    // try {
    //     // const count_id = await FaunaCollectionCount(client, q, 'person', 'person_id')
    //     // const next_id = count_id + 1
    //     // console.log('ín POST')
    //
    //     console.log('body in FaunaPostOnePerson in handlers= ', body)
    //     const idForNewPost = await getPostId(client, q)
    //     console.log('idForNewPost =', idForNewPost)
    //
    //
    //     const code = getCodeBybody(body)
    //     let createPersonQuery = await client.query(
    //         q.Create(
    //             q.Collection('person'),
    //             {
    //                 data: {
    //                     "id": Number(idForNewPost.id) ,
    //                     "firstname": `${body.firstname}`,
    //                     "lastname": `${body.lastname}`,
    //                     "role": `${body.role}`,
    //                     "code": `${code}`
    //                 }
    //             }
    //         )
    //     )
    //     console.log('createPersonQuery = ', createPersonQuery)
    //     const newIdData = {
    //         "before_id": idForNewPost.before_id +1,
    //         "id": idForNewPost.id +1,
    //         "next_id": idForNewPost.next_id +1
    //     }
    //     // console.log('newIdData =', newIdData)
    //     const idForNextPost = await setPostId(client, q, newIdData)
    //     // console.log('idForNextPost =', idForNextPost)
    //     const createdPersonData = createPersonQuery.data
    //     // console.log('createdPersonData = ', createdPersonData)
    //     return createdPersonData
    //
    // } catch (err) {
    //     (err)=> console.error((
    //         'Error: [%s] %s: %s',
    //             err.name,
    //             err.message,
    //             err.errors()[0].description
    //     ))
    // }
}

export const FaunaReadDataByID = async (client, q, id)=>{
    let doc = 'doc in FaunaReadDataById'
    // console.log('id in FaunaReadDataById = ', id)
    try {
        let docReadById = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index('person_by_id'), Number(id) )
                    // q.Match(q.Index('person_by_id'), '3' )
                ),
                q.Lambda(
                    "id",
                    q.Get(q.Var("id"))
                )
            )
        )
        // console.log('docReadById = ', docReadById)

        const dataLength = docReadById.data.length
        // console.log('docReadByIdDataLength = ', docReadByIdDataLength)

        if(dataLength === 0){
            // return {"id": false, "message": `Document with id=${id} is NOT exist`}
            return {
                "id": id,
                "firstname": `NOT exist`,
                "lastname": `NOT exist`,
                "role": `NOT exist`
            }
        }
        const doc = docReadById.data[0].data
        // console.log('doc = ', doc)

        return doc
    }catch (err) {
        (err)=> console.error((
            'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description
        ))
    }

}

export const FaunaReadAllData = async (client, q)=>{
    try {
        let allDoc = await client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection('person'))),
                q.Lambda("person_id", q.Get(q.Var("person_id")))
            )
        )

        const allDocLength = allDoc.data.length
        // console.log('allDocLength = ', allDocLength)
        let doc = []
        for(let i = 0; i<allDocLength; i++){
            const dataWithCode = allDoc.data[i].data
            const data = {
                "id": dataWithCode.id,
                "firstname": dataWithCode.firstname,
                "lastname": dataWithCode.lastname,
                "role": dataWithCode.role
            }
            doc[i]=data
        }

        return doc
    }catch (err) {
        (err)=> console.error((
            'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description
        ))
    }
}

export const FaunaPutOnePersonById = async (client, q, id, body) => {
    console.log('in FaunaPutOnePersonById')
    console.log('id = ', id)
    console.log('body in Function = ', body)
    try {
        const code = getCodeBybody(body)
        console.log('code = ', code)
        let updatePersonQuery = await client.query(

            q.Update(
                q.Select(
                    'ref',
                    q.Get(q.Match(q.Index('person_by_id'), Number(id)))
                ),
                {
                    data: {
                        "id": Number(id),
                        "firstname": body.firstname,
                        "lastname": body.lastname,
                        "role": body.role,
                        "code": code
                    }
                }
            )

        )
        console.log('updatePersonQuery = ', updatePersonQuery)
        // const updatePersonData = updatePersonQuery.data
        // console.log('createdPersonData = ', createdPersonData)
        return updatePersonQuery.data
    }catch (err) {
        (err)=> console.error((
            'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description
        ))
    }
}


export const FaunaDeleteAllData = ()=>{
    return {

    }
}

export const FaunaDeleteOnePersonById = async (client, q, id)=>{
    // console.log('in FaunaDeleteOnePersonById')
    // console.log('id = ', id)

    try {
        let deletePersonQuery = await client.query(
            q.Delete(
                q.Select(
                    'ref',
                    q.Get(q.Match(q.Index('person_by_id'), Number(id)))
                )
            )
        )
        // console.log('deletePersonQuery = ', deletePersonQuery)
        // const updatePersonData = updatePersonQuery.data
        // console.log('createdPersonData = ', createdPersonData)
        return deletePersonQuery.data
    }catch (err) {
        (err)=> console.error((
            'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description
        ))
    }
}
