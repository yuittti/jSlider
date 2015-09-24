#jSlider
*jQuery responsive slider plugin*

**Usage:**

Download zip file and upack into your project directory.

Include jQuery library and *jSlider.js* into your *index.html* file

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
      <script src="js/jSlider.js"></script>

Include *jSlider.css* in your *index.html* file after your main stylesheet file

      <link rel="stylesheet" type="text/css" href="css/style.css">

Put the links to the images for the slider in the html code bellow and paste it to the corresponding place on the
page. You can put as many sliders on the page as you need - use different id names for each slider.

    <div id="mySlider">
      <ul class="slider-box">
        <li class="slider-item"><img src="img/img11.png"></li>
        <li class="slider-item"><img src="img/img12.png"></li>
        <li class="slider-item"><img src="img/img13.png"></li>
        <!--Control buttons (left and right)-->
        <a class="slider-left" role="button"></a>
        <a class="slider-right" role="button"></a>
        <ul class="slider-pointers">
        <!--Leave empty - will be added from jSlider.js-->
        </ul>
      </ul>
    </div>

To start the slider use script

    $(document).ready(function(){
      $("#mySlider").jSlider();
    });

Default rotation interval is set to 2000ms, and default slide transition - to 500ms.
You can specify your own interval and transition - to do this start slider with your preferable values:

    $(document).ready(function(){
    $("#mySlider").jSlider({
      slidingTime: [set your own slides transition time, i.e. 500],
      rotateDelay: [set your own interval between slides changes, i.e. 2000]
    });

*Tested: Chrome 39, Mozilla 40, Opera 32*
