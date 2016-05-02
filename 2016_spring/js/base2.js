define(function(require, exports, module) {
  var base = {};

  /*
  *function 在页面加载完成后 绑定事件队列
  *@param func 事件
  *return null
  */
  base.addLoadEvent = function(func) {
    var oldonload = window.onload;
    if(typeof window.onload != 'function') {
      window.onload = func;
    } else {
      window.onload = function() {
        oldonload();
        func();
      }
    }
  }

  /*
  *function 跨浏览器绑定函数
  *@param eventTarget 绑定事件的目标
  *@param eventType 事件类型
  *@param handler 事件处理函数
  *return null
  */
  base.addEventListener = function(eventTarget,eventType,handler) {
    if(eventTarget.addEventListener) {
      eventTarget.addEventListener(eventType,handler,false);
    } else if(eventTarget.attachEvent) {
      eventType = 'on' + eventType;
      eventTarget.attachEvent(eventType,handler);
    } else {
      eventTarget['on'+eventType] = handler;
    }
  }

  /*
  *function 跨浏览器移除事件函数
  *@param eventTarget 移除事件目标
  *@param eventType 移除事件类型
  *@param handler 移除事件的句柄
  *return  null
  */
  base.removeEventListener = function(eventTarget,eventType,handler){
    if(eventTarget.removeEventListener) {
      eventTarget.removeListenerEvent(eventType,handler,false);
    } else if(eventTarget.detachEvent) {
      eventType = 'on' + eventType;
      eventTarget.detachEvent(eventType,handler);
    } else {
      eventTarget['on'+ eventType] = null;
    }
  }
  
  /*
  *function 选择相应父元素下的className元素
  *@param 父元素
  *@className className
  *@return 相应父元素下的className的htmlcollection集合
  */
  base.getClass = function(father,className) {
    var children = father.getElementsByTagName("*"),
        length = children.length,
        child = null,
        elements = new Array(),
        i = 0;

    for(i = 0;i < length;i+=1) {
      child = children[i];
      var classNames = child.className.split(" ");
      for(var j = 0,len = classNames.length;j < len;j+=1) {
        if(classNames[j] === className) {
          elements[elements.length] = child;
          break;
        }
      }
    }
    return elements;
  }


  /*
  *function id选择器
  *@param string id
  *return 相应的id元素
  *
  */
  base.$ = function(id) {
    return document.getElementById(id);
  }

  /*
  *function 去除输入头尾的空格
  *@param string str 输入
  *return 去除头尾的空格的结果
  */
  base.trim = function(str) {
    return str.replace(/^\s+|\s+$/g,''); 
  }

  /*
  *function 判断输入是否由数字组成
  *@param string num 输入
  *return boolean 是否由数字组成
  */
  base.test_num = function(num) {
    if(num === undefined) {
    return false;
    }
    if(num.match(/^[0-9]+$/)) {
      return true;
    } else {
      return false;
    }
  }
  

  base.test_input = function(text) {
    if(!text) {
      return true;
    }
    return false;
  }
  /**
  *@method test_input_num
  *@param String text 
  *@return Boolean 是否包含数字
  */
  base.test_input_num = function(text) {
    if(text === "") {
      return false;
    } 
   return text.match(/[0-9]+/);
  }


  /*
  *function 为相应的节点添加class
  *@param element 元素节点
  *@param classValue className
  *return htmlCollection 返回相应父元素下的className的htmlCollection
  */
  base.addClass = function(element,classValue) {
    var oldClass = element.getAttribute("class");
    var newClass = null;
    if(oldClass !== null) {  //不为空的时候 将返回的string类型值转换成数组 判断新添加的样式是否存在后在进行添加
      var oldClassNums = oldClass.split(" ");
      var length = oldClassNums.length;
      for(var i = 0;i < length;i++ ) {
        if(oldClassNums[i] === classValue) {  //indexOf判断
            return;
        }
      }
      newClass = oldClass + " " + classValue;
      element.setAttribute("class",newClass);
    } else {
      element.setAttribute("class",classValue);  //如果元素之前的样式为空 直接设置值
    }
  }

  /*
  *function 移除相应节点下的class
  *@param element 元素节点
  *@param classValue 要移除的classValue
  */
  base.removeClass = function(element,classValue) {
    var oldClass = element.getAttribute("class");
    var newClass = null;
    if(oldClass !== null) {
      var oldClassNums = oldClass.split(" ");
      for(var i = 0,len = oldClassNums.length;i < len;i+=1) {
        if(oldClassNums[i] == classValue) {
          oldClassNums.splice(i,1);
          newClass = oldClassNums.join(" ");
          element.setAttribute("class",newClass);
        }
      }
    
    }
  }
  
  /*
  *function 移除相应元素的所有class
  *@param element 元素节点
  */
  base.removeAllClass = function(element) {
    element.removeAttribute("class");
  }
  
  /*
  *function 获取一定范围的随机数
  *@param num 随机数的范围
  *return 返回相应范围的随机数
  */
  base.randomNum = function(num) {
    var ret = Math.floor(Math.random()*num);
    return ret
  }
  

  /*
  *function 判断一个数字是否存在数组中
  *@param nums 需要判断的数组
  *@param num 需要判断的数字
  *return boolean true/false 是否存在数组中
  */
  base.num_exist = function(nums,num) {
    if(nums.indexOf(num) != -1) {
      return true;
    } else {
      return false;
    }
  }
  

  module.exports = base;
});