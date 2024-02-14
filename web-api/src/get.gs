function filterZeroAverages(responseData) {
  // 0でない平均気温のみを保持する配列
  const nonZeroAveragedData = [];
  const nonZeroLabels = [];

  // 平均気温が0でない場合に、データを nonZeroAveragedData に追加
  responseData.data.forEach(function(average, index) {
    if (average !== 0) {
      nonZeroAveragedData.push(average);
      nonZeroLabels.push(responseData.labels[index]);
    }
  });

  // responseData を nonZeroAveragedData と nonZeroLabels に置き換える
  responseData.data = nonZeroAveragedData;
  responseData.labels = nonZeroLabels;

  return responseData;
}

function doGet(e) {
  const content = e.parameter.content
  const time = e.parameter.time

  // スプレッドシートのIDとシート名を指定
  const spreadsheetId = "";
  const sheetName = "気温";

  // スプレッドシートからデータを取得
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  const timeJson = JSON.parse(time)

  // Contentによってデータの形式を変更
  let responseData;
  if (content === '年') {
    // 月ごとの気温データを集計
    const filteredData = values.filter(function(row) {
      return row[0] === timeJson.year
    });

    const monthlyData = Array.from({length: 12}, () => 0);
    filteredData.forEach(function(row) {
      const month = row[1];
      const temperature = row[5];
      monthlyData[month - 1] += temperature;
    });
    const counts = Array.from({length: 12}, () => 0);
    filteredData.forEach(function(row) {
      const month = row[1];
      counts[month - 1]++;
    });
    const averagedData = monthlyData.map(function(sum, index) {
      return counts[index] === 0 ? 0 : sum / counts[index];
    });
    responseData = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      data: averagedData
    };
  } else if (content === '月') {
    // 日ごとの気温データを集計
    const filteredData = values.filter(function(row) {
      return (
        row[0] === timeJson.year &&
        row[1] === timeJson.month
      )
    });

    const dailyData = Array.from({length: 31}, () => 0);
    filteredData.forEach(function(row) {
      const day = row[2];
      const temperature = row[5];
      dailyData[day - 1] += temperature;
    });
    const counts = Array.from({length: 31}, () => 0);
    filteredData.forEach(function(row) {
      const day = row[2];
      counts[day - 1]++;
    });
    const averagedData = dailyData.map(function(sum, index) {
      return counts[index] === 0 ? 0 : sum / counts[index];
    });
    responseData = {
      labels: Array.from({length: 31}, (_, index) => (index + 1).toString()),
      data: averagedData
    };
  } else if (content === '日') {
    // 時ごとの気温データを集計
    const filteredData = values.filter(function(row) {
      return (
        row[0] === timeJson.year &&
        row[1] === timeJson.month &&
        row[2] === timeJson.day
      )
    });

    const hourlyData = Array.from({length: 24}, () => 0);
    filteredData.forEach(function(row) {
      const hour = row[3];
      const temperature = row[5];
      hourlyData[hour] += temperature;
    });
    const counts = Array.from({length: 24}, () => 0);
    filteredData.forEach(function(row) {
      const hour = row[3];
      counts[hour]++;
    });
    const averagedData = hourlyData.map(function(sum, index) {
      return counts[index] === 0 ? 0 : sum / counts[index];
    });
    responseData = {
      labels: Array.from({length: 24}, (_, index) => index.toString()),
      data: averagedData
    };
  } else if (content === '時') {
    // 分ごとの気温データを集計
    const filteredData = values.filter(function(row) {
      return (
        row[0] === timeJson.year &&
        row[1] === timeJson.month &&
        row[2] === timeJson.day &&
        row[3] === timeJson.hour
      )
    });

    const minuteData = Array.from({length: 60}, () => 0);
    filteredData.forEach(function(row) {
      const minute = row[4];
      const temperature = row[5];
      minuteData[minute] += temperature;
    });
    const counts = Array.from({length: 60}, () => 0);
    filteredData.forEach(function(row) {
      const minute = row[4];
      counts[minute]++;
    });
    const averagedData = minuteData.map(function(sum, index) {
      return counts[index] === 0 ? 0 : sum / counts[index];
    });
    responseData = {
      labels: Array.from({length: 60}, (_, index) => index.toString()),
      data: averagedData
    };
  } else {
    responseData = {};
  }

  responseData = filterZeroAverages(responseData);

  // listデータをjsonに変換
  const payload = JSON.stringify(responseData)
  // payloadをreturnするだけではだめ
  // ContentServiceを利用して、responseを作成
  ContentService.createTextOutput()
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(payload);
  // return response-data
  return output;
}
