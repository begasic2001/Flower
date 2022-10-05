const sha256 = require("crypto-js/sha256"); ;
const hmacSHA512 = require("crypto-js/hmac-sha512");
const Base64 = require("crypto-js/enc-base64");
const nonce = "KIMANH456";
const message ="MINHTHANH456"
const privateKey="MINHTHANHKIMANH456"
const path = "minhthanhlovekimanh456"
const hashDigest = sha256(nonce + message);
const hmacDigest1 = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));

console.table({ hmacDigest1 });
