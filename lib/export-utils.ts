import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface Registration {
  _id: string
  fullName: string
  email: string
  createdAt: string
}

export const exportToExcel = (data: Registration[], filename: string = 'registrations') => {
  // Prepare data for export (remove _id and format)
  const exportData = data.map((item, index) => ({
    '#': index + 1,
    'Full Name': item.fullName,
    'Email': item.email,
    'Created At': new Date(item.createdAt).toLocaleDateString()
  }))

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData)
  
  // Set column widths
  const columnWidths = [
    { wch: 5 },  // #
    { wch: 25 }, // Full Name
    { wch: 30 }, // Email
    { wch: 15 }  // Created At
  ]
  worksheet['!cols'] = columnWidths

  // Create workbook and add worksheet
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations')

  // Generate file
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

export const exportToPDF = (data: Registration[], filename: string = 'registrations') => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(18)
  doc.text('Registrations Report', 14, 20)

  // Add date
  doc.setFontSize(11)
  doc.setTextColor(100)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28)

  // Prepare table data
  const headers = [['#', 'Full Name', 'Email', 'Created At']]
  const rows = data.map((item, index) => [
    String(index + 1),
    item.fullName,
    item.email,
    new Date(item.createdAt).toLocaleDateString()
  ])

  // Generate table
  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 35,
    theme: 'grid',
    headStyles: {
      fillColor: [16, 185, 129], // Green color matching your theme
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' },
      1: { cellWidth: 50 },
      2: { cellWidth: 70 },
      3: { cellWidth: 40, halign: 'center' }
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  })

  // Add footer
  const pageCount = (doc as any).internal.getNumberOfPages()
  doc.setFontSize(8)
  doc.setTextColor(128)
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  // Save the PDF
  doc.save(`${filename}.pdf`)
}
