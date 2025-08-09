<script>
const products = [
  {
    name: "iPhone 14",
    prices: {
      amazon: 78999,
      flipkart: 79999,
      reliance: 78000
    }
  },
  {
    name: "Samsung Galaxy S23",
    prices: {
      amazon: 69999,
      flipkart: 71000,
      reliance: 70500
    }
  },
  {
    name: "OnePlus Nord CE 3",
    prices: {
      amazon: 24999,
      flipkart: 23999,
      reliance: 25999
    }
  }
];

function goToSearch() {
  document.getElementById("home").classList.remove("active");
  document.getElementById("search").classList.add("active");
  document.getElementById("search-box").value = document.getElementById("main-search").value;
}

function goToHome() {
  document.getElementById("search").classList.remove("active");
  document.getElementById("home").classList.add("active");
  document.getElementById("main-search").value = document.getElementById("search-box").value;
  document.getElementById("results").innerHTML = "";
}

function searchProduct() {
  const query = document.getElementById("search-box").value.trim().toLowerCase();
  const results = document.getElementById("results");

  if (!query) {
    results.innerHTML = "<p>Please enter a product name.</p>";
    return;
  }

  const product = products.find(p => p.name.toLowerCase().includes(query));
  if (!product) {
    results.innerHTML = <p>No results found for "<strong>${query}</strong>".</p>;
    return;
  }

  const validPrices = Object.entries(product.prices)
    .filter(([_, price]) => typeof price === "number");

  if (validPrices.length === 0) {
    results.innerHTML = <p>No price data available for "${product.name}".</p>;
    return;
  }

  const [lowestPlatform, lowestPrice] = validPrices.reduce((min, current) =>
    current[1] < min[1] ? current : min
  );

  let priceListHTML = "<ul>";
  validPrices.forEach(([platform, price]) => {
    priceListHTML += <li>${platform.toUpperCase()}: ₹${price}</li>;
  });
  priceListHTML += "</ul>";

  results.style.opacity = 0;
  setTimeout(() => {
    results.style.opacity = 1;
  }, 50);

  results.innerHTML = `
    <h2>${product.name}</h2>
    ${priceListHTML}
    <p><strong>Lowest Price:</strong> ₹${lowestPrice} on <strong>${lowestPlatform.toUpperCase()}</strong></p>
  `;
}

// Hide splash screen after 15 seconds
setTimeout(() => {
  const intro = document.getElementById('intro');
  if (intro) {
    intro.style.display = 'none';
  }
}, 15000);

// Owl sound and fly-away
const owl = document.querySelector('.owl');
const hootSound = document.getElementById('hoot-sound');

owl.addEventListener('click', () => {
  hootSound.play();
  owl.classList.add('fly-away');
});
</script>