var handleData = function (filter, origData) {
  var result = [];

  var curData, reKeywords, isMatch;

  for (var key in origData) {
    curData = origData[key];

    if (filter.author && curData.author !== filter.author) {
      continue;
    }
    if (0 !== filter.department && curData.department !== filter.department) {
      continue;
    }
    if (0 !== filter.workType && curData.workType !== filter.workType) {
      continue;
    }
    if (filter.startTime && filter.startTime > curData.createTime) {
      continue;
    }
    if (filter.endTime && filter.endTime < curData.createTime) {
      continue;
    }
    if (filter.keywords) {
      reKeywords = new RegExp(filter.keywords, "i");
      isMatch = false;
      if (reKeywords.test(curData.author) ||
        reKeywords.test(curData.name) ||
        reKeywords.test(curData.content)
      ) {
        isMatch = true;
      }
      if (!isMatch) {
        continue;
      }
    }
    result.push(curData);
  }

  return result;
};

onmessage = function(event) {
  var dataObj = JSON.parse(event.data);
  var result = handleData(dataObj.filter, dataObj.origData);
  postMessage(JSON.stringify(result));
};