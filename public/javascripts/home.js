var input = document.querySelector('[name=search]');
var loadTimeout;
input.focus();
input.addEventListener('keydown', keyHandler, false);

function keyHandler(e) {
  if(loadTimeout) clearTimeout(loadTimeout);
  loadTimeout = setTimeout(loadData, 1000);
}

function loadData() {
  var query = input.value;
}