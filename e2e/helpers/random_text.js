exports.getRandomString = function (characterLength) {
    var randomText = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < characterLength; i++)
        randomText += possible.charAt(Math.floor(Math.random() * possible.length));
    return randomText;
};

exports.getRandomNumber = function (characterLength) {
    var randomNumber = "";
    var possible = "0123456789";
    for (var i = 0; i < characterLength; i++)
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    return randomNumber;
};