var whisk = whisk || {};
whisk.queue = whisk.queue || [];

whisk.queue.push(function () {
    whisk.listeners.addClickListener(
        'basket',
        'shoppingList.addProductsToBasket', {
        products: shoppingBasket
    }
    );
});