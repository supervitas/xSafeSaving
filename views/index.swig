{% extends "base.swig" %}
{% block main %}
<div class="container">
    <div class="row row-offcanvas row-offcanvas-right">
        <div class="row">
          {% if user %}
            {% if files.length %}
              {% for file in files %}
                {% if file.type.split('/')[0] == 'image'  %}
                  <div class="col-xs-6 col-lg-4">
                      <img  class="imggal img-responsive"  src="{{ file.link }}">
                    <div class="col-xs-12">
                    <h3><a href="{{ file.link }}">{{ file.filename }}</a></h3>
                    </div>

                {% elseif file.type.split('/')[0] == 'video'  %}
                  <div class="col-xs-6 col-lg-4">
                    <div class="embed-responsive embed-responsive-4by3">
                      <video controls class="embed-responsive-item" src="{{ file.link }}"></video>
                    </div>
                    <div hidden>{{ file.id }}</div>
                    <h3><a href="{{ file.link }}">{{ file.filename }}</a></h3>
                  </div>
                {% else  %}
                  <div class="col-xs-6 col-lg-4">
                      <img height="250px" width="250px" src="/images/file.png">
                    <div hidden>{{ file.id }}</div>
                    <h3><a href="{{ file.link }}">{{ file.filename }}</a></h3>
                  </div>
          {% endif %}
              {% endfor %}
            {% else %}
            <div class="col-xs-6 col-md-offset-3">
              <h3><i>
                <br><br>
                You got nothing uploaded yet!
                Start uploading
                <button href="#uploadModal"  class="glyphicon glyphicon-open btn btn-lg btn-info"
                        data-toggle="modal" data-target="#uploadModal"></button>
              </i></h3>
            </div>
          {% endif %}
          {% else %}
          <div class="col-xs-6 col-md-offset-4">
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

<script>

  function deletefile(id){

  }

</script>


{% endblock %}

