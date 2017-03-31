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
    resultsDOM.innerHTML = '<li>Sorry, database error</li>';
  }

  resultsDOM.innerHTML = results.map(item => {
    return `
      <li class="analytics-item">
        ${Object.keys(item).map(key => {
          return `<span class="item__span">${key.replace(/_/g,' ').replace(/^[a-z]/gi, match => match.toUpperCase())}: ${item[key]} </span>`;
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
