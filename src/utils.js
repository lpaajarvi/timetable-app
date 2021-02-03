//sisältää apumetodeja tiedon formaatin muuttamiseen esim. päiväysten ja viikonpäivien osalta

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

// agh, en nyt tiä onko mikä järkevin tapa, mutta tämän avulla otetaan weekdayArray:sta javascprit-muotoa oleva
// viikonpäivä
function get_js_weekday(numero) {
   numero = numero == 0 ? 6 : numero - 1;
   return weekdayArray[numero];
}

//https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
Date.prototype.yyyymmdd = function () {
   var mm = this.getMonth() + 1; // getMonth() is zero-based
   var dd = this.getDate();

   return [
      this.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
   ].join("");
};

Date.prototype.paivaysPisteilla = function () {
   var mm = this.getMonth() + 1;
   var dd = this.getDate();

   return [
      (dd > 9 ? "" : "0") + dd,
      (mm > 9 ? "" : "0") + mm,
      this.getFullYear(),
   ].join(".");
};

//var date = new Date();
//date.yyyymmdd();
