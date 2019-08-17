/**
 * 检查是否是手机号码
 */
const isPhoneNumber = phoneNumber => {
  if (phoneNumber == null || phoneNumber == undefined || phoneNumber == '')
    return false;
  else if (phoneNumber.length != 11)
    return false;
  for (let i = 0; i < phoneNumber.length; i++) {
    if (isNaN(phoneNumber.charAt(i))) {
      return false;
    }
  }
  return true;
}

/**
 * 检查密码使用是由数字，字母大小写，特殊字符组成
 */
const isPassword = password => {
  for (let i = 0; i < password.length; i++) {
    let cr = password.charAt(i);
    if (!isNumber(cr) && !isLetter(cr) && !isSpecialChar(cr)) {
      return false;
    }
  }
  let hasNumber = false, hasLetter = false, hasSpecialChar = false;
  for (let i = 0; i < password.length; i++) {
    let cr = password.charAt(i);
    if (isNumber(cr))
      hasNumber = true;
    else if (isLetter(cr))
      hasLetter = true;
    else if (isSpecialChar(cr))
      hasSpecialChar = true;
  }
  if (hasNumber && hasLetter && hasSpecialChar) {
    return true;
  } else {
    return false;
  }
}

const isNumber = char => {
  return !isNaN(char);
}

const isLetter = char => {
  let unicode = char.charCodeAt();
  if ((unicode > 64 && unicode < 91) ||
    (unicode > 96 && unicode < 123)) {
      return true;
  }
  return false;
}

const isSpecialChar = char => {
  let unicode = char.charCodeAt();
  if ((unicode > 0 && unicode < 48) || (unicode > 57 && unicode < 65) ||
    (unicode > 90 && unicode < 97) || (unicode > 123 && unicode < 10000)) {
    return true;
  }
  return false;
}

module.exports = {
  isPhoneNumber: isPhoneNumber,
  isPassword: isPassword
}