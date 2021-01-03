const { SkynetClient } = require('@nebulous/skynet');

// create a client
const client = new SkynetClient();

(async () => {
	// upload
	const skylink = await client.uploadFile("./videosportsretrieve.mp4");
	console.log(`Upload successful, skylink: ${skylink}`);

	// download
	await client.downloadFile("./videosmovieretrieve.mp4", skylink);
	console.log('Download successful');
})()