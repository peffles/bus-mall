'use strict';

var allProducts = [];
var totalClicks = 0;
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var files = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.jpg', 'water-can.jpg', 'wine-glass.jpg'];

function Product(productName, imageName, voteCount, displayCount) {
  this.productName = productName;
  this.imageName = imageName;
  this.voteCount = voteCount;
  this.displayCount = 0;
  allProducts.push(this);
  console.log('hit', displayCount);
}

for(var i = 0; i < productNames.length; i++) {
  new Product(productNames[i], files[i], 0, 0);
}

var productRank = {
  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  displayImages: function() {
    var index = [];
    while(index.length < 3) {
      var randomIndex = productRank.getRandomIndex();
      if(index.indexOf(randomIndex) === -1) {
        allProducts[randomIndex].displayCount++;
        index.push(randomIndex);
      }
    }

    for(var i = 0; i < 3; i++) {
      var divElement = document.getElementById('image-' + (i + 1));
      var imageElement = this.createImage(index[i]);
      divElement.innerHTML = '';
      divElement.appendChild(imageElement);
    }
  },
  createImage: function(index){
    var imageElement = document.createElement('img');
    imageElement.src = 'assets/' + files[index];
    imageElement.id = i;
    imageElement.className = [index];
    return imageElement;
  },
  tallyClicks: function(elementId) {
    allProducts[elementId].voteCount++;
    console.log('clicked', allProducts[elementId]);
    totalClicks++;
    console.log('clicked');
    if(totalClicks >= 25) {
      localStorage.setItem('allProducts', JSON.stringify(allProducts));
      allProducts.push(JSON.parse(localStorage.getItem('allProducts')));
      console.log('hit5', totalClicks);
      document.getElementById('image-1').removeEventListener('click', productRank.onClick);
      document.getElementById('image-2').removeEventListener('click', productRank.onClick);
      document.getElementById('image-3').removeEventListener('click', productRank.onClick);
      productRank.displayChart(elementId);
      console.log('fdfdd', this.voteCount);
      for(var i = 0; i < 3; i++) {
        document.getElementById('image-' + (i + 1)).remove();
      }
    }
  },

  displayChart: function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var options = {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [{
          label: 'Number of Votes',
          data: allProducts.map(function(x) {return x.voteCount;}),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderWidth: 1
        },
        /*{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }*/]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 24,
              stepSize: 2,
              beginAtZero: true
            }
          }]
        }
      }
    };
    var myChart = new Chart (ctx, options);
    console.log('wtf', myChart);
  },


  showButton: function() {
  },

  onClick: function(event) {
    productRank.displayImages();
    productRank.tallyClicks(event.target.className);
  }
};
productRank.displayImages();
document.getElementById('image-1').addEventListener('click', productRank.onClick);
document.getElementById('image-2').addEventListener('click', productRank.onClick);
document.getElementById('image-3').addEventListener('click', productRank.onClick);
