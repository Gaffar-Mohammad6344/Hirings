const ExcelJS = require('exceljs')

module.exports = async function exportExcel(rows, filePath){
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('data')
  if (rows.length) ws.columns = Object.keys(rows[0]).map(k=>({header:k, key:k}))
  rows.forEach(r=> ws.addRow(r))
  await wb.xlsx.writeFile(filePath)
}
