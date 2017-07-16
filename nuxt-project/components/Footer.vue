<template>
<section>
  <footer class="footer-distributed">
			<div class="footer-right">
        <p class="footer-links">
          <a href="https://twitter.com/codedoesgood?lang=en" target="_blank"><img width="50px" height="50px" src="/img/twitter.png"/></a>
          <a href="https://www.linkedin.com/company-beta/17986961/" target="_blank"><img width="50px" height="50px" src="/img/linked.png"/></a>
          <a href="https://github.com/CodeDoesGood" target="_blank"><img width="50px" height="50px" src="/img/github.png"/></a>
        </p>
			</div>
			<div class="footer-left">
        <div class="footerLogoContainer">
          <a href="/" class="logoLink"><span class="footerLogo">< CDG /></span></a>
				  <p>&copy; CodeDoesGood. 2017</p>
        </div>
				<p class="footer-links">
					<a href="/About" class="footerLinks" >About</a>
					<a href="/Community" class="footerLinks" >Community</a>
					<a href="/Contact" class="footerLinks" >Contact Us</a>
				</p>
			</div>
		</footer>
  </section>
</template>

<style>

.footerLogoContainer {
  float:left;
  text-align: center;
}

.logoLink {
  text-decoration:  none;
}

.footer-links a {
  margin-left: 40px;
  color: #818181;
}

.footerLogo {
  font-size: 30px;
  color:white;


}
.footer-distributed{
	background-color: #0d0d0d;
	width: 100%;
	text-align: left;
  font: normal 16px sans-serif;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 3em;
}

.footer-distributed .footer-left p{
	color:  #818181;
	font-size: 14px;
	margin: 5px;
}

/* Footer links */

.footer-distributed p.footer-links{
	font-size:18px;
	font-weight: bold;
	color:  #ffffff;
	padding: 0;
}

.footer-distributed p.footer-links a{
	display:inline-block;
	line-height: 1.8;
	text-decoration: none;
}

.footer-distributed .footer-right{
	float: right;
  max-width: 180px;
}

.footer-distributed .footer-right a{
	display: inline-block;
	width: 50px;
	height: 50px;
	font-size: 20px;
	color: #ffffff;
	text-align: center;
	line-height: 50px;

	 margin-left: 10px;
}

.footer-left {
  margin-left: 15%;
}

.footer-right {
  margin-right: 15%;
}

</style>
