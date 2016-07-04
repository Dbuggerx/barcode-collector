/* global cordova */

export default class BarcodeScanner {
  static scan() {
    return new Promise(function (resolve, reject) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          if (!result.cancelled) {
            resolve(result);
          } else {
            reject(result);
          }
        },
        function (error) {
          reject(error);
        }
      );
    });
  }
}
