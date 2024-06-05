function getRandomCity() {
  let randomCities = {"items":[{"name":"New York","detail":"New York","img":"new_york_new_york"},{"name":"Los Angeles","detail":"California","img":"los_angeles_california"},{"name":"Chicago","detail":"Illinois","img":"chicago_illinois"},{"name":"Houston","detail":"Texas","img":"houston_texas"},{"name":"Philadelphia","detail":"Pennsylvania","img":"philadelphia_pennsylvania"},{"name":"Phoenix","detail":"Arizona","img":"phoenix_arizona"},{"name":"San Diego","detail":"California","img":"san_diego_california"},{"name":"San Antonio","detail":"Texas","img":"san_antonio_texas"},{"name":"Dallas","detail":"Texas","img":"dallas_texas"},{"name":"Detroit","detail":"Michigan","img":"detroit_michigan"},{"name":"San Jose","detail":"California","img":"san_jose_california"},{"name":"Indianapolis","detail":"Indiana","img":"indianapolis_indiana"},{"name":"Jacksonville","detail":"Florida","img":"jacksonville_florida"},{"name":"San Francisco","detail":"California","img":"san_francisco_california"},{"name":"Columbus","detail":"Ohio","img":"columbus_ohio"},{"name":"Austin","detail":"Texas","img":"austin_texas"},{"name":"Memphis","detail":"Tennessee","img":"memphis_tennessee"},{"name":"Baltimore","detail":"Maryland","img":"baltimore_maryland"},{"name":"Charlotte","detail":"North Carolina","img":"charlotte_north_carolina"},{"name":"Fort Worth","detail":"Texas","img":"fort_worth_texas"},{"name":"Boston","detail":"Massachusetts","img":"boston_massachusetts"},{"name":"Milwaukee","detail":"Wisconsin","img":"milwaukee_wisconsin"},{"name":"El Paso","detail":"Texas","img":"el_paso_texas"},{"name":"Washington","detail":"District of Columbia","img":"washington_district_of_columbia"},{"name":"Nashville-Davidson","detail":"Tennessee","img":"nashville_davidson_tennessee"},{"name":"Seattle","detail":"Washington","img":"seattle_washington"},{"name":"Denver","detail":"Colorado","img":"denver_colorado"},{"name":"Las Vegas","detail":"Nevada","img":"las_vegas_nevada"},{"name":"Portland","detail":"Oregon","img":"portland_oregon"},{"name":"Oklahoma City","detail":"Oklahoma","img":"oklahoma_city_oklahoma"},{"name":"Tucson","detail":"Arizona","img":"tucson_arizona"},{"name":"Albuquerque","detail":"New Mexico","img":"albuquerque_new_mexico"},{"name":"Atlanta","detail":"Georgia","img":"atlanta_georgia"},{"name":"Long Beach","detail":"California","img":"long_beach_california"},{"name":"Kansas City","detail":"Missouri","img":"kansas_city_missouri"},{"name":"Fresno","detail":"California","img":"fresno_california"},{"name":"New Orleans","detail":"Louisiana","img":"new_orleans_louisiana"},{"name":"Cleveland","detail":"Ohio","img":"cleveland_ohio"},{"name":"Sacramento","detail":"California","img":"sacramento_california"},{"name":"Mesa","detail":"Arizona","img":"mesa_arizona"},{"name":"Virginia Beach","detail":"Virginia","img":"virginia_beach_virginia"},{"name":"Omaha","detail":"Nebraska","img":"omaha_nebraska"},{"name":"Colorado Springs","detail":"Colorado","img":"colorado_springs_colorado"},{"name":"Oakland","detail":"California","img":"oakland_california"},{"name":"Miami","detail":"Florida","img":"miami_florida"},{"name":"Tulsa","detail":"Oklahoma","img":"tulsa_oklahoma"},{"name":"Minneapolis","detail":"Minnesota","img":"minneapolis_minnesota"},{"name":"Honolulu","detail":"Hawaii","img":"honolulu_hawaii"},{"name":"Arlington","detail":"Texas","img":"arlington_texas"},{"name":"Wichita","detail":"Kansas","img":"wichita_kansas"},{"name":"St. Louis","detail":"Missouri","img":"st_louis_missouri"},{"name":"Raleigh","detail":"North Carolina","img":"raleigh_north_carolina"},{"name":"Santa Ana","detail":"California","img":"santa_ana_california"},{"name":"Cincinnati","detail":"Ohio","img":"cincinnati_ohio"},{"name":"Anaheim","detail":"California","img":"anaheim_california"},{"name":"Tampa","detail":"Florida","img":"tampa_florida"},{"name":"Toledo","detail":"Ohio","img":"toledo_ohio"},{"name":"Pittsburgh","detail":"Pennsylvania","img":"pittsburgh_pennsylvania"},{"name":"Aurora","detail":"Colorado","img":"aurora_colorado"},{"name":"Bakersfield","detail":"California","img":"bakersfield_california"},{"name":"Riverside","detail":"California","img":"riverside_california"},{"name":"Stockton","detail":"California","img":"stockton_california"},{"name":"Corpus Christi","detail":"Texas","img":"corpus_christi_texas"},{"name":"Lexington-Fayette","detail":"Kentucky","img":"lexington_fayette_kentucky"},{"name":"Buffalo","detail":"New York","img":"buffalo_new_york"},{"name":"St. Paul","detail":"Minnesota","img":"st_paul_minnesota"},{"name":"Anchorage","detail":"Alaska","img":"anchorage_alaska"},{"name":"Newark","detail":"New Jersey","img":"newark_new_jersey"},{"name":"Plano","detail":"Texas","img":"plano_texas"},{"name":"Fort Wayne","detail":"Indiana","img":"fort_wayne_indiana"},{"name":"St. Petersburg","detail":"Florida","img":"st_petersburg_florida"},{"name":"Glendale","detail":"Arizona","img":"glendale_arizona"},{"name":"Lincoln","detail":"Nebraska","img":"lincoln_nebraska"},{"name":"Norfolk","detail":"Virginia","img":"norfolk_virginia"},{"name":"Jersey City","detail":"New Jersey","img":"jersey_city_new_jersey"},{"name":"Greensboro","detail":"North Carolina","img":"greensboro_north_carolina"},{"name":"Chandler","detail":"Arizona","img":"chandler_arizona"},{"name":"Birmingham","detail":"Alabama","img":"birmingham_alabama"},{"name":"Henderson","detail":"Nevada","img":"henderson_nevada"},{"name":"Scottsdale","detail":"Arizona","img":"scottsdale_arizona"},{"name":"North Hempstead","detail":"New York","img":"north_hempstead_new_york"},{"name":"Madison","detail":"Wisconsin","img":"madison_wisconsin"},{"name":"Hialeah","detail":"Florida","img":"hialeah_florida"},{"name":"Baton Rouge","detail":"Louisiana","img":"baton_rouge_louisiana"},{"name":"Chesapeake","detail":"Virginia","img":"chesapeake_virginia"},{"name":"Orlando","detail":"Florida","img":"orlando_florida"},{"name":"Lubbock","detail":"Texas","img":"lubbock_texas"},{"name":"Garland","detail":"Texas","img":"garland_texas"},{"name":"Akron","detail":"Ohio","img":"akron_ohio"},{"name":"Rochester","detail":"New York","img":"rochester_new_york"},{"name":"Chula Vista","detail":"California","img":"chula_vista_california"},{"name":"Reno","detail":"Nevada","img":"reno_nevada"},{"name":"Laredo","detail":"Texas","img":"laredo_texas"},{"name":"Durham","detail":"North Carolina","img":"durham_north_carolina"},{"name":"Modesto","detail":"California","img":"modesto_california"},{"name":"Huntington","detail":"New York","img":"huntington_new_york"},{"name":"Montgomery","detail":"Alabama","img":"montgomery_alabama"},{"name":"Boise","detail":"Idaho","img":"boise_idaho"},{"name":"Arlington","detail":"Virginia","img":"arlington_virginia"},{"name":"San Bernardino","detail":"California","img":"san_bernardino_california"}],"meta":{"img":{"local":true,"prefix":"/img/us-city-maps/","suffix":".png"}}};
  
  return randomCities['items'][Math.floor(Math.random() * randomCities['items'].length)];
}
function getRandomWaitTime() {
  let min = Math.ceil("5"),
	  max = Math.floor("8");

  return Math.floor(Math.random() * (max - min) + min); 

}
function showHtmlElemt(copy) {
  let wrapperMargin = '2%',
      wrapperWidth = '96%';
  
  if ($(window).width() > 799) {
    wrapperMargin = '7px';
    wrapperWidth = '320px';
  } 
  
  let timeToStay = "10",
	$container = $('<div>', {
 		id: 'rf-rs-purchase-made'
    }).css({ 
      	"display" : "none",
    }),
    $innerContainer = $('<div>')
    .css({ 
        "position": "fixed", 
      	"display" : "flex",
      	"align-items": "center",
      	"flex-direction" : "row",
      	"width": wrapperWidth,
        "bottom": "0", 
        "left": "0", 
        "margin": wrapperMargin,
        "border-radius": "3px",
        "background-color": "#03a196",
    }),
    $image = $('<img>', {
       	id: 'rf_rs_image',
    	src: "//theairhood.com/cdn/shopifycloud/shopify/assets/no-image-160-1cfae84eca4ba66892099dcd26e604f5801fdadb3693bc9977f476aa160931ac_150x.gif"
    })
    .css({ 
      	"max-height": "50px",
    }),
    $copy = $('<p>', {
        id: 'rf_rs_copy'
    })
    .css({ 
      	"color": "#ffffff",
      	"padding": "10px",
      	"margin": "0",
        "max-width": "270px",
        "line-height": "18px",
        "font-size": "14px",
    }).html(copy);
  
  $image.appendTo($innerContainer);
  $copy.appendTo($innerContainer);
  $innerContainer.appendTo($container);
  
  $container.appendTo('body').show('slow');
  
  	
  setTimeout(function(){
    $('#rf-rs-purchase-made').hide('slow', function(){ $('#rf-rs-purchase-made').remove(); });
  }, timeToStay * 1000);
}

function showPurchase() {
  let city = getRandomCity(),
      messaging = 'Some one from [location] just purchased: prodName',
      textMessaging = messaging.replace("[location]", city.name + ', ' + city.detail);
      timeNextRun = getRandomWaitTime();
  
  	setTimeout(function(){

      showHtmlElemt(textMessaging);
      showPurchase();
    }, timeNextRun * 1000);
}

$(document).ready(function(){
	showPurchase();
});
  
