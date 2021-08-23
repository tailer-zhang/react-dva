'use strict';
// import Storage from './Storage';
// import JSEncrypt from './jsencrypt';
import CryptoJS from 'crypto-js';
import * as constants from './commonUtil';

// const privateKey = ''
// const publishKey = ''

// //异步的方式得到结果，需要异步方式通知结果的返回
// export function getEncryptKeys(backResult)
// {
//  if(privateKey==''||publishKey=='')
//  {
//    //从本地存储中看是否能得到公私钥
//    Storage.get('ENCRYPT_KEYS')
//     .then(
//       (keys) => {
//        if(keys==null||keys.privateKey==undefined||keys.publishKey==undefined)
//        {
//            var resultKeys = createEncrypt();
//            publishKey = resultKeys.publishKey;
//            privateKey = resultKeys.privateKey;
//           //  resultKeys.publishKey=publishKey;
//           //  resultKeys.privateKey=privateKey;
//            Storage.save('ENCRYPT_KEYS', resultKeys);
//        }
//        else {
//          publishKey = keys.publishKey;
//          privateKey = keys.privateKey;
//        }
//        backResult(publishKey,privateKey);
//     }
//    );
//  }
//  else{
//    //直接返回结果
//    backResult(publishKey,privateKey);
//  }
// }
//
// function createEncrypt()
// {
//     var keySize = parseInt(1024);
//     var genPubPri = new JSEncrypt({default_key_size: keySize});
//     genPubPri.getKey();
//     return ({
//        publishKey:genPubPri.getPublicKey(),
//        privateKey:genPubPri.getPrivateKey()
//     });
//
// }

// export function decryptStr(encryptStr)
// {
//   var genPubPri = new JSEncrypt();
//   genPubPri.setPrivateKey(privateKey);
//   var result = genPubPri.decrypt(encryptStr);
//   if(result==false)
//    return '';
//   return result;
// }
export function decryptStr(encryptStr)
{
  if(encryptStr==undefined)
    return '';
    // encryptStr = '4ZBWK+2QuEhSnkUDKOZSBeOOQEHFIVY/9FBeQvLxEYB9ZUBQaQjibOv+Dkok3qOaxBJFBdMl7nY2jTDcLjNv1ZcYB3qTaL35RV56pUp1qIc=';
  var key11 = CryptoJS.enc.Utf8.parse(constants.key);
    var iv11  = CryptoJS.enc.Utf8.parse(constants.iv);

   var ens11 = CryptoJS.enc.Base64.parse(encryptStr).toString();
  var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Hex.parse(ens11)
    });

    var decrypted = CryptoJS.AES.decrypt(cipherParams, key11, { iv: iv11, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypted);

}
