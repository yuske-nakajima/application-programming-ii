function doPost(e) {
  const string = e.postData.getDataAsString()

  // temperature: number
  const {date, time, temperature} = JSON.parse(string)

  const SPREADSHEET_ID= ''

  // シート取得
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID)
  var sheet = ss.getSheetByName('気温')

  // データ入力
  const now = new Date()
  sheet.appendRow([
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    temperature
  ])

  return ContentService.createTextOutput(JSON.stringify(e));
}
