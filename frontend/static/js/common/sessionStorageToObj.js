export default function sessionStorageToObj(key) {
  return sessionStorage
    .getItem(key)
    .split("{")[1]
    .split("}")[0]
    .split(",")
    .reduce((obj, el) => {
      const [key, val] = el.split(":").map((str) => str.replace(/\"/g, ""));
      obj[key] = val;
      return obj;
    }, {});
}
