console.log('This works');

document.getElementById('js-select-analytics').onchange = function(e) {
  console.log(e.target.value);
  fetch('GET', `get-data/${e.target.value}`, renderData);
};



// **********************************************
// RENDER
// **********************************************
function renderData(err, res) {
  console.log('=======render', res);
}


// **********************************************
// FETCH
// **********************************************
function fetch(method, url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    }
  };
  xhr.open(method, url, true);
  xhr.send();
}
