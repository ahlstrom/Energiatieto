module.exports = function(app){

  app.get('/', function(req, res){
    //render the index page
    res.render('index.jade');
  });

}; 