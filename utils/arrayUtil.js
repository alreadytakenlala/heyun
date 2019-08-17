/**
 * 数组转换为字符串
 */
const arrayConversionString = array => {
  let chooseItems = []; //选中的数据
  array.forEach(item => {
    if (item != null) chooseItems.push(item);
  });
  let chooseString = ""; //保存数据的字符串
  chooseItems.forEach((item, i) => {
    chooseString += item;
    ++i != chooseItems.length ? chooseString += ',' : ''
  })
  return chooseString;
}

/**
 * 接受两个数组，依据数据对比，把第二个数组按第一个数组排序，只拷贝相同的部分数据，其余留空
 */
const contrastSortArray = (array1, array2) => {
  let array3 = []; //data中的"选中数据"
  array1.forEach((item, i) => {
    for (let j = 0; j < array2.length; j++) {
      if (array2[j] == item) {
        array3[i] = item;
        break;
      }
    }
  })
  return array3;
}

/**
 * 是否全选
 */
const isSelectAll = (bigList, smallList) => {
  let selectAll = false;
  for (let i = 0; i < bigList.length; i++) {
    if (smallList[i] == null)
      break;
    if (i == (bigList.length - 1)) {
      selectAll = true;
    }
  }
  return selectAll;
}

/**
 * 是否全空
 */
const isAllEmpty = (array) => {
  let allEmpty = true;
  for (let i = 0; i < array.length; i++) {
    if (array[i] != null) {
      allEmpty = false;
      break;
    }
  }
  return allEmpty;
}
/**
 * 深拷贝, 会丢失对象类型
 */
const deepClone = (array, newArray) => {
  let type = array.constructor.toString();
  if (type.indexOf("Array") > -1) {
    for (let i = 0; i < array.length; i++) {
      let type = array[i].constructor.toString();
      if (type.indexOf("Array") > -1) {
        newArray[i] = [];
        deepClone(array[i], newArray[i]);
      }
      else if (type.indexOf("Object") > -1) {
        newArray[i] = {};
        deepClone(array[i], newArray[i]);
      }
      else
        newArray[i] = array[i];
    }
  }
  else if (type.indexOf("Object") > -1)
    for (let item in array) {
      let type = array[item].constructor.toString();
      if (type.indexOf("Array") > -1) {
        newArray[item] = [];
        deepClone(array[item], newArray[item]);
      }
      else if (type.indexOf("Object") > -1) {
        newArray[i] = {};
        deepClone(array[i], newArray[i]);
      }
      else {
        newArray[item] = array[item];
      }
    }
}

const pagination = (index, size, list) => {
  let array = [];
  let tempIndex = 1;
  for (let i = 0; i < list.length; i++) {
    if (index == tempIndex) {
      array.push(list[i]);
    }
    if ((i + 1) % size == 0) {
      tempIndex++;
    }
  }
  return array;
}

module.exports = {
  arrayConversionString: arrayConversionString,
  contrastSortArray: contrastSortArray,
  isSelectAll: isSelectAll,
  isAllEmpty: isAllEmpty,
  deepClone: deepClone,
  pagination: pagination
}