import barcodeScanner from '../common/services/barcode-scanner/barcode-scanner';

const privates = new WeakMap();

export default class HomeController {
  constructor($scope, $mdDialog, pouchDBService) {
    'ngInject';

    let db;
    const createDb = () => pouchDBService.createDb('barcodes');
    const showBarcodes = () => {
      pouchDBService.getAllFromDb(db)
        .then(barcodes => {
          if (!barcodes) {
            return;
          }
          this.barcodes = barcodes.rows.map(row => ({
            type: row.doc.type,
            value: row.doc.value
          }));
          $scope.$digest();
        })
        .catch(() => {
          this.barcodes = [];
          db = createDb();
          $scope.$digest();
        });
    };
    db = createDb();
    showBarcodes();

    privates.set(this, {
      $mdDialog,
      pouchDBService,
      parseBarcodeType(type) {
        let result = type.toLowerCase();
        switch (result) {
          case 'code_128':
          default:
            return 'code128';
          case 'upc_a':
          case 'upc_e':
            return 'upc';
          case 'ean_13':
            return 'ean13';
          case 'qr_code':
            return 'qrcode';
        }
      },
      showAlert(title, msg) {
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title(title)
            .textContent(msg)
            .ariaLabel(title)
            .ok('ok')
        );
      },
      saveBarcode(barcodeValue, barcodeType = 'code128') {
        pouchDBService.addItemToDb(db, {
          type: this.parseBarcodeType(barcodeType),
          value: barcodeValue
        })
        .then(showBarcodes)
        .catch(err => {
          this.showAlert('Error saving barcode', err);
        });
      },
      clearAllBarcodes() {
        pouchDBService.destroyDb(db)
        .then(showBarcodes)
        .catch(err => {
          this.showAlert('Error deleting barcodes', err);
        });
      }
    });
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
        me.saveBarcode(result);
      })
      .catch(err => {
        me.showAlert('Input scan cancelled', err);
      });
  }

  scanBarcode() {
    const me = privates.get(this);
    barcodeScanner.scan().then(result => {
      me.saveBarcode(result.text, result.format);
    })
    .catch(err => {
      me.showAlert('Barcode scan cancelled', err);
    });
  }

  clearAllBarcodes() {
    privates.get(this).clearAllBarcodes();
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  showAbout() {
    const me = privates.get(this);
    me.showAlert('Barcode Collector', 'Developed by Danilo Cestari');
  }
}
