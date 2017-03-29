console.log('This works');

function chgAction() {
    var form = document.form;

    console.log('chgAction()');


    switch (form.recipient.selectedIndex) {
        case 1:
            form.action = "/bestsellers";
            break;
        case 2:
            form.action = "/sales?q=01/01/2017";
            break;
        case 3:
            form.action = "/sales?q=all";
            break;
        case 3:
            form.action = "/topcustomers";
            break;

    }
}
  console.log(form.recipient.selectedIndex);
