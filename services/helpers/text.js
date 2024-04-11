export const encodeTextURL = text => {
  const nomalizedString = text.normalize('NFD').replace(/\p{Diacritic}/gu, '')
  // str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  // str.normalize('NFD').replace(/\p{Diacritic}/gu, '')
  // console.log(text, nomalizedString, encodeURI(nomalizedString))
  return encodeURI(nomalizedString)
}

export const getInitials = ({string1, string2, string3})  => {
  let initials = ''
  if(string1 && typeof string1==='string' && !string2 && !string3) {
    initials = string1.split(" ").map((n)=>n[0]).join("")
    if (initials.length <= 1) {
    initials = string1.substring(0, 2).toUpperCase()
    }
    return initials
  }
  if(string1 && typeof string1==='string' && string2 && typeof string2==='string' && !string3) {
    initials = string1.substring(0, 1).toUpperCase() + string2.substring(0, 1).toUpperCase()
    return initials
  }
  if(string1 && typeof string1==='string' && string2 && typeof string2==='string' && string3 && typeof string3==='string') {
    initials = string1.substring(0, 1).toUpperCase() + string2.substring(0, 1).toUpperCase() + string3.substring(0, 1).toUpperCase()
    return initials
  }
  return ''
}
