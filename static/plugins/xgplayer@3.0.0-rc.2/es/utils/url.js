export var getAbsoluteURL = function getAbsoluteURL(url) {
  // Check if absolute URL
  if (!url.match(/^https?:\/\//)) {
    var div = document.createElement('div');
    div.innerHTML = "<a href=\"".concat(url, "\">x</a>");
    url = div.firstChild.href;
  }

  return url;
};