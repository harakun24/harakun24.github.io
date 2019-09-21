var tmmp, tfile, nfile, k;
let using = function(url) {
  $.get(url, data => {
    $("head").append("<style>" + data + "</style>");
    console.log("sukses nambah:" + url);
  });
};
let route = {};
let app = $(document);
let createUI = function(type) {
  // let result = document.createElement(type);
  let result = document.createElement(type.content);
  $.each(type, (key, val) => {
    if (key == "content") {
    } else if (key == "css") {
      let sname = "";
      $.each(val, (k, v) => {
        sname += k + ":" + v + ";";
      });
      result.setAttribute("style", sname);
    } else if (key == "val") {
      result.append(val);
    } else {
      result.setAttribute(key, val);
    }
  });

  result.render = () => {
    document.body.appendChild(result);
  };
  result.child = child => {
    result.appendChild(child);
  };
  result.attr = val => {
    $.each(val, function(key, isi) {
      result.setAttribute(key, isi);
    });
  };
  result.toHead = () => {
    document.head.appendChild(result);
  };
  //document.body.appendChild(result);

  result.unset = () => {
    document.body.removeChild(result);
  };
  return result;
};
let open = function(data, runer) {
  app.ready(() => {
    setTimeout(() => {
      $.get(data, jssd => {
        runer(jssd);
      });
    }, 0);
  });
};
let async = fun => {
  setTimeout(() => {
    fun();
  }, 0);
};
let fsave = (ft, name, type) => {
  //alert("text");
  var file = new Blob([ft], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    window.navigator.msSaveBlob(file, name);
  else {
    let a = createUI("a");
    let url = URL.createObjectURL(file);
    a.href = url;
    a.download = name;
    a.render();
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};

// let style = createUI("style");
// style.attr({ id: "mediaq" });
// document.head.appendChild(style);
let style = createUI({ content: "style", id: "mediaq" });
style.toHead();

let ls = url => {
  $.get(url, data => {
    $("#mediaq").html(data);
  });
};

let getText = (url, fun) => {
  let result = "";
  $.get(
    url,
    result2 => {
      result = result2;
      fun(result);
    },
    "text"
  );
  return result;
};

let rvo = function(w) {
  let x = [];
  $.each(w.desktop, (k, v) => {
    x.push([window.matchMedia(v[0]), v[1]]);
  });
  function myFunction() {
    num = false;
    $.each(x, (key, val) => {
      if (val[0].matches) {
        ls(val[1]);
        // alert(val[1]);
        num = true;
      }
      // console.log(window.screen.orientation.type);
    });
    if (window.screen.orientation.type == "portrait-primary") {
      ls(w.mobile);
    }
  }

  myFunction(); // Call listener function at run time
  $.each(x, (key, val) => {
    val[0].addListener(myFunction); // Attach listener function on state changes
  });
};
route.path = [];
route.open = function() {
  let loc = window.location.toString();
  let u = loc.split("/");
  // console.log(u[3]);
  let num = false;
  $.each(route.path, (k, v) => {
    if (u[3] == v.name) {
      // wrapper.append(v[1]);
      num = true;
      $.get(v.url, data => {
        document.body.innerHTML = data;
      });
    }
  });
  if (!num && (u[3] == "" || u[3] == "#!")) {
    $.get(route.default, data => {
      document.body.innerHTML = data;
    });
  } else if (!num && !u[3] == "") {
    $.get(route.error, data => {
      document.body.innerHTML = data;
    });
  }
};
