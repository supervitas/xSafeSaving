<nav class="navbar navbar-default" role="navigation">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
    </div>
    <a class="navbar-brand glyphicon glyphicon-cloud-upload" href="/"> xSafeSaving</a>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="navbar-collapse-1">

        <ul class="nav navbar-nav navbar-left">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle glyphicon glyphicon-picture" data-toggle="dropdown"> <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li><a class="glyphicon glyphicon-facetime-video" href="#"></a></li>
                    <li><a class="glyphicon glyphicon-pencil" href="#"></a></li>
                    <li><a class="glyphicon  glyphicon-camera" href="#"></a></li>
                </ul>
            </li>
        </ul>

    <form class="navbar-form navbar-right">
        <div class="form-group">
            <div class="btn-group">
                <a href="#loginModal" data-toggle="modal" data-target="#loginModal" type="button" class="btn btn-link" >
                    <i class="glyphicon glyphicon-log-in"></i>
                    Log in
                </a>
                <a href="#registerModal" data-toggle="modal" data-target="#registerModal" type="button" class="btn btn-link">
                    <i class="glyphicon glyphicon-plus"></i> Register
                </a>
            </div>
        </div>
    </form>
  </div><!-- /.navbar-collapse -->
</nav>
<div class="modal fade" id="loginModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Log in</h4>
      </div>
      <form method="POST" id="login-form"  class="modal-body">
        <div id="messages"></div>
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input name="username" class="form-control" id="exampleInputEmail1" placeholder="Username" type="text">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" type="password">
        </div>
        <p class="text-left">Or you can <button type="button" class="btn btn-info" id="register-trigger">Register</button>
      <div class="modal-footer">
        <a href="#" data-dismiss="modal" class="btn">Close</a>
        <input type='hidden' name='_csrf' value='{{ _csrf }}'>
        <button type="submit"  class="btn btn-primary">Log in</button>
      </div>
      </form>
    </div>
  </div>
</div>
<div class="modal fade" id="registerModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Register</h4>
      </div>
      <form method="POST" id="register-form"  class="modal-body">
        <div id="register-messages"></div>
        <div class="form-group">
          <label for="Username">Username</label>
          <input name="username" class="form-control" id="Username" placeholder="Username" type="text">
        </div>
        <div class="form-group">
          <label for="Password">Password</label>
          <input name="password" class="form-control" id="Password" placeholder="3 symbols minimal" type="password">
        </div>
        <div class="modal-footer">
          <a href="#" data-dismiss="modal" class="btn">Close</a>
          <input type='hidden' name='_csrf' value='{{ _csrf }}'>
          <button type="submit"  class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</div>
<script type="text/javascript">
  $("#register-trigger").click(function(){
    $('#loginModal').modal('hide');
    $('#registerModal').modal('show');
  });
  $('#login-form').submit(function(e) {
    var form = $(this);
    var formdata = false;
    if(window.FormData){
      formdata = new FormData(form[0]);
    }
    var formAction = form.attr('action');

    $.ajax({
      type        : 'POST',
      url         : '/auth/login',
      cache       : false,
      data        : formdata ? formdata : form.serialize(),
      contentType : false,
      processData : false,
      dataType: 'json',

      success: function(response) {
        location.reload();
      },
      error : function(response){
        var log = JSON.parse(response.responseText);
        $('#messages').addClass('alert alert-danger').text(log.error);
      }
    });
    e.preventDefault();
  });
  $('#register-form').submit(function(e) {
    var form = $(this);
    var formdata = false;
    if(window.FormData) {
      formdata = new FormData(form[0]);
    }
    var formAction = form.attr('action');
    $.ajax({
      type        : 'POST',
      url         : '/auth/register',
      cache       : false,
      data        : formdata ? formdata : form.serialize(),
      contentType : false,
      processData : false,
      dataType: 'json',

      success: function(response) {
        $.ajax({
          type        : 'POST',
          url         : '/auth/login',
          cache       : false,
          data        : formdata ? formdata : form.serialize(),
          contentType : false,
          processData : false,
          dataType: 'json',

          success: function(response) {
            location.reload();
          },
          error : function(response){
            var log = JSON.parse(response.responseText);
            $('#messages').addClass('alert alert-danger').text(log.error);
          }
        });

      },
      error : function(response) {
        $('#register-messages').addClass('alert alert-danger').text(response.responseText);
      }
    });
    e.preventDefault();
  });

</script>
