// modified version of http://va2577.github.io/post/51/ to produce ndjson

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('~/Library/Messages/chat.db')
const Iconv = require('iconv').Iconv;
const sjis = new Iconv('UTF-8', 'Shift_JIS//TRANSLIT//IGNORE');
const fs = require('fs');


const filename = './sms.json';
db.serialize(() => {
  const sql = [];
  sql.push('SELECT');
  sql.push('  T2.text');
  sql.push('  , T2.subject');
  sql.push('  , T2.date');
  sql.push('  , CASE T2.is_from_me WHEN 0 THEN \'Received\' WHEN 1 THEN \'Sent\' ELSE \'Unknown\' END AS is_from_me');
  sql.push('  , T3.id');
  sql.push('FROM');
  sql.push('  chat_message_join T0');
  sql.push('  INNER JOIN');
  sql.push('    chat T1');
  sql.push('  ON');
  sql.push('    T0.chat_id = T1.ROWID');
  sql.push('  INNER JOIN');
  sql.push('    message T2');
  sql.push('  ON');
  sql.push('    T0.message_id = T2.ROWID');
  sql.push('  INNER JOIN');
  sql.push('    handle T3');
  sql.push('  ON');
  sql.push('    T2.handle_id = T3.ROWID');
  sql.push('ORDER BY');
  sql.push('  T2.date DESC');

  let msgs = [];

  db.each(sql.join(' '), (err, row) => {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }


    msgs.push({
      text: row.text,
      date: row.date,
      id: row.id,
      fromMe: row.is_from_me,
      subject: row.subject
    });

  }, function(err, rows){
    console.log(msgs)
    fs.writeFileSync(filename, JSON.stringify(msgs) )
  });

});


db.close();