onload = () => {
  const handleFormat = (formatter) => textarea.value = formatter(textarea.value, {
    indent_size: 2
  });
  const textarea = document.querySelector('textarea');
  const [js, html, css] = document.querySelectorAll('button');
  js.onclick = () => handleFormat(js_beautify);
  html.onclick = () => handleFormat(html_beautify);
  css.onclick = () => handleFormat(css_beautify);
  textarea.onpaste = async (e) => {
    e.preventDefault();
    // Remove leading space characters
    e.target.value = e.clipboardData.getData('text').replace(/^\s+/, '');
  }
}
