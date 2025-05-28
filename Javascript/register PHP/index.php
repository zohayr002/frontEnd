<?php
session_start();

session_unset();
$name = $nameError = "";
$email = $emailError = "";
$password = $passwordError = "";
$confirmPass = $confirmPassError = "";
$pays = $paysError = "";
$pass = true;


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST['nomReg'])) {
    $nameError = "Name is required";
    $pass = false;
  } else {
    $name = htmlspecialchars($_POST['nomReg']);
  }

  if (empty($_POST['emailReg'])) {
    $emailError = "Email is required";
    $pass = false;
  } else {
    $email = htmlspecialchars($_POST['emailReg']);
  }

  if (empty($_POST['passwordReg'])) {
    $passwordError = "password is required";
    $pass = false;
  } else {
    $password = htmlspecialchars($_POST['passwordReg']);
  }

  if (empty($_POST['ConfirmPassword'])) {
    $confirmPassError = "Confirming is required";
    $pass = false;
  } else {
    $confirmPass = htmlspecialchars($_POST['ConfirmPassword']);
    if (!($password == $confirmPass)){
      $confirmPassError = "passwords do not match";
      $pass = false;
    }
  }

  if (empty($_POST['pays'])) {
    $paysError = "pay is required";
    $pass = false;
  } else {
    $pays = htmlspecialchars($_POST['pays']);
  }

  if($pass){
    $_SESSION['username'] = $_POST['nomReg'];
    $_SESSION['email'] = $_POST['emailReg'];
    $_SESSION['password'] = $_POST['passwordReg'];
    $_SESSION['country'] = $_POST['pays'];
    header("Location:register.php");
  }

}




?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    overflow="auto"
    shape-rendering="auto"
    fill="#ffffff">
    <defs>
      <path
        id="wavepath"
        d="M 0 2000 0 500 Q 150 455 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z" />
      <path id="motionpath" d="M -600 0 0 0" />
    </defs>
    <g>
      <use xlink:href="#wavepath" y="279" fill="rgba(28, 253, 215 ,0.3)">
        <animateMotion dur="18s" repeatCount="indefinite">
          <mpath xlink:href="#motionpath" />
        </animateMotion>
      </use>
    </g>
  </svg>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    overflow="auto"
    shape-rendering="auto"
    fill="#ffffff">
    <defs>
      <path
        id="wavepath"
        d="M 0 2000 0 500 Q 150 410 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z" />
      <path id="motionpath" d="M -600 0 0 0" />
    </defs>
    <g>
      <use xlink:href="#wavepath" y="279" fill="rgba(28, 253, 215 ,0.8)">
        <animateMotion dur="10s" repeatCount="indefinite">
          <mpath xlink:href="#motionpath" />
        </animateMotion>
      </use>
    </g>
  </svg>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    overflow="auto"
    shape-rendering="auto"
    fill="#ffffff">
    <defs>
      <path
        id="wavepath"
        d="M 0 2000 0 500 Q 150 410 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z" />
      <path id="motionpath" d="M -600 0 0 0" />
    </defs>
    <g>
      <use xlink:href="#wavepath" y="279" fill="rgba(28, 253, 215 ,0.6)">
        <animateMotion dur="20s" repeatCount="indefinite">
          <mpath xlink:href="#motionpath" />
        </animateMotion>
      </use>
    </g>
  </svg>


  <div class="Container">
    <div class="left">
      <form id="form1" class="form1" action="login.php" method="post">
        <h2>Login</h2>
        <div class="input-field">
          <i class="fas fa-envelope" aria-hidden="true"></i>
          <input
            type="email"
            name="emailLogin"
            placeholder="Email" />
        </div>

        <div class="input-field">
          <i class="fas fa-lock" aria-hidden="true"></i>
          <input
            type="password"
            name="passLogin"
            placeholder="Password" />
        </div>
        <input class="btn" type="submit" value="Log In" />
        <input
          onclick="First()"
          class="bt"
          type="button"
          value="New Author" />
      </form>
      <div id="content1" class="content1" style="display: none">
        <h3>Already have an account</h3>
        <p>Welcome back</p>
        <input onclick="Second()" class="bt" type="button" value="Log In" />
      </div>
    </div>

    <div class="right">
      <form
        id="form2"
        class="form2"
        style="display: none"
        action=""
        method="post"
        enctype="multipart/form-data">
        <h2 class="title">Sign Up</h2>
        <div style="display: flex; gap:10px;width:100%;justify-content:center">
          <div style="width:49%;">
            <div style="grid-template-columns: 21% 85%;" class="input-field">
              <i class="fas fa-user" aria-hidden="true"></i>
              <input
                id="name"
                type="text"
                name="nomReg"
                placeholder="Full Name"
                value="<?= $name ?>" />
            </div>
            <?php if ($nameError): ?>
              <span class="showError"><?= $nameError ?></span>
              <script>
                document.querySelectorAll(".input-field")[2].style.border = "#e51d1d 2px solid"
              </script>
            <?php endif; ?>
          </div>

          <div style="width:49%;">
            <div style="grid-template-columns: 21% 85%;" class="input-field">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              <input
                type="email"
                name="emailReg"
                placeholder="Email"
                value="<?= $email ?>" />
            </div>
            <?php if ($emailError): ?>
              <span class="showError"><?= $emailError ?></span>
              <script>
                document.querySelectorAll(".input-field")[3].style.border = "#e51d1d 2px solid"
              </script>
            <?php endif; ?>
          </div>
        </div>

        <div class="input-field">
          <i class="fas fa-lock" aria-hidden="true"></i>
          <input
            type="password"
            name="passwordReg"
            placeholder="Password" 
            value="<?= $password ?>"/>
        </div>
        <?php if ($passwordError): ?>
          <span class="showError"><?= $passwordError ?></span>
          <script>
            document.querySelectorAll(".input-field")[4].style.border = "#e51d1d 2px solid"
          </script>
        <?php endif; ?>

        <div class="input-field">
          <i class="fas fa-lock" aria-hidden="true"></i>
          <input
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm Password" 
            value="<?= $confirmPass ?>"/>
        </div>
        <?php if ($confirmPassError): ?>
          <span class="showError"><?= $confirmPassError ?></span><br>
          <script>
            document.querySelectorAll(".input-field")[5].style.border = "#e51d1d 2px solid"
          </script>
        <?php endif; ?>

        <div class="input-fielz">
          <select id="pays"  name="pays">
            <option value="">--Select a Country--</option>
            <option value="fr" <?= $pays =="fr" ? "selected": "" ?>>France</option>
            <option value="be" <?= $pays =="be" ? "selected": "" ?>>Belgique</option>
            <option value="ch" <?= $pays =="ch" ? "selected": "" ?>>Suisse</option>
            <option value="ca" <?= $pays =="ca" ? "selected": "" ?>>Canada</option>
          </select>
        </div>
        <?php if ($paysError): ?>
          <span class="showError"><?= $paysError ?></span><br>
          <script>
            document.querySelector(".input-fielz").style.border = "#e51d1d 2px solid"
          </script>
          
        <?php endif; ?>


        <input type="submit" class="btn" value="Sign Up" />
        <input onclick="Second()" class="bt" type="button" value="Log In" />
      </form>

      <div id="content2" class="content2">
        <h3>New here</h3>
        <p>
          Join us as authors and share your dreams and imagination with the world!
          Create an account now and start publishing your amazing stories with us.
        </p>
        <input
          onclick="First()"
          class="bt"
          type="button"
          value="New Author" />
      </div>
    </div>
  </div>
</body>

<script src="main.js"></script>

</html>