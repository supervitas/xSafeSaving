{% extends "base.swig" %}
{% block main %}
<div class="container">
    <div class="row row-offcanvas row-offcanvas-right">
        <div class="row">
            {% for file in files %}
              {{ file.link }}
            {% endfor %}
            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <video controls class="embed-responsive-item" src="/images/test.webm"></video>
                </div>
                <h3><a href="/images/test.webm">Link</a></h3>
            </div>

            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <video controls class="embed-responsive-item" src="/images/siski.webm"></video>
                </div>
                <h3>Testing</h3>
            </div>

            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <video controls class="embed-responsive-item" src="/images/test.webm"></video>
                </div>
                <h3>Testing</h3>
            </div>

            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <video controls class="embed-responsive-item" src="/images/siski.webm"></video>
                </div>
                <h3>Testing</h3>
            </div>

            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                <img class="thumbnail img-responsive imggal" src="/images/1.jpg">
                </div>
                <h3>Testing</h3>
                </div>

            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <img class="thumbnail img-responsive imggal" src="/images/2.jpg">
                </div>
                <h3>Testing</h3>
            </div>
            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <img class="thumbnail img-responsive imggal" src="/images/1.jpg">
                </div>
                <h3>Testing</h3>
            </div>
            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <video controls class="embed-responsive-item" src="/images/siski.webm"></video>
                </div>
                <h3>Testing</h3>
            </div>

            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <img class="thumbnail img-responsive imggal" src="/images/1.jpg">
                </div>
                <h3>Testing</h3>
            </div>

            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <img class="thumbnail img-responsive imggal" src="/images/2.jpg">
                </div>
                <h3>Testing</h3>
            </div>
            <div class="col-xs-6 col-lg-4">
                <div class="embed-responsive embed-responsive-4by3">
                    <img class="thumbnail img-responsive imggal" src="/images/1.jpg">
                </div>
                <h3>Testing</h3>
            </div>




        </div>
    </div>
</div>

{{ currentDate }}
{% endblock %}
