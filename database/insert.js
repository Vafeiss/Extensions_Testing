import {connect} from "./connect.js";
import {getFingerprints} from "./getFingerprint.js";

export async function insert(conn,identity,name, fingerprint) {
    if(await getFingerprints(conn, name)) {
        console.log("Fingerprint already exists!");
        return
    }

    try {
        const [result] = await conn.execute(
            "INSERT INTO fingerprints (identity,name, fingerprint) VALUES (?,?, ?)",
            [identity, name , fingerprint]
        );

        return result.insertId;
    }
    catch{
        console.log("Unable to insert into database")
    }
}