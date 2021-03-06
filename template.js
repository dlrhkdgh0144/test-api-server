const sanitizeHtml = require('sanitize-html');

module.exports = {
    HTML: function (title, list) {
        return `
    <!doctype html>
    <html>
    <head>
      <title>Monitoring Server</title>
      <meta charset="utf-8">
      <meta HTTP-EQUIV="refresh" CONTENT="1">
    </head>
    <body>
      <h1 class="title" style="text-align: center">${title}</h1>
      ${list}
    </body>
    <style>
        .title{
            margin: 10px;
            padding: 20px;
        }
        table{
            width: 100%;
            margin: auto;
            text-align: center;
            border: 1px solid;
        }
        th{
            background-color: darkgray;
            padding: 10px;
        }
        td{
            padding: 5px;
        }
    </style>
    </html>
    `;
    },
    list: function (topics) {
        let list = '<table id="dashboard">' +
            '<th>id</th>'+
            '<th>name</th>'+
            '<th>expression</th>'+
            '<th>answer</th>'+
            '<th>time</th>';
        let i = 0;
        while (i < topics.length) {
            list = list + `<tr>`+`<td>${sanitizeHtml(topics[i].id)}</td>`
                +`<td>${sanitizeHtml(topics[i].name)}</td>`
                +`<td>${sanitizeHtml(topics[i].expression)}</td>`
                +`<td>${sanitizeHtml(topics[i].answer)}</td>`
                +`<td>${sanitizeHtml(topics[i].time)}</td>`+`</tr>`;
            i = i + 1;
        }
        list = list + '</table>';
        return list;
    },
}