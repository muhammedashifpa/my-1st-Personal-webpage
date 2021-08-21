
/*==============    variables ===============*/
var nameState = false;
var secNameTry = false;
var numberState = false;
var secNumberTry = false;
var emailState = false;
var secEmailTry = false;
var messageState = true;
/*==================================       name validation      =======================================*/
/*==============    restric unwanted elements ===============*/
$('#Inputfullname').keypress(function(event){
    var x = event.which || event.keycode;
    let lastSpaceRegex = /\s$/;
    let valueBox = $('#Inputfullname').val();
    /*=====    restric double space ====*/
    if(lastSpaceRegex.test(valueBox) && x===32){
      return false;
    }
    /*=====    restric first space ====*/
    if(valueBox.length == 0 && x === 32){
      return false
    }
    if((x>=65&&x<=90)||(x>=97&&x<=122)||x===32){
      /*======= make true after false by length ========*/
      if(secNameTry&&valueBox.length>=5){
        nameState=true;
        $('#nameLabel').css("color", "var(--text-color)");
      }
      return true
    }
    else{
      return false
    }
})
/*=============  length lesstan 5  ============*/
$('#Inputfullname').blur(function(){
  let valueBox = $('#Inputfullname').val();
  if(valueBox.length<5){
    console.log('minimum 5 char');
    nameState= false;
    secNameTry=true;
    $('#nameLabel').css("color", "red");
  }
})
/*=============  autofill  ============*/
$('#Inputfullname').change(function(){
  let valueBox = $('#Inputfullname').val();
  if(valueBox.length>5){
    console.log('name auto filled');
    nameState= true;
    $('#nameLabel').css("color", "var(--text-color)");
  }
})
/*========================================     number validation    =======================================*/
$('#InputNumber').keypress(function(event){
  var x = event.which || event.keycode;
  let valueBox = $('#InputNumber').val();
  if(secNumberTry&&valueBox.length==9){
    $('#numberLabel').css("color", "var(--text-color)");
  }
  /*===== allow number only ====*/
  if((x>=48&&x<=57)){
    return true
  }
  else{
    return false
  }
})

$('#InputNumber').blur(function(){
  let valueBox = $('#InputNumber').val();
  if(valueBox.length<10){
    console.log('minimum 10 num');
    $('#numberLabel').css("color", "red");
    numberState = false;
    secNumberTry = true;
  }
})
/*=============  autofill  ============*/
$('#InputNumber').change(function(){
  let valueBox = $('#InputNumber').val();
  if(valueBox.length<10){
    console.log('minimum 10 num');
    $('#numberLabel').css("color", "red");
    numberState = false;
    secNumberTry = true;
  }
  else{
    $('#numberLabel').css("color", "var(--text-color)");
    numberState = true;
  }
})
/*========================================       email validation      =======================================*/
$('#InputEmail').blur(function(){
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let valueBox = $('#InputEmail').val();
  this.value = valueBox.trim();
  if(emailRegex.test(valueBox)){
    console.log('@gmail.com');
    emailState=true;
    $('#labelEmail').css("color", "var(--text-color)");
  }
  else{
    secEmailTry=true;
    emailState=false;
    $('#labelEmail').css("color", "red");
  }
})
$('#InputEmail').keyup(function(){
  let valueBox = $('#InputEmail').val();
  this.value = valueBox.replace(/\s/g,'')
  if(secEmailTry){
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(emailRegex.test(valueBox)){
    console.log('@gmail.com');
    emailState=true;
    $('#labelEmail').css("color", "var(--text-color)");
  }
  else{
    emailState=false;
    $('#labelEmail').css("color", "red");
  }
}
})
/*=============  autofill  ============*/
$('#InputEmail').change(function(){
  console.log('autofill')
  let valueBox = $('#InputEmail').val();
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(emailRegex.test(valueBox)){
    console.log('@gmail.com');
    emailState=true;
    $('#labelEmail').css("color", "var(--text-color)");
  }
  else{
    secEmailTry=true;
    emailState=false;
    $('#labelEmail').css("color", "red");
  }
})
/*========================================       submission      =======================================*/



/*========================================       Ajax      =======================================*/
$("#gform").submit((e)=>{
  e.preventDefault()
  if(!nameState){
    $('#nameLabel').css("color", "red");
  }
  if(!numberState){
    $('#numberLabel').css("color", "red");
  }
  if(!emailState){
    $('#labelEmail').css("color", "red");
  }
  if(nameState&&numberState&&emailState){
  $.ajax({
      url:"https://script.google.com/macros/s/AKfycbyssVG5NPkyP_uVbtuE0GRKvVGBwFg8-gOsvc21FihhQbQMRtFA4In_C8HdfP0AqHrBHg/exec",
      data:$("#gform").serialize(),
      method:"post",
      success:function (response){
          alert("Form submitted successfully")
          e.preventDefault();
          $('#gform').trigger("reset");
          nameState = false;
          secNameTry = false;
          numberState = false;
          secNumberTry = false;
          emailState = false;
          secEmailTry = false;
          messageState = true;
          //window.location.href="https://google.com"
      },
      error:function (err){
          alert("Something Error")

      }
  })
}
else{
  alert('please fill the form')
  secNameTry = true;
  secEmailTry = true;
  secNumberTry = true;
}
})

/*========================  collaps navbar  ===========================*/
$("#navbarSupportedContent").on('show.bs.collapse', function() {
  $('a.nav-link').click(function() {
      $("#navbarSupportedContent").collapse('hide');
  });
});



/*======================= navbar auto hide ===========================*/
document.addEventListener("DOMContentLoaded", function(){

  el_autohide = document.querySelector('.autohide');
  
  // add padding-top to bady (if necessary)
  navbar_height = document.querySelector('.navbar').offsetHeight;
  document.body.style.paddingTop = navbar_height + 'px';

  if(el_autohide){
    var last_scroll_top = 0;
    window.addEventListener('scroll', function() {
          let scroll_top = window.scrollY;
         if(scroll_top < last_scroll_top) {
              el_autohide.classList.remove('scrolled-down');
              el_autohide.classList.add('scrolled-up');
          }
          else {
              el_autohide.classList.remove('scrolled-up');
              el_autohide.classList.add('scrolled-down');
          }
          last_scroll_top = scroll_top;
    }); 
    // window.addEventListener
  }
}); 