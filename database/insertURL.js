import {connect} from "./connect.js";
import {getFingerprints} from "./getFingerprint.js";


export async function insertURL(conn,identity,name, resources) {
    if(await getFingerprints(conn, name)) {
        console.log("Fingerprint already exists!");
        return
    }

    try {
        const [result] = await conn.execute(
            "INSERT INTO urls (fingerprint_id , url) VALUES (?,?)",
            [identity, resources]
        );

        return result.insertId;
    }
    catch{
        console.log("Unable to insert into database")
    }
}