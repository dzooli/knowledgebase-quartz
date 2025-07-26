---
title: Frontend
---

# HTML + Bootstrap

## Starter

### HTML responsible header start

```html
<head>
  <meta charset="utf-8">
  <title>FrontendCourseVue</title>
  <base href="./">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
```

### Include scripts (\<head\> section)

```html
  <!-- JQuery and Bootstrap -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```

### Include the stylesheet (\<head\> section)

```html
  <!-- Stylesheets -->  
  <link rel="stylesheet" type="text/css" href="styles/style.css">
```

### Include the Bootstrap stylesheet in own stylesheet (styles/style.css)

```css
@import url('https://unpkg.com/bootstrap@4.5.2/dist/css/bootstrap.min.css');
```

### Clearfix Trick (extend the container height to the element with float layout)

```css
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

.row::after {
  content: "";
  clear: both;
  display: table;
}

<div class="clearfix">
  <img style="float: left;"></img>
  <p></p>
  <p></p>
</div>
```

### Flex layout example

```css
<style>
#main {
  width: 95%;
  height: 100px;
  border: 1px solid #c3c3c3;
  display: flex;
}

#content {
  display: flex;
  height: 200px;
  width: 95%;
  border: 1px solid;
}

#content div:nth-of-type(1) {flex-grow: 2;}
#content div:nth-of-type(2) {flex-grow: 3;}

#main div:nth-of-type(1) {flex-grow: 1;}
#main div:nth-of-type(2) {flex-grow: 3;}
#main div:nth-of-type(3) {flex-grow: 1;}
#main div:nth-of-type(4) {flex-grow: 1;}
#main div:nth-of-type(5) {flex-grow: 1;}
</style>

<div id="main">
  <div></div>
  <div></div>
  <div></div>
</div>

<div id="content">
  <div></div>
  <div></div>
</div>
```

## Navigation - Bar

### Basic with Dropdown

```html
  <!-- Navigation -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <ul class="nav navbar-nav navbar-collapse mr-auto" id="navbarContent">
      <li class="nav-item navbar-brand"><h4>Weight Tracker</h4></li>
      <li class="nav-item active d-flex flex-grow-1"><a class="nav-link" href="index.html">Home</a></li>
      <li class="nav-item active d-flex flex-grow-1"><a class="nav-link" href="recipes.html">Recipes</a></li>
      <li class="nav-item active d-flex flex-grow-1"><a class="nav-link" href="enterweight.html">Weight Today</a></li>
      <li class="dropdown d-flex flex-grow-1 justify-content-right">
        <div class="btn-group">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">Statistics</button>
            <span class="sr-only">Toggle Statistics dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">My Weights</a>
            <a class="dropdown-item" href="#">Team Weights</a>
            <a class="dropdown-item" href="#">All Weights</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Draw Graphs</a>
          </div>
        </div>
        </li>
    </ul>
  </nav>
```

### Alternative

```html
<!-- Toolbar -->
<!-- Brand logo -->
<div class="toolbar" role="banner">
  <img
    width="40"
    alt="Angular Logo"
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
  />
  <!-- Add some space inbetween -->
  <span style="padding: 2px;"></span>
  <!-- Button at the left side -->
  <button class="btn btn-sm btn-primary">
    <a routerLink="/home" style="color: floralWhite;"><span style="padding: 4px;">Home</span></a>
  </button>

  <div class="spacer"></div> <!-- The rest is at the right side -->

  <span style="padding: 2px;"></span>
  <button class="btn btn-sm btn-primary">
    <a routerLink="/enterweight" style="color: floralWhite;"><span style="padding: 4px;">Your Weight</span></a>
  </button>

  <span style="padding: 2px;"></span>
  <button class="btn btn-sm btn-primary">
    <a routerLink="/teamweights" style="color: floralWhite;"><span style="padding: 4px;">Team Weights</span></a>
  </button>

  <a aria-label="Angular on twitter" target="_blank" rel="noopener" href="https://twitter.com/angular" title="Twitter">
    <svg id="twitter-logo" height="24" data-name="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="none"/>
      <path d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23" fill="#fff"/>
    </svg>
  </a>
</div>
```

## btn class list in Bootstrap

- btn-lg : very large button
- btn-xl : smaller large
- btn-sm : small button
- btn-xs : extra small
- btn-default : normal button
- btn-primary : darkblue
- btn-secondary: button without border
- btn-success : green colored button
- btn-waening : orange colored
- btn-danger  : red colored
- btn-info    : lightblue

# JQuery

[[jquery|JQuery related info]]
