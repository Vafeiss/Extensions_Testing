export async function testResources(page, extensionID, extensionName, resources) {
	return await page.evaluate(async ({extensionName, resources, extensionID}) => {

		const results = [];

		for (const WARurl of resources) {
			try {
				const response = await fetch(WARurl);

				if (response.ok) {
					results.push({
						extensionID,
						extensionName,
						WARurl,
						succes: response.ok,
						status: response.status
					});
					console.log(`Successfully fingerprint for extension ${extensionName} (ID: ${extensionID})`);
					break;
				}

			} catch (error) {
				results.push({
					extensionID,
					extensionName,
					WARurl,
					success: false,
					statusCode: null,
					error: error.message

				});
			}
		}
		return results;
	}, {extensionName, resources, extensionID});
}
