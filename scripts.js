let slickInitialized = false;
const productCarousel = document.querySelector('.product-carousel');

function initializeSlick() {
    $(productCarousel).slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true
    });

    slickInitialized = true;
}

function renderProducts(products) {
    productCarousel.innerHTML = '';

    products.forEach(product => {
        const productElement = `
            <div class="product-card">
                <div class="imageProduct">
                    <img src="${product.imageUrl}" alt="${product.productName}"> 
                </div>
                <h3 class="productName">${product.productName}</h3>
                <p class="price">Por ${product.totalPrice.toFixed(2)}</p>
                <p class="installments">${product.installments}x de ${product.installmentValue.toFixed(2)} sem juros</p>
                <button class="buy">Comprar</button>
                <p class="seller">${product.seller === "RiHappy" ? `Vendido e entregue por <span class="sellerType">${product.seller}</span>` : `Oferta por <span class="sellerType">${product.seller}</span>`}</p>
            </div>
        `;

        productCarousel.innerHTML += productElement;
    });

    initializeSlick();
}

function handleClickTab(event) {
    const tabs = document.querySelectorAll('.tab-link');

    tabs.forEach(tab => tab.classList.remove('active'));

    if(slickInitialized) {
        $(productCarousel).slick('unslick');
    }

    event.target.classList.add('active');

    const category = event.target.dataset.category;

    if (category === 'novidades') {
        renderProducts(novidades);
    } else if (category === 'mais_vendidos') {
        renderProducts(mais_vendidos);
    } else if (category === 'fantasias') {
        renderProducts(fantasias);
    } else if (category === 'jogos') {
        renderProducts(jogos);
    } else if (category === 'diversao') {
        renderProducts(diversao);
    }
}

document.addEventListener('DOMContentLoaded', function() { 
    renderProducts(novidades);

    const tabs = document.querySelectorAll('.tab-link');

    tabs.forEach(tab => {
        tab.addEventListener('click', handleClickTab);
    });
});