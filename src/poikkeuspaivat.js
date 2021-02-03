//kaikki päivät alku_pmv - loppu_pvm tulee tähän, poislukien viikonpäivät jotka ei ole valittu aukiolopäiviksi
let dateArray = [];

//dateArrayn ja loadJSON():in avulla täytetään taulukot poikkeusArray ja arkiArray, poikkeukseen tulee siis
//ne päivät dateArraysta, joina se on kiinni, ja arkiArrayhyn kaikki muut. Nämä taulukot pysyvät aina ajan
//tasalla, ja näiden datan mukaan käyttäjälle näkyvät listat muotoillaan
let poikkeusArray = [];
let arkiArray = [];

function luoDateArray() {
   let alkupaiva = pvm_to_date(window.localStorage.getItem("from_pvm"));
   let loppupaiva = pvm_to_date(window.localStorage.getItem("to_pvm"));

   //täytetään dateArray niillä päivillä, jotka ovat alkupvm:n ja loppupvm:n välillä (ne tietysti mukaanlukien)
   //JA joiden viikonpäivä on valittuna weekdayArrayssa
   //muokattu lähteestä: https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates

   var getDaysArray = function (start, end) {
      for (
         var arr = [], dt = new Date(start);
         dt <= end;
         dt.setDate(dt.getDate() + 1)
      ) {
         tempDate = new Date(dt);
         if (get_js_weekday(tempDate.getDay())) {
            arr.push(tempDate);
         }
         //if (new Date(dt).getDay())
         //arr.push(new Date(dt));
      }
      return arr;
   };

   dateArray = getDaysArray(alkupaiva, loppupaiva);

   //console.log(dateArray);
   //daylist.map((v) => v.toISOString().slice(0, 10)).join("");

   //console.log(pyhat);
   //for (var i = 0; i < pyhat.length; i++) {
   //   console.log(pyhat[i].date);
   //}

   //console.log(daylist);
}

//luoDateArray ja loadJson() on pitänyt ajaa ennen tätä
function tayta_arkipaivat() {
   //käydään läpi dateArray, ne päivät joita ei löydy poikkeusarraysta, laitetaan arkiArrayhyn
   //lisätään niillekin tyhjä string "", jotta tässäkin arrayssa on mahdollisuus säilöä pyhän tai poikkeuspäivän
   //nimi. Käyttäjän ei tarvitse tällöin kirjoittaa poikkeuspäivän nimeä uudestaan, jos sen on jo kerran tehnyt
   for (let i = 0; i < dateArray.length; i++) {
      let isPoikkeus = false;
      //console.log(poikkeusArray.length);

      for (let y = 0, count = poikkeusArray.length; y < count; y++) {
         //huomataan console.login avulla että toiset päiväykset ovat +2.00 ja toiset 0.00 joten ne eivät ole identtisiä!!! siksi täytyy
         //vertailla getDate():n kautta, eikä ainoastaan date-objekteja toisiinsa
         //EDIT eikä pelkästään getDaten vaan pelkän päivämäärän käsittelyyn itsetehdyn .yyyymmdd -funktion avulla
         //console.log(poikkeusArray[y].date);
         //console.log(dateArray[i]);
         if (poikkeusArray[y].date.yyyymmdd() == dateArray[i].yyyymmdd()) {
            isPoikkeus = true;
         }
      }
      if (isPoikkeus == false) {
         arkiArray.push({ date: dateArray[i], name: "" });
      }
   }
}

