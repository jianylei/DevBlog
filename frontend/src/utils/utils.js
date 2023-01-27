export const getPathStrFromStr = (str, id) => {
  if (str) {
      return str.replace(/-|\||%|\/|\?|:|\\|\.|,+/g, ' ')
      .replace(/ +/g, '-')
      .replace(/-$/, '')
      .toLowerCase() + (id ? '-' + id : '')
  }
}

export const getIdFromPathStr = (path) => {
  const lastIdx = path.lastIndexOf('-')
  return path.slice(lastIdx + 1)
}

export const getTimeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 604800;
  if (interval > 1) {
    return new Date(date).toLocaleString('en-US', 
      { day: 'numeric', month: 'short', year: 'numeric' })
  }
  interval = seconds / 86400;
  if (interval < 2 && interval > 1) {
    return Math.floor(interval) + " day ago";
  }
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval < 2 && interval > 1) {
    return Math.floor(interval) + " hour ago";
  }
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

export const delay = ms => new Promise(res => setTimeout(res, ms))