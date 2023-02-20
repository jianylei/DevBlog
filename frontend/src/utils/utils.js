export const getPathStrFromStr = (str, id) => {
  if (str) {
      const regex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug

      return str.replace(regex,' ')
      .replace(/-|\||%|\/|\?|:|\\|\.|"|,+/g, ' ')
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

export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}