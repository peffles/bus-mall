'use strict';

var allProducts = [];
var totalClicks = 0;
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var files = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

function Product(productName, imageName, counter, displayCount) {
  this.productName = productName;
  this.imageName = imageName;
  this.counter = counter;
  this.displayCount = displayCount;
  allProducts.push(this);
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
      if(allProducts[randomIndex].displayCount === 0) {
        allProducts[randomIndex].displayCount++;
        index.push(randomIndex);
      }
    }
    for(var i = 0; i < 3; i++) {
      var previousImage = document.getElementById(i);
      if(previousImage) {
        previousImage.remove();
      }
      var divElement = document.getElementById('image-' + (i + 1));
      var imageElement = document.createElement('img');
      imageElement.src = 'assets/' + files[index[i]];
      imageElement.id = i;
      imageElement.className = [index[i]];
      divElement.appendChild(imageElement);
    }
  },
  tallyClicks: function(elementId) {
    allProducts[elementId].counter++;
    totalClicks++;
    if(totalClicks >= 5) {
      document.getElementById('image-1').removeEventListener('click', productRank.onClick);
      document.getElementById('image-2').removeEventListener('click', productRank.onClick);
      document.getElementById('image-3').removeEventListener('click', productRank.onClick);
      productRank.displayResults();
    }
  },

  displayResults: function() {

    var divElement = document.getElementById('scores');
    var pElement = document.createElement('p');
    pElement.textContent = 'Results';
    divElement.appendChild(pElement);
    for(var l = 0; l < allProducts.length; l++) {
      pElement = document.createElement('p');
      pElement.textContent = allProducts[l].counter + ' votes for ' + allProducts[l].productName;
      divElement.appendChild(pElement);
    }
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
