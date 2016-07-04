import jsbarcode from 'jsbarcode';
import QRCode from 'davidshimjs/qrcodejs';

export default function ($document) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      barcodeType: '@',
      barcodeValue: '@'
    },
    link(scope, el) {
      if (scope.barcodeType === 'qrcode') {
        let code = new QRCode(el[0], {
          width: 128,
          height: 128
        });
        code.makeCode(scope.barcodeValue);
      } else {
        let svg = document.createElement('img');
        jsbarcode(svg, scope.barcodeValue, {
          format: scope.barcodeType,
          displayValue: true
        });
        el[0].appendChild(svg);
      }
    }
  };
}
