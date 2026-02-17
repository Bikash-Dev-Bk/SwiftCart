// Navbar

function toggleMenu() {
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const crossIcon = document.getElementById("cross-icon");
  const smallMenu = document.getElementById("small-menu");

  if (hamburgerIcon.style.display === "none") {
    hamburgerIcon.style.display = "block";
    crossIcon.style.display = "none";
    smallMenu.style.display = "none";
  } else {
    hamburgerIcon.style.display = "none";
    crossIcon.style.display = "block";
    smallMenu.style.display = "block";
  }
}

// Trending data loads

const shortTitle = (title, limit) => {
  return title.length > limit ? title.slice(0, limit) + "..." : title;
};

const loadTrending = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => displayTrending(json.slice(0, 3)));
};

const displayTrending = (trendings) => {
  const TrendingContainer = document.getElementById("trending-container");
  TrendingContainer.innerHTML = "";

  for (let trending of trendings) {
    console.log(trending);
    const trendingDiv = document.createElement("div");
    trendingDiv.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <img src="${trending.image}" class="w-full h-96 bg-gray-200 py-5 px-16" />

              <div class="p-6">
                <div class="flex items-center justify-between">
                  <span
                    class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                    ${trending.category}
                  </span>

                  <!-- Rating -->
                  <div class="flex items-center text-sm text-gray-600">
                    <span class="text-yellow-400 text-2xl mr-1">★</span>
                    <span class="font-medium mr-1">${trending.rating.rate}</span>
                    <span class="text-gray-400">(${trending.rating.count})</span>
                  </div>
                </div>

                <h4 class="mt-3 font-semibold">
                  ${shortTitle(trending.title, 38)}
                </h4>

                <p class="mt-2 font-bold">$${trending.price}</p>

                <div class="flex gap-3 mt-4">
                  <button
                    class="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-100">
                    Details
                  </button>
                  <button
                    class="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm hover:bg-indigo-700">
                    Add
                  </button>
                </div>
              </div>
            </div>
    `;

    TrendingContainer.append(trendingDiv);
  }
};

loadTrending();

// Products Category data loads

const loadProductsCategory = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => displayProductsCategory(json));
};

const displayProductsCategory = (productsCategory) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  const removeActiveClass = () => {
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach((btn) => {
      btn.classList.remove("bg-blue-600", "text-white");
    });
  };

  // All Button
  const allBtn = document.createElement("button");
  allBtn.innerText = "All";
  allBtn.className =
    "category-btn border px-5 py-3 font-semibold rounded-full hover:bg-blue-600 hover:text-white";

  allBtn.addEventListener("click", () => {
    removeActiveClass();
    allBtn.classList.add("bg-blue-600", "text-white");
    loadAllProducts();
  });

  categoryContainer.append(allBtn);

  // Category Buttons
  for (let category of productsCategory) {
    const btn = document.createElement("button");
    btn.innerText = category;
    btn.className =
      "category-btn border px-5 py-3 font-semibold rounded-full hover:bg-blue-600 hover:text-white capitalize";

    btn.addEventListener("click", () => {
      removeActiveClass();
      btn.classList.add("bg-blue-600", "text-white");
      loadProductsByCategory(category);
    });

    categoryContainer.append(btn);
  }

  allBtn.classList.add("bg-blue-600", "text-white");
};



// Load All Products
const loadAllProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => displayProducts(data));
};

// Load Products By Category
const loadProductsByCategory = (category) => {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => displayProducts(data));
};

// Display Products
const displayProducts = (products) => {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "bg-white rounded-xl shadow-sm overflow-hidden";

    productDiv.innerHTML = `
      <img src="${product.image}" class="w-full h-96 object-contain bg-gray-200 py-5 px-16" />

      <div class="p-6">
        <div class="flex items-center justify-between">
          <span
            class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded capitalize">
            ${product.category}
          </span>

          <div class="flex items-center text-sm text-gray-600">
            <span class="text-yellow-400 text-2xl mr-1">★</span>
            <span class="font-medium mr-1">${product.rating.rate}</span>
            <span class="text-gray-400">(${product.rating.count})</span>
          </div>
        </div>

        <h4 class="mt-3 font-semibold line-clamp-1">
          ${product.title}
        </h4>

        <p class="mt-2 font-bold">$${product.price}</p>

        <div class="flex gap-3 mt-4">
          <button
            class="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-100">
            Details
          </button>
          <button
            class="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm hover:bg-indigo-700">
            Add
          </button>
        </div>
      </div>
    `;

    productsContainer.appendChild(productDiv);
  });
};

loadProductsCategory();
loadAllProducts();
