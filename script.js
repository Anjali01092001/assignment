document.addEventListener('DOMContentLoaded', function () {
    let productsContainer = document.querySelector('.filter-item');
    let currentCategory = '';

    async function fetchProducts(url) {
        let data = await fetch(url);
        let response = await data.json();
        console.log(response);

        displayProducts(response.categories);
    }

    function displayProducts(categories) {
        productsContainer.innerHTML = '';

        for (let i = 0; i < categories.length; i++) {
            let categoryProducts = categories[i].category_products;

            for (let j = 0; j < categoryProducts.length; j++) {
                let product = categoryProducts[j];

                // Check if the product matches the current category filter
                if (!currentCategory || currentCategory === categories[i].category_name) {
                    productsContainer.innerHTML += `
                    <div class="item">
                        <div class="item-img">
                            <img src="${product.image}" alt="image" height="300rem" width="180rem"/>
                            <span class="text">${product.badge_text || ''}</span>
                        </div>
                        <div class="item-info">
                            <div class="titlehead">
                                <span class="title"><b>${product.title.slice(0, 15)} </b></span>
                                <li><span>${product.vendor}</span></li>
                            </div>
                            <div class="detail">
                                <span class="new-price">Rs. ${product.price}</span>
                                <span class="old-price"><strike>${product.compare_at_price || ''}</strike></span>
                                <span class="off">50% off</span>
                            </div>
                            <a href="#" class="add-btn">Add to cart</a>
                        </div>
                    </div>
                    `;
                }
            }
        }
    }

    // Function to filter products by category
    window.filterProducts = function (category) {
        currentCategory = category;
        fetchProducts('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    };

    // Initial fetch and display
    fetchProducts('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
});
