document.addEventListener('DOMContentLoaded', function() {
  var fadeDuration = 500;
  const clean = pipe(fixLineBreaks, fixUTF8Entities);

  document.addEventListener('paste', function(e) {
    setTimeout(function(){
      document.execCommand('copy');
    }, 100);
  });

  document.addEventListener('copy', function(e) {
    e.preventDefault();

    var cleaned = clean(document.getElementById('copy-input').value);
    console.log(document.getElementById('copy-input').value);
    console.log(cleaned);
    e.clipboardData.setData('text/plain', cleaned);

    var successMsg = document.createElement('div');
    successMsg.innerText = 'Success! Cleaned version now copied to clipboard!';
    successMsg.classList.add('success-message');
    document.body.appendChild(successMsg);

    var fadeIn = successMsg.animate({
      opacity: [0, 1]
    }, fadeDuration);

    fadeIn.onfinish = function() {
      successMsg.style.opacity = 1;
      setTimeout(function(){
        window.close();
      }, 2000);
    };
  });
}, false);

function pipe(...fns) {
  return fns.reduce((f, g) => (...args) => g(f(...args)));
}

function fixLineBreaks(text) {
  return text.split('\n\n').map(par => par.replace(/\n/g, ' ')).join('\n\n');
}

function fixUTF8Entities(text) {
  return text; // I was worried at one point about handling these but might not be an issue
}
