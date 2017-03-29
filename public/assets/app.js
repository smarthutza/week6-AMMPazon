console.log('This works');

document.getElementById('selection').onchange = function(){
  console.log(document.getElementById('FORM_ID').action = '/'+this.value);
};
