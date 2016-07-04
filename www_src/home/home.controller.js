import BarcodeScanner from '../common/services/barcode-scanner/barcode-scanner';

const privates = new WeakMap();

export default class HomeController {
  constructor($mdDialog) {
    'ngInject';

    privates.set(this, {
      $mdDialog
    });

    this.barcodes = [{
      type: 'code128',
      value: '111111'
    }, {
      type: 'upc',
      value: '123456789012'
    }, {
      type: 'qrcode',
      value: 'testing'
    }];
  }

  showPrompt(ev) {
    const me = privates.get(this);
    const confirm = me.$mdDialog.prompt()
      .title('Please, provide the code')
      .textContent('Barcode content')
      .placeholder('Code')
      .ariaLabel('Code')
      .targetEvent(ev)
      .ok('OK')
      .cancel('Cancel');
    me.$mdDialog.show(confirm)
      .then(result => {
        this.status = `Input Result: ${result}`;
      })
      .catch(err => {
        this.status = `Input Cancelled! ${err}`;
      });
  }

  scanBarcode() {
    BarcodeScanner.scan().then(result => {
      this.status = `Scan Result: ${result.text}`;
    })
    .catch(err => {
      this.status = `Barcode Cancelled! ${err}`;
    });
  }
}
