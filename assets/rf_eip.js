function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null) {
    return "";
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
(function($) {
  var $window = $(window),
    $document = $(document),
    $body,
    $doNotOpen = false,
    $popupShown = false,
    $forcedPopupShown = true,
    $eip_show_after_seconds = 1,
    $eip_id = 'content-46353',
    $showItAsap = 'yes',
    $testingModeOn = false,
    $cookieName = 'eip_a0ec28b45ae127e35b15fee2f8994086',
    $cookieShowItAgain = 'session',
    $cookieShowItAgainAfter = 'none',/* number */
    $cookieShowItAgainAfterUnit = 'none',/*hours, days, years */
    $cookieShowItAnyway = 'anyway',/* anyway, no */
    $cookieShowItAnywayAfter = 30,/* number */
    $cookieShowItAnywayOn = '',/* none, desk_mob, dektop, mobile */
    $cookieShowItScroll = 'scroll',/* scroll, not-scroll */
    $cookieShowItScrollOn = 'mobile',/* none, desk_mob, dektop, mobile */
    $desktopWidth = '100%',
    $desktopHeight = '100%',
    $desktopMaxWidth = '70',
    $desktopMaxHeight = '80',
    $mobileWidth = '90',
    $mobileHeight = '90',
    $displayAnimation = 'zoom-in-out',
    $displayAnimationDuration = 366,
    $closeModalEvent = 'close-modal',
    $afterCloseModalEvent = 'modal-was-closed',
    $showModalSelector = '',
    $showModalEvent = '',
    $forceShowModal = 'no',/* yes, no */
    $preventOpenModalSelector = '',
    $preventOpenModalEvent = '',
    $forceCloseModalSelector = 'no',
    $modalClickable = 'no', /* yes, no */
    $modalClickableUrl = '/',
    $modalDisableOnMobile = 'no', /* yes, no */
    $modalDisableOnDesktop = 'no'; /* yes, no */

    $forcedToShowItNow = $testingModeOn && (getParameterByName('force_show_modal_eip') == 'testing');

  $document.ready(function() {
    $body = $('body');

    if ($closeModalEvent) {
      $body.on($closeModalEvent, function() {
        $.fancybox.close( true );
      });
    }

    if ($showModalEvent) {
      $body.on($showModalEvent, function() {
        show_modal_by_event_or_selector();
      });
    }

    if ($showModalSelector) {
      $body.on('click', $showModalSelector, function() {
        show_modal_by_event_or_selector();
      });
    }

    if ($preventOpenModalEvent) {
      $body.on($preventOpenModalEvent, function() {
        force_modal_to_close();
        $doNotOpen = true;
      });
    }

    if ($preventOpenModalSelector) {
      $body.on('click', $preventOpenModalSelector, function() {
        force_modal_to_close();
        $doNotOpen = true;
      });
    }

    var force_modal_to_close = function() {
      if ($forceCloseModalSelector === 'yes') {
        var instance = $.fancybox.getInstance();
        if (instance) {
          $.fancybox.close( true );
        }
      }
    };

    var show_modal_by_event_or_selector = function() {
      var instance = $.fancybox.getInstance();
      if (instance === false) {
        if ($forceShowModal === 'yes' && !$forcedPopupShown && !$doNotOpen && !should_be_shown()) {
          $.fancybox.open(exit_intent_popup, options);
        } else {
          show_popup();
        }

        if ($forceShowModal === 'yes') {
          $forcedPopupShown = true;
        }
      }
    };

    var is_mobile = function() {
      return $window.width() < 769;
    };

    var calCookieExp = function() {
      if ($cookieShowItAgain !== 'always') {
        if ($cookieShowItAgain === 'session') {
          return null;
        } else if ($cookieShowItAgain === 'once') {
          return 365; // set to be show in 1 year
        } else if ($cookieShowItAgain === 'once_at') {
          if($cookieShowItAgainAfterUnit === 'hours') {
            return $cookieShowItAgainAfter/24;
          } else if($cookieShowItAgainAfterUnit === 'days') {
            return $cookieShowItAgainAfter;
          } else if($cookieShowItAgainAfterUnit === 'years') {
            return $cookieShowItAgainAfter*365;
          }
        }
      }
      return false;
    };

    var afterLoadPopup = function() {
      if ($cookieShowItAgain !== 'always') {
        Cookies.set($cookieName, '1', { expires: calCookieExp() });
      }
    };

    var afterClosePopup = function() {
      if ($cookieShowItAgain !== 'always') {
        Cookies.set($cookieName, '1', { expires: calCookieExp() });
      }

      if ($afterCloseModalEvent) {
        $body.trigger($afterCloseModalEvent);
      }
    };

    var setDimensions = function() {
      var element = $("#exit-intent-popup-container");
      if (is_mobile()) {
        element.css({
          'height': $mobileHeight+'vh',
          'width': $mobileWidth+'vw',
          'max-width': '100%',
          'max-height': '100%',
          'margin-left': 'auto',
          'margin-right': 'auto'
        });
      } else {
        element.css({
          'height': $desktopHeight+'px',
          'width': $desktopWidth+'px',
          'max-width': $desktopMaxWidth+'%',
          'max-height': $desktopMaxHeight+'%',
          'margin-left': 'auto',
          'margin-right': 'auto'
        });
      }

      element.addClass('eip-' + $eip_id);

      if ($modalClickable === 'yes') {
        element.css('cursor', 'pointer');
        $body.on('click', element, function(e) {
          if($(e.target).parents('form').length === 0
            && !$(e.target).is('a')
            && !$(e.target).is('button')
            && !$(e.target).is('input')
            && !$(e.target).is('select')) {
            window.location = $modalClickableUrl;
          }
        });
      }
    };

    var exit_intent_popup = $("#exit-intent-popup-container"),
      options = {
        margin: [0,0],
        gutter: 0,
        touch : {
          vertical : false,  // Allow to drag content vertically
          momentum : false   // Continue movement after releasing mouse/touch when panning
        },
        animationEffect: ($displayAnimation === 'none') ? false : $displayAnimation,
        animationDuration: $displayAnimationDuration,
        beforeLoad: setDimensions,
        afterLoad: afterLoadPopup,
        afterClose: afterClosePopup
      },
    seconds = parseInt($eip_show_after_seconds) * 1000;

    var show_popup = function() {
      // if (!$popupShown && !$doNotOpen) {
        if (should_be_shown()) {
          $popupShown = true;
          $.fancybox.open(exit_intent_popup, options);
        }
      // }
    };

    var should_be_shown = function() {
      if ($popupShown) {return false;}
      if ($modalDisableOnMobile === 'yes' && is_mobile()) {return false;}
      if ($modalDisableOnDesktop === 'yes' && !is_mobile()) {return false;}
      if ($forcedToShowItNow) {return true;}
      var cookie = Cookies.get($cookieName);
      return (!cookie || $cookieShowItAgain === 'always') && !$popupShown && !$doNotOpen && !$testingModeOn;
    };

    var set_events = function() {
      $body.mouseleave(show_popup);
      $window.blur(show_popup);
      $window.contextmenu(show_popup);
      $window.focus(show_popup);
      // $window.bind('beforeunload', show_popup);
    };

    setTimeout(set_events, seconds);

    if ($cookieShowItAnyway === 'anyway') {
      if ($cookieShowItAnywayOn === 'desk_mob'
        || ($cookieShowItAnywayOn === 'mobile' && is_mobile())
        || ($cookieShowItAnywayOn === 'desktop' && !is_mobile())) {
        setTimeout(show_popup, $cookieShowItAnywayAfter*1000);
      }
    }

    if ($cookieShowItScroll === 'scroll') {
      if ($cookieShowItScrollOn === 'desk_mob'
        || ($cookieShowItScrollOn === 'mobile' && is_mobile())
        || ($cookieShowItScrollOn === 'desktop' && !is_mobile())) {
          $window.scroll(function() {
            if($window.scrollTop() + $window.height() >= $document.height()) {
              show_popup();
            }
          });
      }
    }

    if ($showItAsap === 'yes') {
      show_popup();
    }

  });
})(jQuery);
