/* Fix for pagefly prod pages cart drawer refresh */
try {
	window.addEventListener("load", function() {
		window.__pagefly_helper_store__ &&
		window.__pagefly_helper_store__.subscribe(function(res) {
			$.ajax({
				url: "/cart.js",
				dataType: "json",
				cache: false,
				success: function success(cart) {
					//block scrolling on mobile
					if ($(window).width() <= 798) {
						$("body").addClass("blocked-scroll");
					}

					window.refreshCart(cart);

					if ($("header").is(":visible")) {
						$("header .cart-container").addClass("active_link");
					} else if ($(".sticky_nav--stick").length) {
						$(".sticky_nav .cart-container").addClass("active_link");
					} else {
						$(".top_bar .cart-container").addClass("active_link");
					}
				}
			});
		});
	});
} catch (e) {
	console.error("PF:: ", e);
}