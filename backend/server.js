
// 필요한 모듈들을 가져오기
const express = require("express")
const bodyParser = require("body-parser")

const db = require('./db')

// Express 서버를 생성
const app = express()

// json 형태로 오는 요청의 본문을 해석할 수 있도록 변형
app.use(bodyParser.json())

// table create
db.pool.query(
    `CREATE TABLE lists (
        id INTEGER AUTO_INCREMENT,
        value TEXT,
        PRIMARY KEY (id)
    )`, (err, results, fileds) => {
        console.log('results', results)
    }
)


// db lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', function(req, res) {
    // db에서 모든 정보 가져오기
    db.pool.query('SELECT * FROM lists;', 
    (err, results) => {
        if(err) 
            return res.status(500).send(err)
        else
            return res.json(results)
    })
})
// clien에서 입력한 값을 데이터베이스에 입력하기
app.post('/api/value', (req, res) => {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, 
        (err) => {
            if(err) 
                return res.status(500).send(err)
            else
                return res.json({ success : true, value : req.body.value})
        })
})



app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다.')
})