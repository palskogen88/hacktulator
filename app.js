
function fetchData() {
  document.getElementById("gjem").style.display = "none";
  const input = document.getElementById("input").value.replace(/\s/g, "");
  const url = `https://api.codetabs.com/v1/proxy?quest=https://data.brreg.no/regnskapsregisteret/regnskap/${input}`;
  const secondUrl = `https://api.codetabs.com/v1/proxy?quest=https://data.brreg.no/enhetsregisteret/api/enheter/${input}`;

  Promise.all([fetch(url), fetch(secondUrl)])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      let sumDriftsinntekter = 0;
      data[0].forEach(item => {
        sumDriftsinntekter = item.resultatregnskapResultat.driftsresultat.driftsinntekter.sumDriftsinntekter;
      });

      const navn = data[1].navn;
      document.getElementById("output").innerHTML = `${navn} omsatte i fjor for:<br><span id="omsetning"> ${sumDriftsinntekter} NOK </span>`;
      document.getElementById("knapper").style.display = "inline-block";
      document.getElementById("gjem").style.display = "inline-block";


      createButtons(sumDriftsinntekter);
    })
    .catch(error => console.error(error));
}


  function createButtons(sumDriftsinntekter) {
    const lite = document.getElementById("lite");
    const middels = document.getElementById("middels");
    const stort = document.getElementById("stort");

    lite.addEventListener("click", () => {
      document.getElementById("result").innerHTML = `Et lite angrep kan koste bedriften: <br><span id="kostnad">${Math.floor((sumDriftsinntekter / 365) * 10)} NOK </span>`;
      document.getElementById("hvordan").style.display = "inline-block";
    });

    middels.addEventListener("click", () => {
      document.getElementById("result").innerHTML = `Et middels angrep kan koste bedriften: <br><span id="kostnad">${Math.floor((sumDriftsinntekter / 365) * 20)} NOK </span>`;
      document.getElementById("hvordan").style.display = "inline-block";
    });

    stort.addEventListener("click", () => {
      document.getElementById("result").innerHTML = `Et stort angrep kan koste bedriften: <br><span id="kostnad">${Math.floor((sumDriftsinntekter / 365) * 40)} NOK </span>`;
      document.getElementById("hvordan").style.display = "inline-block";
    });


  }

  //Collapsible
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
