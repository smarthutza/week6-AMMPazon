console.log('This works');

function chgAction() {
    var form = document.form;

    console.log('chgAction()');


    switch (form.recipient.selectedIndex) {
        case 1:
            form.action = "/best";
            break;
        case 2:
            form.action = "/salesq=01/01/2017";
            break;
        case 3:
            form.action = "/salesq=all";
            break;
        case 3:
            form.action = "/custval";
            break;

    }
}
  console.log(form.recipient.selectedIndex);
