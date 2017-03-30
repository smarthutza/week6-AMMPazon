console.log('This works');

document.getElementById('js-select-analytics').onchange = function(e) {
  console.log(e.target.value);
  fetch('GET', `get-data/${e.target.value}`, renderData);
};



// **********************************************
// RENDER
// **********************************************
function renderData(err, results) {
  if (err) {console.log(err);}
  const resultsDOM = document.querySelector(".results__list");
  resultsDOM.innerHTML = "";
  resultsDOM.innerHTML = results.map(item => {
    return `
      <li>
        ${Object.keys(item).map(key => {
          return `<span>${item[key]}</span>`;
        }).join('')}
      </li>
    `;
  }).join('');

}


// **********************************************
// FETCH
// **********************************************
function fetch(method, url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, JSON.parse(xhr.responseText));
    }
  };
  xhr.open(method, url, true);
  xhr.send();
}
