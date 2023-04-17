chrome.devtools.panels.create("Formatter", null, "formatter.html");

onload = () => {
  const settings = {
    indent_size: 2
  };
  const handleFormat = (formatter, options = settings) =>
    textarea.value = formatter(textarea.value, options);
  const handleDataTransfer = async (e) => {
    try {
      e.preventDefault();
      let value;
      switch (e.type) {
        case 'paste':
          value = e.clipboardData.getData('text');
          break;
        case 'drop':
          const [file] = e.dataTransfer.files;
          if (!/javascript|html|css|json/.test(file.type)) {
            value = `Dropped file has ${file.type} MIME type.` +
              `Expected file types: text/javascript, text/html, text/css, application/json.`;
            break;
          }
          value = await file.text();
          break;
        default:
          break;
      }
      // Remove leading space characters
      e.target.value = value.replace(/^\s+/, '');
    } catch (err) {
      console.error(err);
    }
  }
  const textarea = document.querySelector('textarea');
  const [js, html, css] = document.querySelectorAll('button');
  js.onclick = () => handleFormat(js_beautify);
  html.onclick = () => handleFormat(html_beautify);
  css.onclick = () => handleFormat(css_beautify);
  textarea.ondrop = textarea.onpaste = handleDataTransfer;