function luoPoikkeuspaivat() {
   $("input").attr("disabled", "disabled");
   $("select").attr("disabled", "disabled");
   $("button").attr("disabled", "disabled");

   poikkeuslista = $("#poikkeuslista");

   arkilista = $("#arkilista");

   //luodaan ensin dateArray, ja sitä voidaan hyödyntää saman tien loadJSON:issa, eli poimimme
   //siitä vain from_pvm ja to_pvm -aikavälille osuvat päivät loadJSON()-metodissa
   luoDateArray();
   //sitä ennen tehdään listat
   luoListat();

   //täytyykin siirtää ainakin taytaarkit() -metodi ja siitä eteenpäin loadJSON():iin, että
   // ne toimivat oikein. tämä metodi siis typeräsit jatkuu loadJSON:issa.
   loadJSON();

   function luoListat() {
      poikkeuslista.append(
         "<h3 class='listaotsikko'>Poikkeuspäivät</h3><ul id='poik_ul' style='list-style: square, display:block,list-style-type: circle, border: 2px solid blue,  background-color: lightblue,'>"
      );
      arkilista.append(
         "<h3 class='listaotsikko'>Aukiolopäivät</h3> <ul id='arki_ul'>"
      );
   }

   /*
   console.log(arkiArray);
   console.log("---------------------------------------------");
   console.log(poikkeusArray);
   var count = 0;
   for (property in poikkeusArray) count++;

   //console.log(Object.keys(poikkeusArray).length);
   console.log(count);

   Object.size = function (obj) {
      var size = 0,
         key;
      for (key in obj) {
         if (obj.hasOwnProperty(key)) size++;
      }
      return size;
   };

   var size = Object.size(poikkeusArray);
   console.log(size);
   var size2 = Object.size(arkiArray);
   console.log(size2);
   console.log(poikkeusArray);
   //let asd = "s" + toString(poikkeusArray);
   //console.log(asd);
   setTimeout(function () {
      console.log(poikkeusArray.length), 6000;
   });
   console.log(poikkeusArray.length);
   */
}

//kutsutaan joka kerta kun listaan tulee muutoksia tai se luodaan ensimmäisen kerran
//data tulee poikkeusArray ja arkiArray:den avulla joten ne pidetään ajan tasalla, ja tämä
//lista-osio on käyttäjälle näkyvä formaatti (ja käyttöliittymän sisäisin osa)
function paivitaPoikkeuslistat() {
   poikkeuslista = $("#poikkeuslista");
   poik_ul = $("#poik_ul");

   arkilista = $("#arkilista");
   arki_ul = $("#arki_ul");

   poik_ul.empty();
   arki_ul.empty();

   for (let i = 0; i < poikkeusArray.length; i++) {
      poik_ul.append(
         "<li><input type='text' id='poikkeus_input" +
            i +
            "' name='poikkeus_input" +
            i +
            "' maxlength='24' size='13' value='" +
            poikkeusArray[i].name +
            "'/></input> <span class='syotekentta' id='poikkeus_span" +
            i +
            "'>" +
            viikonpaivaLyhenne[poikkeusArray[i].date.getDay()] +
            " " +
            poikkeusArray[i].date.paivaysPisteilla() +
            "</span></li>"
      );
   }
   poik_ul.append("</ul>");

   for (let i = 0; i < arkiArray.length; i++) {
      arki_ul.append(
         "<li><input type='text' required id='arki_input" +
            i +
            "' name='arki_input" +
            i +
            "'maxlength='24' size='1' value='" +
            arkiArray[i].name +
            "' disabled/></input> <span class='syotekentta' id='arki_span" +
            i +
            "'>" +
            viikonpaivaLyhenne[arkiArray[i].date.getDay()] +
            " " +
            arkiArray[i].date.paivaysPisteilla() +
            "</span></li>"
      );
   }
   arki_ul.append("</ul>");

   lisaaListoihinEventListenerit();
}

//huom, tarvitaan fucntion(event) ja event.stopPropagation() jottei siirraArkipaiviin-metodia ajeta saman tien ennen painamistakaan
function lisaaListoihinEventListenerit() {
   for (let i = 0; i < poikkeusArray.length; i++) {
      $("#poikkeus_span" + i).bind("click", function (event) {
         event.stopPropagation();
         //siirraArkipaiviin("#poikkeus_span" + i);
         siirraArkipaiviin(i);
      });
   }

   for (let i = 0; i < arkiArray.length; i++) {
      $("#arki_span" + i).bind("click", function (event) {
         event.stopPropagation();

         siirraPoikkeuspaiviin(i);
      });
   }

   //ja vielä tekstikentän muokkauksen toiminta
   for (let i = 0; i < poikkeusArray.length; i++) {
      $("#poikkeus_input" + i).bind("change", function (event) {
         event.stopPropagation();
         poikkeusArray[i].name = $("#poikkeus_input" + i).val();
         //alert($("#poikkeus_input" + i).val());
      });
   }
}

