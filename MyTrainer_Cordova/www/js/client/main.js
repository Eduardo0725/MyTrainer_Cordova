var client;

function main(){
    client = new Client();
    client.start('map');
    client.validate();
    client.setIntervalUpdate();
}
