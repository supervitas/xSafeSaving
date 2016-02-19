{% extends "base.swig" %}
{% block main %}
<div class="container">
    <div class="row row-offcanvas row-offcanvas-right">
        <div class="row">
          {% if user %}
            {% if files.length %}
              {% for file in files %}
                {{ file.type }}
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
             Already a member? <a href="#loginModal" data-toggle="modal" data-target="#loginModal">Log in</a>
           </i></h3>
          </div>
          {% endif %}
        </div>
    </div>
</div>

{% endblock %}
