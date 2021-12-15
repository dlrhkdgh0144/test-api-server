//express 모듈 불러오기
const express = require("express");

//template 불러오기
const template = require('./template.js');

//express 사용
const app = express();

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//임시 데이터
const users = [
    { id: 2020310001, name: "유저1", time: "2021-10-29T11:32:25.001Z", expression: "30*(4/2+1)" },
    { id: 2020310002, name: "유저2", time: "2021-11-17T06:14:09.001Z", expression: "1+1" },
    { id: 2020310003, name: "유저3", time: "2021-11-25T12:46:21.001Z", expression: "9-2*3" },
];

/**
 * 파라미터 변수 뜻
 * req : request 요청
 * res : response 응답
 */

/**
 * @path {GET} http://localhost:3000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 *
 * For main dashboard page
 */
app.get("/", (req, res) => {

    //User 데이터 반환

    const title = "Title"
    const list = template.list(users);
    const html = template.HTML(title,list);
    //res.writeHead(200);
    res.send(html);
});

/**
 * @path {GET} http://localhost:3000/api/users
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
app.get("/api/users", (req, res) => {

    //유저 정보 반환
    res.writeHead(200);
    res.json({ok: true, users: users});
})

/**
 * @path {GET} http://localhost:3000/api/users/user?user_id=1
 * @description Query Params 요청 데이터 값이 있고 반환 값이 있는 GET Method
 *
 *  Query Params 방식
 *  user 뒤에 user_id변수를 통해 값을 찾아 올수 있다.
 *  &를 통해 두번째 변수를 받아서 사용할 수 있다.(/user?user_id=1&name="유저1")
 *
 */
app.get("/api/users/user", (req, res) => {

    const user_id = req.query.id

    //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
    const user = users.filter(data => data.id == user_id);

    res.json({ok: false, user: user})
})

/**
 * @path {GET} http://localhost:3000/api/users/userBody
 * @description Body 요청 데이터 값이 있고 반환 값이 있는 GET Method
 *
 *  post로 요청시 body에 데이터를 담아서 보낼수 있듯이 get도 사용이 가능하다.
 */
app.get("/api/users/userBody", (req, res) => {

    const user_id = req.body.id

    //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
    const user = users.filter(data => data.id == user_id);

    res.json({ok: false, user: user})
})



/**
 * @path {GET} http://localhost:3000/api/users/:user_id
 * @description Path Variables 요청 데이터 값이 있고 반환 값이 있는 GET Method
 *
 *  Path Variables 방식
 *
 *  ex) 아래 GET 주소 에서 :user_id 는 서버에서 설정한 주소 키 값이다.
 *      값을 찾을 때는 req.params.user_id 로 값을 찾는다.
 *
 *  *주의 사항*
 *  :user_id 이 부분은 변수이기 때문에
 *  경로가 /users/1 이거나 /users/2 이거 일때 둘다 라우터를 거치게 된다.
 *  그렇기 때문에 다른 라우터 보다 아래 있어야 한다.
 */
app.get("/api/users/:user_id", (req, res) => {

    const user_id = req.params.id

    //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
    const user = users.filter(data => data.id == user_id);

    res.json({ok: true, user: user})
})


/**
 * @path {POST} http://localhost:3000/api/users/add
 * @description POST Method
 *
 *  POST 데이터를 생성할 때 사용된다.
 *  req.body에 데이터를 담아서 보통 보낸다.
 *
 *  Use when calculator add history
 */
app.post("/api/users/add", (req, res) => {

    // 구조분해를 통해 req 내용 추출
    const { id, name, time, expression } = req.body

    //const user = users.concat({id, name, time, expression});
    users.push({id, name, time, expression});
    console.log(`Add id:${id} name:${name} time:${time} exp:${expression}`);

    res.json({ok: true, users: users})
})

/**
 * 서버 정상 구동 시 API Server on 메시지 출력
 * If server operation correctly print API Server on
 *
 * Application port configuration on here
 */
app.listen(3000, () => console.log("API Server on"));