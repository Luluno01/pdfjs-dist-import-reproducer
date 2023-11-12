import * as pdfjs from 'pdfjs-dist/build/pdf.min.mjs'
import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api'


function mergeTextContent(textContent: TextContent) {
  return textContent.items.map(item => {
    const { str, hasEOL } = item as TextItem
    return str + (hasEOL ? '\n' : '')
  }).join('')
}

export default async function Home() {
  await import('pdfjs-dist/build/pdf.worker.min.mjs')
  const pdf = await pdfjs.getDocument('https://www.africau.edu/images/default/sample.pdf').promise
  const page = await pdf.getPage(1)
  const textContent = await page.getTextContent()
  return <>
    <p>pdfjs.getDocument is {typeof pdfjs.getDocument}</p>
    <pre><code>{mergeTextContent(textContent)}</code></pre>
  </>
}
