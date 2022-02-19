const { assert } = require("console");
const Storage  = artifacts.require("Storage");


it('Upload', async() => {
    const storage = await Storage.deployed();
    const result = await storage.addFile("new","new","new","new");
    console.log("upload : ",result);
    assert(result);
});


it('got a file', async() => {
    const storage = await Storage.deployed();
    const result = await storage.getFile();
    console.log("read data : ",result.toString());
    assert(result);
});

it('read data', async() => {
    const storage = await Storage.deployed();
    const result = await storage.getData();
    console.log("read data : ",result);
    assert(result);
});