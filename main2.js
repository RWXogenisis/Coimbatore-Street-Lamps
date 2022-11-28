const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");
const text2 = intro.querySelector("h2");
//END SECTION
const section = document.querySelector("section");
const end = section.querySelector("h1");
const end2 = section.querySelector("h2");


//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: 11000,
  triggerElement: intro,
  triggerHook: 0
})
  .addIndicators()
  .setPin(intro)
  .addTo(controller);

//Text Animation
const textAnim = TweenMax.fromTo([text, text2], 15, { opacity: 0 }, { opacity: 1 });

let scene2 = new ScrollMagic.Scene({
  duration: 11000,
  triggerElement: intro,
  triggerHook: 0
})
  .setTween(textAnim)
  .addTo(controller);

//Video Animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on("update", e => {
  scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  console.log(scrollpos, delay);

  video.currentTime = delay;
}, 33.3);


lightData();
async function lightData(){
  const url = 'Lights.csv';
  const response = await fetch(url);
  //wait for request
  const tabledata = await response.text();
  //console.log(tabledata);

  //titles
  const datapoint =[];
  const labels =[];

  const table = tabledata.split('\r\n\r\n').slice(1);
  table.forEach(row => {
    const column = row.split(',');
    const dist = column[0]; //change the index here
    const light =  column[1];
    labels.push(dist);
    datapoint.push(light);
  });

  //console.log(labels) //debug
  //console.log(datapoint) //debug
  //console.log(table); //debug
  myChart.config.data.labels = labels;
  myChart.config.data.datasets[0].data = datapoint;
  myChart.update();



}

// setup 
const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'No. of street lamp',
    data: [18, 12, 6, 9, 12, 3, 9],
    backgroundColor: 'rgba(255, 26, 104, 0.2)',
      //['rgba(54, 162, 235, 0.2)',
      //'rgba(255, 206, 86, 0.2)',
      //'rgba(75, 192, 192, 0.2)',
      //'rgba(153, 102, 255, 0.2)',
      //'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'],
    borderColor:'rgba(255, 26, 104, 1)',
      //['rgba(54, 162, 235, 1)',
      //'rgba(255, 206, 86, 1)',
      //'rgba(75, 192, 192, 1)',
      //'rgba(153, 102, 255, 1)',
      //'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'],
    borderWidth: 1
  }]
};

zoneData();
async function zoneData(){
  const url = 'LightsZones.csv';
  const response = await fetch(url);
  //wait for request
  const tabledata = await response.text();
  console.log(tabledata);

  //titles
  const datapoint =[];
  const Labels =[];

  const table = tabledata.split('\r\n').slice(1);
  table.forEach(row => {
    const column = row.split(',');
    const zone = column[0]; //change the index here
    const lights =  column[1];
    Labels.push(zone);
    datapoint.push(lights);
  });

  console.log(Labels); //debug
  console.log(datapoint); //debug
  console.log(table); //debug
  
  zoneChart.config.data.labels = Labels;
  zoneChart.config.data.datasets[0].data = datapoint;
  zoneChart.update();
}

var datapie = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    data: [18, 12, 6, 9, 12, 3, 9],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
      //['rgba(255, 26, 104, 0.2)',
      //'rgba(255, 206, 86, 0.2)',
      //'rgba(75, 192, 192, 0.2)',
      //'rgba(153, 102, 255, 0.2)',
      //'rgba(255, 159, 64, 0.2)',
      //'rgba(0, 0, 0, 0.2)'],
    borderColor: 'rgba(54, 162, 235, 1)',
      //['rgba(255, 26, 104, 1)',
      //'rgba(255, 206, 86, 1)',
      //'rgba(75, 192, 192, 1)',
      //'rgba(153, 102, 255, 1)',
      //'rgba(255, 159, 64, 1)',
      //'rgba(0, 0, 0, 1)'],
    borderWidth: 1
  }]
};



// config 
const config = {
  type: 'bar',
  data:data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

const config1 = {
  type: 'pie',
  data: datapie,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Street lights per zone'
      }
    }
  },
};


// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

const zoneChart = new Chart(
  document.getElementById('zoneChart'),
  config1
);