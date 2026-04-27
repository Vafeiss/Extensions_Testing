export async function testResourcesDirectly(browser, extensionID, extensionName, resources) {
		const results = [];

		for (const WARurl of resources) {
            const page = await browser.newPage();
			try {
				const response = await page.goto(WARurl, {waitUntil:"domcontentloaded", timeout: 10000});

				results.push({
					extensionID,
					extensionName,
					WARurl,
					succes: response.ok,
					status: response.status

				});

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
                finally{
                    await page.close();
                }
		}
		return results;
	}

