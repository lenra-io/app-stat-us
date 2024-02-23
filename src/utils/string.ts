export function dateAndTimeStrToNumber(date: string, time: String) {
  return Date.parse(`${date.trim()} ${time.trim()}`)
}

const dateFormater = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

export function numberToDateAndTimeStr(datetime: number) {
  const datePart: Intl.DateTimeFormatPart[] = dateFormater.formatToParts(datetime)
  const dateTime = datePart.filter(value => value.type != "literal").map((date_time_part) => date_time_part.value).reduce((acc, date_time_part, index) => {
      const isDate = index < 3
      const i = isDate ? 0 : 1
      const currentValue = acc[i]
      acc[i] = [...currentValue, date_time_part]
      return acc
  }, [[], []])

  return [
      dateTime[0].reverse().join('-'),
      dateTime[1].join(':')
  ]
}

export function slugify(str:string):string {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9\.\_\-]/g, '-') // remove non-alphanumeric characters
}

export function capitalize(str:string):string {
  return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`
}
