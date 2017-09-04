$(document).ready(function() {
  var _URL = window.URL || window.webkitURL;
  var imgPreview = $("#imgPreview");
  var errorMsg = $("#errorMsgUpload");
  var imageBtns = $("#imageBtns");
  var pickImage = $("#coverImgLabel");
  var coverImage;

  pickImage.prop("disabled", false);
  imageBtns.hide();

  $("#postForm").on("change", "#campgroundImgUpload", function(event) {
    if(sizeValid(this, 3000000) && typeValid('campgroundImgUpload')) {
      errorMsg.html("");
      var reader = new FileReader();
      reader.onload = function(event) {
        document.getElementById("imgPreview").src = event.target.result;
        $("#imgPreview")
          .on("load", function() {
            errorMsg.html('');
            cropImage(16/9, 1200, 675);
            pickImage.hide();
            imageBtns.show();
          })
          .on("error", function() {
            imgPreview.src = '';
            reset();
            errorMsg.html("An error occurred displaying your image.");
          });
      };
      reader.readAsDataURL(this.files[0]);
    }
    heightAndWidthValid(this, 800, 475);
  });

  //Submit image
  $("#submitImage").on("click", function(event) {
    event.preventDefault();
    coverImage = $("#imgPreview").cropper("getData", true);
    $('#imgPreview').cropper('destroy');
    $("#imgPreview").removeAttr("src");
    imageBtns.hide();
    pickImage.show();
    pickImage.prop("disabled", true);
    console.log(coverImage);
  });

  //Crop function
  function cropImage(aspect, minW, minH) {
    $('#imgPreview').cropper({
      aspectRatio: aspect,
      viewMode: 1,
      background: false,
      modal: false,
      zoomable: true,
      minCropBoxWidth: minW,
      minCropBoxHeight: minH,
      ready: function () {
      }
    });
  };

  //Function to reset cropper data
  function reset() {
    errorMsg.html("");
    $('#imgPreview').cropper('destroy');
    $("#imgPreview").removeAttr("src");
    pickImage.show();
    pickImage.prop("disabled", false);
    imageBtns.hide();
  };

  //Validation functions
  //Validate file size
  function sizeValid(self, size) {
    if(self.files[0].size > size) {
      reset();
      errorMsg.html("Image has to be less than 3MB.");
      return false;
    } else {
      return true;
    }
  };
  //Validate file type
  function typeValid(id) {
    var id = id;
    var type = document.getElementById(id).files[0].type;
    type = type.toString();
    if(type !== "image/jpg" && type !== "image/png" && type !== "image/jpeg") {
      reset();
      errorMsg.html("Only jpg, png or jpeg image types are allowed.");
      return false;
    } else {
      return true;
    }
  };
  //Validate image height and width
  function heightAndWidthValid(self, width, height) {
    var file,
        img;

    if((file = self.files[0])) {
      img = new Image();
      img.onload = function() {
        if(this.width < width || this.height < height) {
          errorMsg.html("Images size can't be less than, "+ width+ "*"+ height+ "pixels.");
          $('#imagePreview').cropper('destroy');
          $("#imagePreview").removeAttr("src");
        }
      };
      img.src = _URL.createObjectURL(file);
    }
  }
});
