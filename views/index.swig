{% extends "base.swig" %}
{% block main %}
<div class="container">
    <div class="row row-offcanvas row-offcanvas-right">
        <div class="row">
          {% if user %}
            {% if files.length %}
              {% for file in files %}
                {% if file.type.split('/')[0] == 'image'  %}
                  <div onclick="showModal(this)" class="col-xs-12 col-sm-6 col-md-4">
                      <img class="imggal img-responsive object" src="{{ file.link }}">
                    <div class="id_info" hidden>{{ file.id }}</div>
                    <h5><a class='media-name' href="{{ file.link }}">{{ file.filename }}</a></h5>
                    </div>

                {% elseif file.type.split('/')[0] == 'video'  %}
                  <div onclick="showModal(this)" class="col-xs-12 col-sm-6 col-md-4">
                    <div class="embed-responsive embed-responsive-4by3">
                      <video  preload="metadata" controls class="embed-responsive-item object"  src="{{ file.link }}"></video>
                    </div>
                    <div class="id_info" hidden>{{ file.id }}</div>
                    <h5><a class='media-name' href="{{ file.link }}">{{ file.filename }}</a></h5>
                  </div>
                {% else %}
                  <div onclick="showModal(this)" class="col-xs-12 col-sm-6 col-md-4">
                      <img class="imggal img-responsive object" width="250px" src="/images/file.png">
                    <div class="id_info" hidden>{{ file.id }}</div>
                    <h5><a class='media-name' href="{{ file.link }}">{{ file.filename }}</a></h5>
                  </div>
                {% endif %}
              {% endfor %}
            {% else %}
            <div class="col-md-6 col-md-offset-3">
              <h3><i>
                <br><br>
                You got nothing uploaded yet!
                Start uploading
                <button href="#uploadModal"  class="glyphicon glyphicon-open btn btn-lg btn-info"
                        data-toggle="modal" data-target="#uploadModal">
                </button>
              </i></h3>
            </div>
          {% endif %}
          {% else %}
          <div class="col-md-6 col-md-offset-4">
           <h3><i>
             <br><br>
             xSafeSaving allows you to save your files, and browse them anytime.
             Start using it
             <a href="#registerModal" data-toggle="modal" data-target="#registerModal">now</a>
             <br><br>
             Already a member? <a href="#loginModal" data-toggle="modal" data-target="#loginModal">Login</a>
           </i></h3>
          </div>
          {% endif %}
        </div>
    </div>
  <nav class="text-center">
    <ul class="pagination">
      {% for page in pagination %}
      {% if page.number == page.active %}
      <li class="active"><a href="#">{{ page.number }}</a></li>
      {% else %}
      <li><a href="?page={{ page.number }}">{{ page.number }}</a></li>
      {% endif %}
      {% endfor %}
    </ul>
  </nav>
</div>

<div class="js-preview-model modal fade" id="infoModal">
  <div class="modal-dialog  modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="js-container">
      </div>
      <div hidden class="file-id">
      </div>
      <div class="modal-footer">
        <a href="#" data-dismiss="modal" class="btn">Close</a>
        <input type="button"  class="btn btn-danger" onclick="deleteFile()" value="Delete">
      </div>
      <div class="file-info">
      </div>
    </div>
  </div>
</div>

<script>
  var currentObj = null;
  function showModal (obj) {
    currentObj = obj;
    var modal = createModal($(obj).clone());
    modal.show();
  }
  function createModal ($source) {
    var media_object = $source.find('.object')[0];
    media_object.classList.remove('imggal');
    media_object.classList.add('img-responsive');
    var media_name = $source.find('.media-name')[0].innerHTML;
    var file_id = parseInt($source.find('.id_info')[0].innerHTML);

    var $el = $('#infoModal');
    $el.find('.js-container').html(media_object);

    var iddiv = $el.find('.file-id');
    iddiv.html(file_id);
    $el.find('.modal-title').html('File Info - ' + media_name);

    return {
      show: function () {
        return $el.modal('show')
      }
    };
  }

  function deleteFile() {
    var $el = $('#infoModal');
    var file_id = parseInt($el.find('.file-id')[0].innerHTML);

      $.ajax({
        method: 'POST',
        url: '/deleteFile',
        data: {
          del_file: file_id
        },
        dataType: 'json'})
        .always(function() {
          $el.modal('hide');
          currentObj.remove();
      })

  }
</script>

{% endblock %}

