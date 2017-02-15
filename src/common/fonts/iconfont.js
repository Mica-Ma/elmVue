;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-arrowright" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M755.80526 512.782829 374.30136 137.532353c-9.404184-20.161179-30.133298-34.178427-54.217832-34.178427-32.927947 0-59.609633 26.185382-59.609633 58.474786 0 23.128767 13.691837 43.1211 33.561373 52.606125l303.305911 298.349015L294.389332 810.748105c-20.060895 9.41544-33.915437 29.510104-33.915437 52.775994 0 32.28838 26.682709 58.474786 59.609633 58.474786 23.930015 0 44.549635-13.83817 54.038754-33.789571L755.80526 512.782829z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-guanbi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M606.357018 525.171997l360.561939-360.561939c23.836895-23.836895 23.836895-62.482053 0-86.318948s-62.482053-23.836895-86.318948 0l-360.561939 360.561939-351.556844-351.556844c-24.221658-24.221658-63.49308-24.221658-87.714737 0-24.221658 24.221658-24.221658 63.49308 0 87.714737l351.556844 351.556844L103.726409 855.16471c-23.836895 23.836895-23.836895 62.482053 0 86.318948 23.836895 23.836895 62.483076 23.836895 86.318948 0l328.597947-328.596923 351.555821 351.556844c24.220634 24.221658 63.49308 24.221658 87.714737 0 24.220634-24.221658 24.220634-63.49308 0-87.714737L606.357018 525.171997z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-zuojiantou" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M274.510074 461.204104c130.168642-125.846196 260.332167-251.684206 390.490575-377.400442 53.595662-51.864228 133.49848 32.354895 79.653131 84.346013-115.838262 112.008027-231.6755 223.893256-347.450317 335.904353C513.596358 619.888196 629.989251 735.852324 746.444567 851.690586c52.978609 52.733015-26.921139 136.953162-79.712483 84.282568C535.946388 805.873074 405.233348 675.710572 274.510074 545.546024 252.90194 523.93789 252.342192 482.563574 274.510074 461.204104L274.510074 461.204104zM274.510074 461.204104"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)