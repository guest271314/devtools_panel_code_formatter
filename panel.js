chrome.devtools.panels.create("Formatter", null, "formatter.html");

onload = () => {
  const textarea = document.querySelector('textarea');
  const [js, html, css] = document.querySelectorAll('button');
  js.onclick = () => textarea.value = js_beautify(textarea.value, {
    indent_size: 2
  });
  html.onclick = () => textarea.value = html_beautify(textarea.value, {
    indent_size: 2
  });
  css.onclick = () => textarea.value = css_beautify(textarea.value, {
    indent_size: 2
  });
  textarea.onpaste = (e) => {
    e.preventDefault();
    // Remove leading space characters
    e.target.value = e.clipboardData.getData('text').replace(/^\s+/, '');
  }
}
