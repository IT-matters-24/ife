define(function(require, exports, module) {
  require('../js/base.js');
  
  var ret = [];
  var creator = base.$("creator");

  base.addEventListener(creator,"click",function(){
    var items = document.getElementsByName("item");
    for(var i = 0,len = items.length;i < len;i+=1) {
      (function(i){
        if(items[i].checked) {
          var obj = {};
          var text = items[i].previousSibling;
          obj.label = text;
          var type = items[i].getAttribute("data-id");
          obj.type = type;
        }
      })(i);
    }
  }); 


});

