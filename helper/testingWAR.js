export function testResources(extensionName , resources , url) {
const results = [];

for(const WARurl of resources){
    try{
        const response = await fetch(WARurl);

        results.push({
            extensionName: extensionName,
            resource: resource,
            WARurl: WARurl,
            succes: response.ok,
            status: response.status,
            contentType: response.ok ? response.headers.get("Content-Type") : null,
        })}
        catch(error){
            results.push({
                extensionName: extensionName,
                WARurl: WARurl,
                success: false,
                statusCode: null,
                contentType: null,
                error: error.message,
            })
        }
        
}};
