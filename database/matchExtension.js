export async function matchExtension(conn, Dom) {
    try {
        //call the database and find the extension with a similar fingerprint pattern
        const [rows] = await conn.execute(
            "SELECT identity, name FROM fingerprints WHERE ? Like CONCAT('%', fingerprint, '%')",
            [Dom]
        );

         console.log('Rows found:', rows.length);

        //print name and identity of the extension
        for (const row of rows) {
            console.log(`Extension: ${row.name} (Identity: ${row.identity})`);
        }
        //if no matching print message
        if(rows.length === 0) {
            console.log("No matching extension found inside database.");
        }
        return rows;

    } catch (error) {
        console.error("Error matching extension:", error);
        throw error;
    }
}