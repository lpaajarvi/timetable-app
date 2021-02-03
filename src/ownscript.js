let weekdayArray = [7];

//muuttaa dd.mm.yy eli "31.01.2020" muodossa olevan päivämäärän vanilla javascriptin date-objectiksi.
//kyseessä oleva päivämäärä tässä tehtävässä voidaan ottaa jquerny .val() -metodilla tekstikentästä
//(muistutus itselle)

// Please pay attention to the month (parts[1]); JavaScript counts months from 0:
// January - 0, February - 1, etc.

function pvm_to_date(paivamaara) {
   var parts = paivamaara.split(".");
   var raw_date = new Date(parts[2], parts[1] - 1, parts[0]);
   return raw_date;
}

//en tehnyt loppuun pitää miettiä tarvitaanko tätä sittenkään
/*
function date_to_pvm(date_object) {
   pvm_string = "";
   //pvm_string += data_object.getDay();
}*/

function change_aika2() {
   let aika2 = document.getElementById("aika2");
   let aika1 = document.getElementById("aika1");
   let x = aika1.options[aika1.selectedIndex].value;

   //console.log(x);

   //oletus_selection olettaa että JOS toinen aika on laitettu pienemmäksi kuin ensimmäinen aika,
   //ohjelmaa on 8:ksi seuraavaksi tunniksi, mutta pitää varautua yli kellon menemiseen

   let oletus_selection = parseInt(aika2.options[aika2.selectedIndex].value);

   //poistetaan kaikki optiot ja laitetaan uudet tilalle, jotka alkavat aika1.value+1:stä
   while (aika2.firstChild) {
      aika2.removeChild(aika2.firstChild);
   }

   if (oletus_selection <= parseInt(x)) {
      oletus_selection = parseInt(x) + 8;
      if (oletus_selection > 24) {
         oletus_selection = 24;
      }
      alert(
         "Päivä ei voi päättyä ennen alkamista, joten huomaathan että\npäätösaika muuttui olemaan kello " +
            oletus_selection
      );
   }

   let testi = "";

   for (let i = parseInt(x) + 1; i <= 24; i++) {
      testi += i + ", ";
      let node = document.createElement("option");
      if (i == oletus_selection) {
         node.setAttribute("selected", "selected");
      }

      let stringN = "";
      if (i < 10) {
         stringN = "0";
      }
      stringN += i;

      let textnode = document.createTextNode(stringN);

      node.appendChild(textnode);
      aika2.appendChild(node);
   }
}

function refreshViikonpaivakentta() {
   //var viikonpaivat = document.getElementById("viikonpaivakentta");
   //$("#viikonpaivakentta").prop("readonly", false);
   $("#viikonpaivakentta").css("background-color", "white");
   var fieldset = document.getElementById("weekday_fieldset");
   //console.log(fieldset.querySelector("input:checked").id);
   //forEach(fieldset.querySelector("input:checked").id)

   //fieldset.forEach((input) => {
   //   console.log(this);
   //});

   nodeList = fieldset.querySelectorAll(":scope > input");
   //console.log(nodeList.length);
   let viikonpaivaString = "";
   for (var index = 0; index < nodeList.length; index++) {
      if (nodeList[index].checked) {
         console.log(nodeList[index].name);
         viikonpaivaString += nodeList[index].name + ", ";
         weekdayArray[index] = true;
      } else {
         weekdayArray[index] = false;
      }
      //console.log(nodeList[index]);
   }
   if (viikonpaivaString == "Ma, Ti, Ke, To, Pe, La, Su, ") {
      viikonpaivaString = "Kaikki valittu (Ma-Su)";
   } else if (viikonpaivaString == "") {
      viikonpaivaString = "* Ei mitään valittu!";
   } else viikonpaivaString = viikonpaivaString.slice(0, -2);

   console.log(viikonpaivaString);
   console.log(weekdayArray);

   //$("#viikonpaivakentta").value = viikonpaivaString;
   vp = document.getElementById("viikonpaivakentta");

   vp.value = viikonpaivaString;
   if (vp.value.length > 3) {
      vp.size = vp.value.length - 3;
   } else {
      vp.size = 2;
   }

   //tämä aiheuttaa virheitä, jos viikonpaivaStringin kenttää muokataan
   if (viikonpaivaString == "* Ei mitään valittu!") {
      vp.style = "color: #e60000";
   } else {
      vp.style = "color: black;";
   }

   //tarkistetaan vielä vähän typerästi toisessa paikassa jakso alkaa, ja jakso päättyy
   //jälkeiset värikoodaukset, jotta ne päivittyvät aukiolopäivien päivittämisen jälkeen
}
