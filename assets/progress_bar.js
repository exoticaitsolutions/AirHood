  /**
 * Method that draw a boostrap progress bar
 * Percentage progress bar manipulation
 * This can be overrided adding an html element with "boostrap-progress-bar" class
 * and an attribute named "data-bar".
 * ex <div class="boostrap-progress-bar" data-bar='{"initDate" : "2018-10-10","color" : "#007bff","percentageInt" : 65}'></div>
 *
 * DEFAULT CONFIGURATION
 * barConfig = {
 *  initDate : '2018-10-10',//iso format date YYYY-mm-dd
 *  percentageInt : 73,
 *  maxPercentage : 99,
 *  campaignDaysDuration : 20,
 *  color : '#007bff',
 *  height : '2px',
 *  leftText: 'Limited spots left',
 *  rightText: '%s Reserved'
 * };
 */
var adjustPercentageBar = function(config) {
  var currentDate = new Date(),
      campaignInitDate = new Date(config.initDate),
      totMins = config.campaignDaysDuration*24*60,
      percentageToDistribute = config.maxPercentage - config.percentageInt,
      minsFromInit = Math.round((currentDate.getTime() - campaignInitDate.getTime())/(1000*60));

      // if some days passed from campaign init we calculate based on campaign duration and lower/upper limits
      if ( minsFromInit > 0 ) {
        config.percentageInt = Math.round(config.percentageInt + percentageToDistribute/totMins*minsFromInit);
      }

      // if we are pass the campaign duration we just set the percentage to the max
      if ( minsFromInit >= totMins ) {
        config.percentageInt = config.maxPercentage;
      }
  return config;
};
(function($) {
  $(document).ready(function() {
    var $progressBarToReplace = $('.boostrap-progress-bar');
    if ($progressBarToReplace.length) {

      var barConfigExt = JSON.parse($progressBarToReplace.attr('data-bar')),
          barConfig = {
            initDate : '2018-10-10',//iso format date YYYY-mm-dd
            percentageInt : 73,
            maxPercentage : 99,
            campaignDaysDuration : 20,
            color : '#007bff',
            height : '2px',
            leftText: 'Limited spots left',
            rightText: '%s Reserved'
          };
      // Merge barConfigExt into defaultBarConfig
      $.extend( barConfig, barConfigExt );

      //Here we calculate the percentage based on campaign duration and start date etc
      barConfig = adjustPercentageBar(barConfig);

      barConfig.percentageStr = barConfig.percentageInt + '%';
      barConfig.rightText = barConfig.rightText.replace("%s", barConfig.percentageStr);

      var $leftText = $('<span class="left"></span>').append(barConfig.leftText).css('color', barConfig.color),
          $rightText = $('<span class="right"></span>').append(barConfig.rightText).css({'float':'right','color': barConfig.color}),
          $upperText = $('<div class="progressbar-text"></div>').append($leftText, $rightText),
          $insideBarBase = $('<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>'),
          $insideBar = $insideBarBase.attr('aria-valuenow', barConfig.percentageInt)
          .css(
            {
              "background-color": barConfig.color,
              "width": barConfig.percentageStr
            }
          ),
          $progressBar = $('<div class="progress"></div>').css('height', barConfig.height).append($insideBar);

      $progressBarToReplace.before($upperText);
      $progressBarToReplace.replaceWith($progressBar);
    }

  });
})(jQuery);
