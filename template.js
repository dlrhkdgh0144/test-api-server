const sanitizeHtml = require('sanitize-html');

module.exports = {
    HTML: function (title, list) {
        return `
    <!doctype html>
    <html>
    <head>
      <title>Monitoring Server - ${title}</title>
      <meta charset="utf-8">
      <meta HTTP-EQUIV="refresh" CONTENT="1">
    </head>
    <body>
      <h1 style="text-align: center">Dashboard</h1>
      ${list}
    </body>
    </html>
    `;
    },
    list: function (topics) {
        let list = '<table style="text-align: center" width="80%" margin="auto">' +
            '<th>id</th>'+
            '<th>name</th>'+
            '<th>expression</th>'+
            '<th>time</th>';
        let i = 0;
        while (i < topics.length) {
            list = list + `<tr>`+`<td>${sanitizeHtml(topics[i].id)}</td>`
                +`<td>${sanitizeHtml(topics[i].name)}</td>`
                +`<td>${sanitizeHtml(topics[i].expression)}</td>`
                +`<td>${sanitizeHtml(topics[i].time)}</td>`+`</tr>`;
            i = i + 1;
        }
        list = list + '</table>';
        return list;
    },
}