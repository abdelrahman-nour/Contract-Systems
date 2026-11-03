// المكتبات التقيلة بتتحمّل بس لما العميل يدوس "تحميل" (lazy import)
export async function downloadPdf(pageElements, filename) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas-pro'),
    import('jspdf'),
  ])

  if (document.fonts?.ready) await document.fonts.ready

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

  for (let i = 0; i < pageElements.length; i++) {
    const canvas = await html2canvas(pageElements[i], {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
    })
    if (i > 0) pdf.addPage()
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297)
  }

  pdf.save(filename)
}
