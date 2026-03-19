
export async function getFingerprints(conn,name) {


    const [rows] = await conn.execute(
        "SELECT * FROM fingerprints WHERE name = ?",
        [name]
    );

    return rows.length ? rows[0].fingerprint : null;
}