import * as pdfjs from 'pdfjs-dist'


export default async function Home() {
  return <>
    <p>pdfjs.getDocument is {typeof pdfjs.getDocument}</p>
    <p>(await import ('pdfjs-dist')).default is {typeof (await import('pdfjs-dist')).default}</p>
  </>
}
