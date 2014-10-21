( function( global, doc, $, ns ) {
  'use strict';
  ns = ns || {};

  $(function() {
    var WIDTH = 339;
    var DELAY = 300;
    var SPEED = {
      head  : 300,
      nose  : 600,
      mouth : 100
    };

    /*-------------------------------------------
      EVENT LISTENER 
    -------------------------------------------*/
    $( '.button' ).on( 'click', function(){
      var _this = this;
      var _id   = $( _this ).data( 'id' ); 
      var $slideElm = $( '#' + _id );
      if( $( _this ).hasClass( 'on' ) ){
        return;
      }
      $( _this ).addClass( 'on' );
      _stop( $slideElm, -1 * ( parseInt( Math.random() * 
                               2 ) + 1 ) * WIDTH, SPEED[ _id ] * 2 );
    } );

    /*-------------------------------------------
      INIT 
    -------------------------------------------*/
    _slide( $( '#head' ), WIDTH * -2, SPEED.head );
    setTimeout( function(){
      _slide( $( '#nose' ), WIDTH * -2, SPEED.nose );
    }, DELAY );
    setTimeout( function(){
      _slide( $( '#mouth' ), WIDTH * -2, SPEED.mouth );
    }, DELAY * 2 );

    /*-------------------------------------------
      PRIVATE
    -------------------------------------------*/
    function _slide( $elm, _target, speed ){
      var _id = $elm.attr( 'id' );
      var $button = $( '.button.' + _id );
      $elm.css( { backgroundPosition: '0px 0px' } );
      var anim = function(){
        $elm.animate( {
          backgroundPosition: _target + 'px 0px'
        }, speed, 'linear', function(){
          $elm.css( { backgroundPosition: '0px 0px' } );
          if ( !$button.hasClass( 'on' ) ){
            anim();
          }
        });
      };
      anim();
    }

    function _stop( $elm, _target, speed ){
      $elm.animate( { 
        backgroundPosition: _target + 'px 0px' 
      }, speed, 'easeOutCubic' );
    }

  });
  global.namespace = ns;

})( this, document, jQuery, this.namespace );
