---
title: JQuery
tags:
    - development
    - frontend
    - jquery
---

# jQuery

## Donate with PayPal

### Style

```css
.donate-buttons {
    margin-top: 20px;
    white-space: nowrap;
}

.donate-buttons .donate-with-paypal {
    display: inline-block;
    width: 150px;
    height: 37px;

    cursor: pointer;
    margin-right: 10px;
    background: url(../../img/donate-with-paypal.png) no-repeat;
}
```

### Button and hidden form

```html
<div class="donate-buttons">
    <span class="donate-with-paypal" title="Donate with PayPal"></span>
</div>
```

```html
<form target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post" id="donateFormForPaypal">
    <input type="hidden" name="cmd" value="_xclick">
    <input type="hidden" name="business" value="target@e-mail.com">
    <input type="hidden" name="lc" value="GB">
    <input type="hidden" name="item_name" value="Donate To XXX">
    <input type="hidden" name="amount" value="5.00">
    <input type="hidden" name="currency_code" value="USD">
    <input type="hidden" name="button_subtype" value="services">
    <input type="hidden" name="no_note" value="0">
    <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynow_SM.gif:NonHostedGuest">
</form>
```

### Send with JavaScript jQuery

```javascript
$(".donate-with-paypal").click(function() {
    return $("#donateFormForPaypal").submit(),
        !1
}),
```

## AJAX response handler declaration

Below are the valid parameters of an AJAX response handler function ('success' response is an example only):

```javascript
success: function(responseTxt, statusTxt, xhr) {
    ...
}
```

## Select all checkboxes with jQuery

```html
<!DOCTYPE html>
<html>

<head>
    <title>Checkbox selection test</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $(".select_all").change(function() {
                $(".cbselect").prop('checked', $(this).prop('checked'));
            });
        });
    </script>
</head>

<body>
    <h1>The selector checkbox</h1>
    <form>
        <span><input type="checkbox" name="select_all" value="all" class='select_all'>Select/deselect all checkbox in the page</span><br>
        <hr>
        <span><input type="checkbox" name="cb1" value="1" class='cbselect'>Component 1</span><br>
        <span><input type="checkbox" name="cb2" value="2" class='cbselect'>Component 2</span><br>
        <span><input type="checkbox" name="cb3" value="3" class='cbselect'>Component 3</span><br>
        <span><input type="checkbox" name="cb4" value="4" class='cbselect'>Component 4</span><br>
    </form>
</body>

</html>
```

## Table cell select

```javascript
/* example for selecting table cells in same row
 * The myinput is inside the table cell
 */
var myinput = $("input[type=text]"); // Inside a TD
myinput.keyup(function(e) {
    var resultTd = $(this).closest('tr');
    resultTd.find(":nth-child(3) > span").text(($(this).val() * 100).toString());
});
```
