(async () => {
  const pdfjs = await import('pdfjs-dist')
  console.log(typeof pdfjs.getDocument)
})()
