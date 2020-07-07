import axios from "axios";
import moment from "moment";

function formatDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = `${yyyy}-${mm}-${dd}`;
  return date;
}

async function getDays(qtd) {
  try {
    var result = [];
    for (var i = 0; i < qtd; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(formatDate(d));
    }
    const info = result.map((date) =>
      axios.get(
        `https://api.nasa.gov/planetary/apod?date=${date}&api_key=k8lVoKzSe39NRWREgPxYxbNMMiJB5rMGNZJBc8fi`
      )
    );
    return Promise.all(info).then((value) => {
      const dataImags = value.map((item) => {
        let dateBr = moment(item.data.date, "YYYY-MM-DD");
        item.data.dateBr = dateBr.format("DD/MM/YYYY");

        return item.data;
      });

      const fg = dataImags.filter((item) => item.media_type === "image");
      console.log("dias", fg);
      // const picsDay = value.map((item) => item.data);
      return fg;
    });
  } catch (e) {
    console.log("erro");
  }
}

export { getDays };
