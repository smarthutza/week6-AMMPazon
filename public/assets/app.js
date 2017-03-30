// **********************************************
// APP
// **********************************************
document.getElementById('js-select-analytics').onchange = function(e) {
  fetch('GET', `get-data/${e.target.value}`, renderData);
};



// **********************************************
// RENDER
// **********************************************
function renderData(err, results) {
  const resultsDOM = document.querySelector('.results__list');
  resultsDOM.innerHTML = '';
  
  if (err) { 
    resultsDOM.innerHTML = '<li></li>';
  }
  
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
  
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, JSON.parse(xhr.responseText));
    }
  };
  
  xhr.onerror = () => {
    cb(new Error('Database error'));
  };
                 
  xhr.open(method, url, true);
  xhr.send();
}
