var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

settings = {
  component: "expandable-items",
  label: "Settings",
  items: {
    part: {
      type: "items",
      label: "Keep Alive",
      items: {
        timeoutTime: {
          ref: "timeoutTime",
          label: "Frequency (minutes)",
          type: "string",
          expression: "required",
          defaultValue: "25"
        },
        Minimum: {
          label:"Minimum value is 14",
          component: "text"
        }
      },
    },
  },
};

var definition = {
  type: "items",
  component: "accordion",
  items: {
    settings: settings,
  },
};

define(['qlik', 'jquery'], function (qlik, $) {
  // 'use strict';
  styles = '.keep-alive{display:none}.qv-mode-edit .keep-alive{display:flex;align-items:center;height:100%;}.qv-object-KeepAlive{border:0 !important} .qv-object-KeepAlive .qv-inner-object{background:transparent !important}';
  $("<style>")
    .html(styles)
    .appendTo("head");

  return {
    snapshot: { canTakeSnapshot: true },
    definition: definition,
    paint: function ($element, layout) {      
      $element.html('<div class="keep-alive"><img style="width: 100%;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAIAAAC1nk4lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAGpSURBVGhD7dpLSwJRFAfwe30QEpI9IKM2kgm5qVWLcBUFbdoJfYM2BX2IFtGmb1CrojZthIhoUQqCtCiCIittFj1gMh3oZerM3DZncWlmYJQ4JJwfB7x/vAN/hivDgNw0BWs3HvhsK1QaC5XGQqWxUGksjk/Euil0u686vNzLOYSmCMGMOqxl3MO8fli741h69bKUenyHIFkZ758Od0JoivbEj9ZhLeuLiKklWLvjeDyUj8ZpuWqdSk2HHc3Sa0y9tZnKA2xwjX6IWKg0FiqNhUpjodJYqDQWKo2FSmNxfHNZyD1vFDUIkp3E0HzXBdMOIcu6ZxR/JKNmIEqiweFJFua7y5BlA3GRXIO1Oy3d6WqelfZs5uum/P2afcla5+6tANf+BTrTWKg0FiqNhUq3ymgY+f28dZSMYho2z75/UdpsmFepa+sUju+FYcImCR0PLFQaC5XG0palHd9cNotaWv2EIFmM9U74crxyAFkiemYVX+RETUOWjASjiUCM57Ygy0KD+ljybPscoiQQCsTnRj2+33eW/u+BhUpjodJYqDQWKo2FSuNg7Ae9Xct9SsMQTwAAAABJRU5ErkJggg=="></div>');
      var app = qlik.currApp();
      var time;
      timeout = 25 * 60000;
      time = window.setInterval(function () {
        app.getList('VariableList');
        if(!!layout.timeoutTime) { 
          clearInterval(time);
        }        
      }, timeout);

      if(!!layout.timeoutTime) { 

        if(layout.timeoutTime < 14) {
          layout.timeoutTime = 14;
        } 
        console.log('layout.timeoutTime', layout.timeoutTime);
        timeout = layout.timeoutTime * 60000;

        time = window.setInterval(function () {
          app.getList('VariableList');
        }, timeout);
      }

    },
  };
});
