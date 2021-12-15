const sanitizeHtml = require('sanitize-html');

module.exports = {//함수들 배열
    HTML: function (title, list) {
        return `
    <!doctype html>
    <html>
    <head>
      <title>Monitoring Server - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1>Dashboard</h1>
      ${list}
    </body>
    </html>
    `;
    },
    list: function (topics) {
        let list = '<table>' +
            '<th>id</th>'+
            '<th>name</th>'+
            '<th>expression</th>'+
            '<th>time</th>';
        let i = 0;
        while (i < topics.length) { //객체로 전달 받은 것에서 각각의 id와 title을 뿌려줌.
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