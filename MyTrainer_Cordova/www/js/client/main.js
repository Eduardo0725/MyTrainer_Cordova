var client;

async function main(){
    client = new Client();
    await client.validate();
    await client.start('map');
    client.setIntervalUpdate();
}
