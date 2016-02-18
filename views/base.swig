<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <title>xSafeSaving</title>
    <link href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAEAEAAAAAAAEAABAAAAAAEAAAAQAAAAEAAAAAEAAAEREAABERAAAAAQAAEAAAAAABAAAQAAAAAAEAABAAAAAAAQAAEAAAAAABAAAQAAAAAAERERAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP5/AAD9vwAA+98AAPfvAADv9wAAw8MAAPvfAAD73wAA+98AAPvfAAD73wAA+B8AAP//AAD//wAA" rel="icon" type="image/x-icon" />
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/css/jumbotron.css">
    <script src="/js/jquery.min.js"></script>

</head>
<body>
{% if user %}
{% include "user_authed.swig" %}
{% else %}
{% include "user_not_authed.swig" %}
{% endif %}

{% block main %} {% endblock %}


<script src="/js/bootstrap.min.js"></script>
{% block scripts %} {% endblock %}
</body>
</html>
