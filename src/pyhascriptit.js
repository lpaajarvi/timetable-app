var pyhat = new Array();

function loadJSON() {
   /*
    $.ajax({
      url: "pythat.json",
      type: "get",
      error: function (data) {},
      success: function (data) {
         console.log(data); //check to see if jQuery has already converted the response to a JSON object
         //data=jQuery.parseJSON(data); //do something with data
      },
   });*/
   ////////////////////////////////////
   // ONLINE - VERSIOON UNCOMMENT
   //////////////////////////////////

   ajax("pyhat.json", function (response) {
      // create a json object
      var JSONObject = JSON.parse(response);
      pyhat = JSONObject;

      for (var i = 0; i < pyhat.length; i++) {
         //date on json-tiedostossa samassa muodossa josta saadaan new Date:lla date-objekti
         let date_i = new Date(pyhat[i].date);
         //console.log(dateArray[0]);
         if (
            date_i >= dateArray[0] &&
            date_i <= dateArray[dateArray.length - 1] &&
            //tarkistetaan myös että ainoastaan aukiolopäivä huomioidaan
            get_js_weekday(date_i.getDay())
         ) {
            //pushataan arrayhyn date: ja name: pari
            poikkeusArray.push({ date: date_i, name: pyhat[i].name });
            //poikkeusArray.push(pyhat[i].name);
         }
      }

      tayta_arkipaivat();

      paivitaPoikkeuslistat();

      console.log(arkiArray);
      console.log(poikkeusArray);
   });
}

/////////////////////////////////
// ONLINE-VERSIOOON UNCOMMENT
////////////////////////////////

function ajax(url, fn) {
   var req;
   if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();
   } else {
      req = new ActiveXObject("Microsoft.XMLHTTP");
   }
   req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
         fn(req.responseText);
      }
   };
   req.open("GET", url, true);
   req.send();
}

function naytaPyha(index) {
   // uusi div
   var pyhaDiv = document.createElement("div");
   pyhaDiv.setAttribute("class", "pyhaContainer");

   var p1 = document.createElement("p");
   p1.setAttribute("class", "paivamaara");
   var text = document.createTextNode(pyhat[index].date);
   p1.appendChild(text);

   var p2 = document.createElement("p");
   var text = document.createTextNode(pyhat[index].name);
   p2.appendChild(text);

   var p3 = document.createElement("p");
   p3.setAttribute("class", "kuvaus");
   var text = document.createTextNode(pyhat[index].description);
   p3.appendChild(text);

   var p4 = document.createElement("p");
   var text = document.createTextNode(pyhat[index].url);
   p4.appendChild(text);

   pyhaDiv.appendChild(p1);
   pyhaDiv.appendChild(p2);
   pyhaDiv.appendChild(p3);
   pyhaDiv.appendChild(p4);

   // pyhat div
   var pyhatDiv = document.getElementById("pyhat");

   pyhatDiv.appendChild(pyhaDiv);
}
