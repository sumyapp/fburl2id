/*
 * 指定URLからJSONを取得、返す
 */
function getFacebookGraphByUserName(username){
  // 同期通信でJSONを取得するライブラリをNode.jsで使うためのライブラリをrequire
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", "http://graph.facebook.com/".concat(username), false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

/*
 * GET home page.
 */
exports.index = function(req, res){
  // request内の変数からfacebook_urlを取得
  var facebook_url = req.query.facebook_url
    console.log(facebook_url)

    // facebook_urlであることを確認する
    if(facebook_url.indexOf("https://www.facebook.com/") != 0) {
      facebook_url = "https://www.facebook.com/zuck";
    }

  // facebook_urlからuser_nameを取得
  var username = facebook_url.replace('https://www.facebook.com/', '')

    // user_nameを使ってGraphAPIを実行、取得
    var json = getFacebookGraphByUserName(username);

  result = JSON.parse(json)

    // jsonをパース
    console.log(result);
  console.log(result.id);

  res.render('index', { 
    title: 'FacebookのURLからFacebookIDを調べるアプリ、fburl2id',
    facebook_url: facebook_url,
    facebook_id: result.id,
  });
};

