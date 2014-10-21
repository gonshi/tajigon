( function( global, doc, $, ns ) {
  'use strict';
  ns = ns || {};

  $(function() {
    var WIDTH = 339;
    var DELAY = 100;
    var SPEED = {
      head  : 300,
      nose  : 600,
      mouth : 100
    };
    var GON_NAME = {
      truth : '中山祐平',
      fake  : [
        'ユーヘイ',
        'ンゴ山中',
        'うまい棒'
      ]
    };
    var TAJI_NAME = {
      truth : '田島真悟',
      fake  : [
        'タージマハル',
        '田島タジ夫',
        '田島祐平'
      ]
    };
    var gon_count;
    var taji_count;
    var success = {
      title: 'スロット成功！！',
      message: 'こいつに投票しよう！'
    };

    var failure = {
      title: 'スロット失敗...',
      message: 'こいつには投票できない'
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
      _stop( $slideElm, -1 * _setSlide() * WIDTH, SPEED[ _id ] * 2 );
    } );

    $( '#retry' ).on( 'click', function(){
      init();
    } );

    /*-------------------------------------------
      INIT 
    -------------------------------------------*/
    function init(){
      $( '#balloon' ).removeClass( 'show' );
      gon_count = 0;
      taji_count = 0;
      $( '.button' ).removeClass( 'on' );
      _slide( $( '#head' ), WIDTH * -2, SPEED.head );
      setTimeout( function(){
        _slide( $( '#nose' ), WIDTH * -2, SPEED.nose );
      }, DELAY );
      setTimeout( function(){
        _slide( $( '#mouth' ), WIDTH * -2, SPEED.mouth );
      }, DELAY * 2 );
    }

    init();

    /*-------------------------------------------
      PRIVATE
    -------------------------------------------*/
    function _setSlide(){
      var random = parseInt( Math.random() * 2 ) + 1; // 1 or 2
      if ( random === 1 ){
        taji_count += 1;
      }
      else{
        gon_count += 1;
      }
      return random;
    }

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
      var succeed  = false;
      $elm.animate( { 
        backgroundPosition: _target + 'px 0px' 
      }, speed, 'easeOutCubic', function(){
        if ( $( '.button.on' ).size() === 3 ){ // fin
          if ( taji_count === 3 ){
            succeed = true;
            $( '#balloon .name' ).text( TAJI_NAME.truth );
          }
          else if ( gon_count === 3 ){
            succeed = true;
            $( '#balloon .name' ).text( GON_NAME.truth );
          }
          else if ( taji_count === 2 ){
            $( '#balloon .name' ).text( 
              TAJI_NAME.fake[ parseInt( Math.random() * 3 ) ]
            );
          }
          else if ( gon_count === 2 ){
            $( '#balloon .name' ).text( 
              GON_NAME.fake[ parseInt( Math.random() * 3 ) ]
            );
          }

          if ( succeed ){
            $( '#balloon .result' ).text( success.title );
            $( '#balloon .message' ).text( success.message );
          }
          else{
            $( '#balloon .result' ).text( failure.title );
            $( '#balloon .message' ).text( failure.message );
          }
          $( '#balloon' ).addClass( 'show' );
        }
      } );
    }

  });
  global.namespace = ns;

})( this, document, jQuery, this.namespace );