function siirraArkipaiviin(poikkeus_indeksi) {
   //console.log(span_id);

   //käydään läpi arkiArray, ja etsimme siihen sijoitettavan uuden päiväyksen oikean kohdan ennen sijoitusta
   let tulevaIndeksi = 0;
   let jatkuu = true;

   //jostain kumman syystä date.yyyymmdd -metodit ei enää toimi tässä vaiheessa utils.js:stä
   // no onneksi ne toimivat uudestaan tehtynä tätä metodia varten

   function DateToYMD(date_obj) {
      var mm = date_obj.getMonth() + 1; // getMonth() is zero-based
      var dd = date_obj.getDate();
      return [
         date_obj.getFullYear(),
         (mm > 9 ? "" : "0") + mm,
         (dd > 9 ? "" : "0") + dd,
      ].join("");
   }

   //console.log(DateToYMD(arkiArray[0].date));

   for (let i = 0; i < arkiArray.length && jatkuu; i++) {
      //   if ($(""+span_id).date.yyyymmdd < )

      if (
         DateToYMD(poikkeusArray[poikkeus_indeksi].date) >
         DateToYMD(arkiArray[i].date)
      ) {
         console.log("tää tapahtui" + i);
         tulevaIndeksi++;
      } else {
         console.log("false tapahtui");
         jatkuu = false;
      }
   }

   console.log(tulevaIndeksi);
   //inserts into arkiArray at index "tulevaIndeksi", while deleting "0" items, "{value}"

   if (arkiArray.length > 0) {
      arkiArray.splice(tulevaIndeksi, 0, {
         date: poikkeusArray[poikkeus_indeksi].date,
         name: poikkeusArray[poikkeus_indeksi].name,
      });
   } else {
      arkiArray.push({
         date: poikkeusArray[poikkeus_indeksi].date,
         name: poikkeusArray[poikkeus_indeksi].name,
      });
   }

   //removing it from poikkeusArray
   poikkeusArray.splice(poikkeus_indeksi, 1);

   paivitaPoikkeuslistat();
}

//tyhmästi tehdään sama uudestaan toiseen suuntaan, olisi varmaan kannattanut saman tien tehdä yksi funktio joka hoitaa molempiin suuntiin

function siirraPoikkeuspaiviin(arki_indeksi) {
   //console.log(span_id);

   //käydään läpi arkiArray, ja etsimme siihen sijoitettavan uuden päiväyksen oikean kohdan ennen sijoitusta
   let tulevaIndeksi = 0;
   let jatkuu = true;

   //jostain kumman syystä date.yyyymmdd -metodit ei enää toimi tässä vaiheessa utils.js:stä
   // no onneksi ne toimivat uudestaan tehtynä tätä metodia varten

   function DateToYMD(date_obj) {
      var mm = date_obj.getMonth() + 1; // getMonth() is zero-based
      var dd = date_obj.getDate();
      return [
         date_obj.getFullYear(),
         (mm > 9 ? "" : "0") + mm,
         (dd > 9 ? "" : "0") + dd,
      ].join("");
   }

   //console.log(DateToYMD(poikkeusArray[0].date));

   for (let i = 0; i < poikkeusArray.length && jatkuu; i++) {
      //   if ($(""+span_id).date.yyyymmdd < )

      if (
         DateToYMD(arkiArray[arki_indeksi].date) >
         DateToYMD(poikkeusArray[i].date)
      ) {
         console.log("tää tapahtui" + i);
         tulevaIndeksi++;
      } else {
         console.log("false tapahtui");
         jatkuu = false;
      }
   }

   console.log(tulevaIndeksi);

   //inserts into arkiArray at index "tulevaIndeksi", while deleting "0" items, "{value}"
   if (poikkeusArray.length > 0) {
      poikkeusArray.splice(tulevaIndeksi, 0, {
         date: arkiArray[arki_indeksi].date,
         name: arkiArray[arki_indeksi].name,
      });
   } else {
      poikkeusArray.push({
         date: arkiArray[arki_indeksi].date,
         name: arkiArray[arki_indeksi].name,
      });
   }

   //removing it from poikkeusArray
   arkiArray.splice(arki_indeksi, 1);

   paivitaPoikkeuslistat();
}
