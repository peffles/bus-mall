'use strict';

var allProducts = [];
var totalClicks = 0;
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var imageArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

function Product(name, file, clicks, counter) {
  this.name = name;
  this.file = file;
  this.clicks = clicks;
  this.counter = counter;
  allProducts.push(this);
}

for(var i = 0; i < productNames.length; i++) {
  new Product(productNames[i], imageArray[i], 0, 0);
}

var productRank = {
  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  displayImages: function() {
    var indexes = [];
    while(indexes.length < 3) {
      console.log('stuck');
      var randomIndex = productRank.getRandomIndex();
      console.log(randomIndex);
      console.log(allProducts[randomIndex].clicks);
      if(allProducts[randomIndex].counter === 0) {
        allProducts[randomIndex].counter++;
        indexes.push(randomIndex);
      }
    }
    for(var i = 0; i < 3; i++) {
      var oldEl = document.getElementById(i);
      console.log(oldEl);
      if(oldEl) {
        oldEl.remove();
      }
      var divEl = document.getElementById('image-' + (i + 1));
      var imgEl = document.createElement('img');
      imgEl.src = 'img/' + imageArray[indexes[i]];
      imgEl.id = i;
      imgEl.className = [indexes[i]];
      divEl.appendChild(imgEl);
    }
  },

  tallyClicks: function(elementId) {
      // TODO: Hmm... what's going to happen here?
    },

    displayResults: function() {
      // TODO: Hmm... what's going to happen here?
    },

    showButton: function() {
      // TODO: Hmm... what's going to happen here?
    },

    onClick: function() {
      // TODO: Hmm... what's going to happen here?
  };

  productRank.imageEls.addEventListener('click', productRank.onClick);
  productRank.displayImages();
