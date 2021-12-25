var fs = require("fs");

export default function toString() {
  fs.readFile("toast.js", "utf-8", function (err, data) {
    console.log(data);
  });
}
