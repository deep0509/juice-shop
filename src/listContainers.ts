const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

const account = "<account>";
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  defaultAzureCredential
);

const containerName = "<container name>";

async function main() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const content = "Hello world!";
  const blobName = "newblob" + new Date().getTime();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}

main();
