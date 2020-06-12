var convert = require('xml-js');
const {BlobServiceClient} = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const xml = req.body.data;
    var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
    
    const blobServiceClient = await BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=storageaccountbryana477;AccountKey=fNdvyKxGk9dCSft6lUVhfjPt+q8lDyPJWzC8/dNeUt5sfEE7wAW6Qus9G8MHTkNSRcaNmiUN9+EdhjtF1BRT9Q==;EndpointSuffix=core.windows.net");
    const containerClient = await blobServiceClient.getContainerClient("jsondata");

    const blobName = req.body.key + '.json';
    
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    const uploadBlobResponse = await blockBlobClient.upload(result1, result1.length);
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);   

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result1,
        headers: {
            'Content-Type': 'application/json'
        }
    };
}