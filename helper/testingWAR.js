export async function testResources(page, extensionID, extensionName, resources) {

	return await page.evaluate(async ({extensionName, resources, extensionID}) => {{
const results = [];

for(const WARurl of resources){
    try{
        const response = await fetch(WARurl);

        results.push({
            extensionID: extensionID,
            extensionName: extensionName,
            WARurl: WARurl,
            succes: response.ok,
            status: response.status,
        });
    }catch(error){
            results.push({
                extensionID: extensionID,
                extensionName: extensionName,
                WARurl: WARurl,
                success: false,
                statusCode: null,
                error: error.message,
            });
        }
    }
    return results;
}
},
    { extensionName, resources, extensionID }
);
}
