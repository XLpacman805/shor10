// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html


$(function() {
  $(".button-collapse").sideNav();
  var x = "paste me";
  $("#go").click(()=>{
    var new_url = $("#url_input").val().toString();
    
    $.getJSON("https://shor10.glitch.me/new/?url="+new_url, (data) =>{
      var short = data.short_url;
      var toastContent = $('<span>Copy to Clipboard</span>').add($('<button class="waves-effect waves-light btn-flat toast-action copy-btn" data-clipboard-text='+short+'><i class="fa fa-clipboard" aria-hidden="true"></i></button>'));
      Materialize.toast(toastContent, 10000,)
      new Clipboard(".copy-btn"); //Clipboard is called in Index.html
    });    
  });
  
});//end doc ready

