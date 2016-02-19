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

        <ul class="nav navbar-nav navbar-right">
            <li><a  href="#uploadModal" data-toggle="modal" data-target="#uploadModal" class="glyphicon glyphicon-open"> Upload</a></li>
            <li><a class="glyphicon glyphicon-user" href="#"> {{ user }}</a></li>
            <li><a class="glyphicon glyphicon-log-out" href="/auth/logout"> Logout</a></li>

            </ul>
    </div><!-- /.navbar-collapse -->

</nav>

<div class="modal fade" id="uploadModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Upload File</h4>
      </div>
      <form method="POST" id="upload-form"  enctype="multipart/form-data" class="modal-body" action="/upload">
        <div id="register-messages"></div>
        <div class="form-group">
          <input type='hidden' name='_csrf' value='{{ _csrf }}'>
          <label for="media">Choose your file</label>
          <input id="media"  type="file" name="media" class="file">
        </div>
        <div class="modal-footer">
          <a href="#" data-dismiss="modal" class="btn">Close</a>
          <button type="submit"  class="btn btn-primary">Upload</button>
        </div>
      </form>
    </div>
  </div>
</div>

