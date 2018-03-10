var playerEl
(function () {
  window.Viewbox = function Viewbox(config) {
    var wrapEl = config.el
    var port = config.port
    if (!config.port) {
      port = '80'
    }
    wrapEl.innerHTML =
      '<embed type="application/x-shockwave-flash" src="' + config.src + '" width="100%" height="100%" id="viewboxPlayer" name="f"' +
      'flashvars="video=' + config.videoUrl + '&amp;thumbnail=' + config.coverUrl + '&amp;port=' + port + '" allowscriptaccess="always"' +
      'allowfullscreen="true" bgcolor="' + config.bg + '" wmode="Opaque" />'
    playerEl = wrapEl.querySelector('embed')
  }
})()
function viewbox_inited() {
  Viewbox.prototype.play = function () {
    try {
      playerEl.invokePlayControl('start')
    } catch (err) {
      console.log(err)
    }
  }
  Viewbox.prototype.pause = function () {
    try {
      playerEl.invokePlayControl('pause')
    } catch (err) {
      console.log(err)
    }
  }
}
