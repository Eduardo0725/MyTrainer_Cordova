module.exports = function parseToArrayString(name){
    return name.split(' ').map(name => name.trim());
}