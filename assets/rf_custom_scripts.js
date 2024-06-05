$(document).ready(function(){
  $('.custom-slider').slick({
	infinite: true,
	arrows: false,
	dots: true,
	adaptiveHeight: true,
	slidesToShow: 3,
	slidesToScroll: 1
  });
});
$(document).ready(function() {
  /* START Making stiky header */
  
  var $stickyElement =  $('.sticky [data-pf-type="TabsMenu"]');
  if ($stickyElement.length > 0 ){ 
	var stickyTop = $stickyElement.offset().top,
		visible = false;

	if ($(window).width() < 799) {
	  var $headerOffset = $(".mobile-header");
	} else  {
	  var $headerOffset = $(".main_nav_wrapper");
	}

	$(window).scroll(function() {
	  var windowTop = $(window).scrollTop(),
		  $newElementsWrapper = $('<div/>', { id: 'wrapperNew-elements'});
	  if (stickyTop < windowTop ) {
		$headerOffset.hide();
		$stickyElement.addClass('sticknow');
		if (!visible) {
		  $("#buy-now-button").clone().appendTo($stickyElement);
		  $("#product-price").clone().appendTo($stickyElement);
		  visible = true;
		}


	  } else {
		$stickyElement.removeClass('sticknow');
		$headerOffset.show();
		if (visible) {
		  $stickyElement.find("#buy-now-button").remove();
		  $stickyElement.find("#product-price").remove();
		  visible = false;
		}
	  }

	});
  }
  /* END Making stiky header */
/* START show/hide additional contentnot inside tab */
var $tabsButtons =  $('.sticky [data-pf-type="TabsMenu"] button');
  	$tabsButtons.each(function(){
	  $(this).on('click', function(){
		if ($(this).hasClass('overview')) {
		  $('.overview-content').show();
		} else {
		  $('.overview-content').hide();
		}
		$('html, body').animate({
			scrollTop: $(".chose-content-section").offset().top - $(".header").height() 
		},600);
	  });
	});
  /* END how/hide additional contentnot inside tab */
});
/* START custom counter */
/* this implementation counts from 0 to 5480 during the entire day every day */
$('.counter').each(function() {
  var $this = $(this),
	  topNumber = 5840,
      secondPassedToday = getSecondsToday(),
      start = secondPassedToday/(60*60*24/topNumber),
      countTo = topNumber;
  $(this).text(start);
  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },
  {
    duration: 1000*60*60*24 - secondPassedToday*1000,
    easing:'linear',
    step: function() {
      $this.text(Math.floor(this.countNum));
    },
    complete: function() {
      $this.text(this.countNum);
      //alert('finished');
    }
  });
});

function getSecondsToday() {
  let now = new Date();
  // create an object using the current day/month/year
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // make seconds
}
/* END custom counter */

/* START Populate IGG records */
/* Usage: html element EXAMPLE 
ELEMENT WRAPPER
<div class="igg-card-shower" id="igg_numeric_campaign_id">
	<div class="igg-perk-wrapper" id="igg_numeric_perk_id">
      <div class="igg-label"></div>
      <p>$<span class="igg-amount"></span></p>
      <div class="igg-description"></div>
	  <p>Estimated Delivery date: <span class="igg-estimated_delivery_date"></span></p>
	  <p>Availables: <span class="igg-number_available"></span></p>
	  <p>Claimed: <span class="igg-number_claimed"></span></p>
	  <p>Left: <span class="igg-number_left"></span></p>
      <div class="igg-button_url"></div>
	</div>      
</div>  */
(function($) {
  $(document).ready(function() {
    let $cardShowerWrapper = $('.igg-card-shower'),
        igg_label_selector = '.igg-label',
        igg_amount_selector = '.igg-amount',
        igg_description_selector = '.igg-description',
        igg_estimated_delivery_date_selector = '.igg-estimated_delivery_date',
        igg_number_available_selector = '.igg-number_available',
        igg_number_claimed_selector = '.igg-number_claimed',
        igg_number_left_selector = '.igg-number_left',
        igg_button_url_selector = '.igg-button_url';

    if ($cardShowerWrapper.length > 0) {

      let igg_api_token = '538b63f0dea69c6236b08c0ccff79a4d81fcc37ae648211b1eca371e963ed6b9',
          igg_capmaign_id = $cardShowerWrapper.attr('id'),
          logArrayElements = function(element, index, array) {

            let $perkContainerId = $cardShowerWrapper.find('.igg-perk-wrapper#' + element.id);

            /* perk id present proceed to replace data from igg api */
            if ($perkContainerId.length > 0) {
              let buttonUrl = 'https://www.indiegogo.com/projects/' + element.campaign_slug + '/contributions/new?perk_id=' + element.id,
                  perks_left = element.number_available - element.number_claimed;
              $perkContainerId.find(igg_label_selector).html(element.label);
              $perkContainerId.find(igg_amount_selector).html(element.amount);
              $perkContainerId.find(igg_description_selector).html(element.description);
              $perkContainerId.find(igg_estimated_delivery_date_selector).html(formatDate(element.estimated_delivery_date));
              $perkContainerId.find(igg_number_available_selector).html(element.number_available);
              $perkContainerId.find(igg_number_claimed_selector).html(element.number_claimed);
              if (perks_left >= 0) {
              	$perkContainerId.find(igg_number_left_selector).html(perks_left);
              }

              $perkContainerId.find(igg_button_url_selector).attr('href',buttonUrl);
            }
          };

      $.getJSON("https://api.indiegogo.com/2/campaigns/" + igg_capmaign_id + "/perks.json?api_token=" + igg_api_token, function(gogodata) {
        gogodata.response.forEach(logArrayElements);
      });
    }
    
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
  });
})(jQuery);
/* END Populate IGG records */

/* Helper to add country code class on body Works with geolocation shopify app https://apps.shopify.com/geolocation */
async function countryRedirect() {
    let url = '/browsing_context_suggestions.json',
        obj = await (await fetch(url)).json(),
        countrycode = obj.detected_values.country.handle,
        euCountryCodes = ["AT", "BE", "BG", "HR", "CY", 
                          "CZ", "DK", "EE", "FI", "FR",
                          "DE", "GR", "HU", "IE", "IT",
                          "LV", "LT", "LU", "MT", "NL",
                          "PL", "PT", "RO", "SK", "SI", 
                          "ES", "SE", "NO","GB"],
      countryCodesToRedirect = ["NL","FR","DE","AT", "CH"];
  
  	/* If is some is from  Germany, Austria, Switzerland, France and the Netherlands */
    if ( euCountryCodes.includes(countrycode)) {
      window.location.href = 'https://theairhood.eu/';
    }

}
countryRedirect();

/* Move pagefly swatches names up on the element */
$(document).ready(function(){
  
  $( ".pf-option-swatches .pf-vs-image" ).each(function() {
    let $this = $( this ),
        $oldLabel = $this.find('label span');
        $optionLabel = $oldLabel.text(),
        $newSpanLabel = $( document.createElement('span') );

    /* clear current label */
    $oldLabel.empty();
    /* adding class to new label element */
    $newSpanLabel.addClass('variant-custom-label');
    /* adding old label value to the new one */
    $newSpanLabel.text($optionLabel);
    /* Adding new span with label inside varian option */
    $this.append($newSpanLabel);
    
  });
});
