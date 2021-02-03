function tyhjenna() {
   //tyhjennaAlkutiedot();

   window.localStorage.clear();

   //location.reload(); ei toimikaan enää? eikun chromessa toimii, firefoxissa ei, ei helppoa ratkaisua heti
   setTimeout(function () {
      window.location.reload();
   });
}

function avaaPoikkeuspaivat() {
   //sulkee mahdollisesti aukiolevan viikonpäivänäkymän ja tallettaa sen
   closePopup();
   // tarkistaa onko kaikki weekday-arraysta false, ja palauttaa true, vain silloin jos näin on
   let isWeekdayArrayAllFalse = weekdayArray.every((v) => v === false);

   if (
      $("#from").val() == "" ||
      $("#to").val() == "" ||
      isWeekdayArrayAllFalse == true
   ) {
      alert("Täytä kaikki kentät ennen seuraavaa vaihetta.");
   } else {
      tallennaAlkutiedot();
      luoPoikkeuspaivat();
      //muutetaan tyhjennä-nappi lomakkeesta Aloita alusta -napiksi varmistuksen kera
      muutaTyhjennanappi();
      muutaSeuraavanappi();
   }
}

function lataaLocalAlkutiedot() {
   if (window.localStorage.getItem("from_pvm") != null) {
      $("#from").val(window.localStorage.getItem("from_pvm"));
   }
   if (window.localStorage.getItem("to_pvm") != null) {
      $("#to").val(window.localStorage.getItem("to_pvm"));
   }
   if (JSON.parse(localStorage.getItem("wday_array") || "[]") != null) {
      weekdayArray = JSON.parse(localStorage.getItem("wday_array") || "[]");

      refreshAukiolopvCheckboxes();
      refreshViikonpaivakentta();
   }
   if (window.localStorage.getItem("aika1") != null) {
      $("#aika1").val(window.localStorage.getItem("aika1"));
   }

   if (window.localStorage.getItem("aika2") != null) {
      //tällä poistetaan taas jälkimmäisestä pienemmät arvot kuin mitä ensimmäisessä on.
      change_aika2();
      $("#aika2").val(window.localStorage.getItem("aika2"));
   }
}
function tallennaAlkutiedot() {
   window.localStorage.setItem("from_pvm", $("#from").val());
   window.localStorage.setItem("to_pvm", $("#to").val());
   //window.localStorage.setItem("from_pvm", $("#from").val());
   window.localStorage.setItem("wday_array", JSON.stringify(weekdayArray));
   //anotherArray = JSON.parse(localStorage.getItem("wday_array") || "[]");
   //console.log(anotherArray);
   //console.log(window.localStorage.getItem("from_pvm"));
   window.localStorage.setItem("aika1", $("#aika1").val());
   window.localStorage.setItem("aika2", $("#aika2").val());
}

function muutaTyhjennanappi() {
   $("#tyhjenna").prop("disabled", false);
   $("#tyhjenna").prop("onclick", null).off("click");
   $("#tyhjenna").html("Aloita alusta");
   $("#tyhjenna").unbind();
   $("#tyhjenna").bind("click", function (event) {
      event.stopPropagation();

      varmistaTyhjennys();
   });
}

function muutaSeuraavanappi() {
   $("#seuraavavaihe").prop("disabled", false);
   $("#seuraavavaihe").prop("onclick", null).off("click");
   $("#seuraavavaihe").html("Kuvaksi");
   $("#seuraavavaihe").unbind();
   $("#seuraavavaihe").bind("click", function (event) {
      event.stopPropagation();

      $("#arkilista").css("padding-right", "20px");

      html2canvas(document.querySelector(".poikkeuspaivat-grid")).then(
         (canvas) => {
            document.body.innerHTML = "";
            document.body.appendChild(canvas);
         }
      );
   });
}

function varmistaTyhjennys() {
   var varmistus = confirm(
      "Sivu ladataan uudestaan etkä voi enää palauttaa tehtyjä muutoksia."
   );
   if (varmistus == true) {
      tyhjenna();
   }
}
/*
function tyhjennaAlkutiedot() {
   window.localStorage.setItem("from_pvm", "");
   window.localStorage.setItem("to_pvm", "");
   //window.localStorage.setItem("from_pvm", $("#from").val());
   window.localStorage.setItem("wday_array", "");
   //anotherArray = JSON.parse(localStorage.getItem("wday_array") || "[]");
   //console.log(anotherArray);
   //console.log(window.localStorage.getItem("from_pvm"));
   window.localStorage.setItem("aika1", "");
   window.localStorage.setItem("aika2", "");
}*/

function refreshAukiolopvCheckboxes() {
   console.log("hei tan jalkeen");
   console.log(weekdayArray);
   $("#Ma").prop("checked", weekdayArray[0]);
   $("#Ti").prop("checked", weekdayArray[1]);
   $("#Ke").prop("checked", weekdayArray[2]);
   $("#To").prop("checked", weekdayArray[3]);
   $("#Pe").prop("checked", weekdayArray[4]);
   $("#La").prop("checked", weekdayArray[5]);
   $("#Su").prop("checked", weekdayArray[6]);
}

function closePopup() {
   var popwindow = document.getElementById("weekdaypopup");
   if (popwindow.style.display === "block") {
      popwindow.style.display = "none";
      refreshViikonpaivakentta();
   }
}

// var popwindow = document.getElementById("weekdaypopup");
// popwindow.style.display = "none";

function popup() {
   var popwindow = document.getElementById("weekdaypopup");
   if (popwindow.style.display === "none") {
      refreshAukiolopvCheckboxes();
      refreshViikonpaivakentta();
      popwindow.style.display = "block";

      $("#viikonpaivakentta").val("Valmis");
      $("#viikonpaivakentta").attr("size", 4);
      $("#viikonpaivakentta").css({
         "background-color": "#1a75ff",
         color: "white",
         cursor: "pointer",
      });
   } else {
      popwindow.style.display = "none";
      refreshViikonpaivakentta();
   }
}
