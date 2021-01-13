import { SkynetClient } from "skynet-js";

// create a client
const client = new SkynetClient();

// Assume we have a file from an input form.

async function example() {
  try {
    // upload
    var file=new File([""],"./download.jpg");
    const skylink = await client.uploadFile(file);
	console.log(`Upload successful, skylink: ${skylink}`);

    // download
    //await client.downloadFile(skylink);
	//console.log('Download successful');
  } catch (error) {
    console.log(error)
  }
}