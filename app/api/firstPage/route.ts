import { NextRequest, NextResponse } from 'next/server'
import * as pdfjs from 'pdfjs-dist/build/pdf.min.mjs'
import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api'


function mergeTextContent(textContent: TextContent) {
  return textContent.items.map(item => {
    const { str, hasEOL } = item as TextItem
    return str + (hasEOL ? '\n' : '')
  }).join('')
}

export async function GET(req: NextRequest) {
  await import('pdfjs-dist/build/pdf.worker.mjs')
  const url = req.nextUrl.searchParams.get('url')
    ?? 'https://www.africau.edu/images/default/sample.pdf'
  try {
    const pdf = await pdfjs.getDocument(url).promise
    if (!pdf.numPages) return NextResponse.json({ status: 'ok', text: null })
    const page = await pdf.getPage(1)
    const textContent = await page.getTextContent()
    return NextResponse.json({ status: 'ok', text: mergeTextContent(textContent )})
  } catch (err) {
    return NextResponse.json({ status: 'error', error: String(err) })
  }
}
