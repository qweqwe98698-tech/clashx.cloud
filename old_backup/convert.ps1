$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
try {
    $workbook = $excel.Workbooks.Open("c:\Users\user\OneDrive\Desktop\clashx.cloud博客\aff_data.xls")
    $sheet = $workbook.Sheets.Item(1)
    $sheet.SaveAs("C:\Users\user\OneDrive\Desktop\clashx.cloud博客\aff_data.csv", 6)
    $workbook.Close($false)
    Write-Host "Success!"
} catch {
    Write-Error $_
} finally {
    $excel.Quit()
}
