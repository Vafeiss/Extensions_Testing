
export async function getExtension(conn,fingerprint) {

    const [rows] = await conn.execute(
        "SELECT * FROM fingerprints WHERE fingerprint = ?",
        [fingerprint]
    );

    return rows.length ? rows[0].name : null;
}