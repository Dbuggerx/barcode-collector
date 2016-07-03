const privates = new WeakMap();

export default class HomeController {
  constructor($mdDialog) {
    'ngInject';

    privates.set(this, {
      $mdDialog
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
        this.status = `Result: ${result}`;
      }, () => {
        this.status = 'Cancelled!';
      });
  }
}
