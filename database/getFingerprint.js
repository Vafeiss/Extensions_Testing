
export async function getFingerprints(conn,identity) {


    const [rows] = await conn.execute(
        "SELECT * FROM fingerprints WHERE identity = ?",
        [identity]
    );

    return rows.length ? rows[0].fingerprint : null;
}