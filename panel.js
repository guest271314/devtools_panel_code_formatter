chrome.devtools.panels.create("Formatter", null, "formatter.html");

onload = () => {
  const options = {
    indent_size: 2
  };
  const handleFormat = (formatter, options) => textarea.value = formatter(textarea.value, options);
  const textarea = document.querySelector('textarea');
  const [js, html, css] = document.querySelectorAll('button');
  js.onclick = () => handleFormat(js_beautify, options);
  html.onclick = () => handleFormat(html_beautify, options);
  css.onclick = () => handleFormat(css_beautify, options);
  textarea.onpaste = (e) => {
    e.preventDefault();
    // Remove leading space characters
    e.target.value = e.clipboardData.getData('text').replace(/^\s+/, '');
  }
}
