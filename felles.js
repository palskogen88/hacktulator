
/*  function fetchData() {
    const input = document.getElementById("input").value.replace(/\s/g, "");
    const url = `https://cors-anywhere.herokuapp.com/https://data.brreg.no/regnskapsregisteret/regnskap/${input}`;
    //const navnUrl = `https://cors-anywhere.herokuapp.com/https://data.brreg.no/enhetsregisteret/api/enheter/${input}`;
/*
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let sumDriftsinntekter = 0;
        data.forEach(item => {
          sumDriftsinntekter = item.resultatregnskapResultat.driftsresultat.driftsinntekter.sumDriftsinntekter;
        });
/*
    fetch(navnUrl)
      .then(response => response.json())
      .then(data => {
        let selskapsnavn = "";
        data.forEach(item => {
          selskapsnavn = item.navn;
        });
*/
function fetchData() {
  document.getElementById("knapper").style.display = "none";
  const input = document.getElementById("input").value.replace(/\s/g, "");
  const url = `https://data.brreg.no/regnskapsregisteret/regnskap/${input}`;
  const secondUrl = `https://cors-anywhere.herokuapp.com/https://data.brreg.no/enhetsregisteret/api/enheter/${input}`;

  Promise.all([fetch(url), fetch(secondUrl)])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      let sumDriftsinntekter = 0;
      data[0].forEach(item => {
        sumDriftsinntekter = item.resultatregnskapResultat.driftsresultat.driftsinntekter.sumDriftsinntekter;
      });

      const navn = data[1].navn;
      document.getElementById("output").innerHTML = `${navn}<br>omsatte i fjor for: ${sumDriftsinntekter}`;
      document.getElementById("knapper").style.display = "inline-block";

      createButtons(sumDriftsinntekter);
    })
    .catch(error => console.error(error));
}


  function createButtons(sumDriftsinntekter) {
    const lite = document.getElementById("lite");
    const middels = document.getElementById("middels");
    const stort = document.getElementById("stort");

    // Add event listeners to the buttons
    lite.addEventListener("click", () => {
      document.getElementById("result").innerHTML = `Det kan koste: ${Math.floor((sumDriftsinntekter / 365) * 10)}`;
    });

    middels.addEventListener("click", () => {
      document.getElementById("result").innerHTML = `Det kan koste: ${Math.floor((sumDriftsinntekter / 365) * 20)}`;
    });

    stort.addEventListener("click", () => {
      document.getElementById("result").innerHTML = `Det kan koste: ${Math.floor((sumDriftsinntekter / 365) * 40)}`;
    });
  }
