<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset='utf-8' />

    <title>Adib Alwani - Home</title>

    <link rel="stylesheet" type="text/css" href="home_page/css/default.css" media="all" />
	<link rel="stylesheet" href="home_page/css/flexslider.css" type="text/css" />
	<link rel="stylesheet" href="home_page/css/fixed-navigation.css" type="text/css" />
	<link href='http://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css' />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script src="home_page/js/jquery.flexslider.js"></script>
	<script src="home_page/js/default.js"></script>

    <%--<link rel="stylesheet" href="css/home.css" />
    <link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/my-bootstrap.css" />--%>

</head>

<body>

    <div id="pagewidth">
        <header id="header">
            <nav id="mainNav">
                <form id="form1" runat="server">
                    <ul>
                        <li><a href="sitestatistics/" target="_blank"><span>SiteStatistics</span></a></li>
                        <li><a href="statistics/" target="_blank"><span>Statistics</span></a></li>
                        <li><a href="source/" target="_blank"><span>Source</span></a></li>
                        <li><a href="search/" target="_blank"><span>Search</span></a></li>
                        <li><a href="searchtree/" target="_blank"><span>SearchTree</span></a></li>
                        <li><a href="textview/" target="_blank"><span>TextView</span></a></li>
                        <li><a href="filelist.aspx" target="_blank"><span>FileList</span></a></li>
                        <li><a href="autofile.aspx" target="_blank"><span>AutoFile</span></a></li>
                        <li><a href="images/autoimage.aspx" target="_blank"><span>Images</span></a></li>
                        <li><a href="blog/" target="_blank"><span>Blog</span></a></li>
                    </ul>
                </form>
            </nav>
		</header>

        <div id="content">
            <section class="row">
				<div class="center">
					<h1>Adib Alwani</h1>
					<strong class="subHeading">Northeastern University</strong>
                    
                    <div class="columns">
                        <div class="half">
                            <div class="imgHolder fullWidth">
                                <img src="images/myphoto.jpg" alt="image" />
                            </div>
                        </div>
                        <div class="half">
                            <blockquote>
                                <q>Candidate for a Masters of Science in Computer Science at Northeastern University, Boston. 
                            This website is developed for the course CS5610 - Web Development under the guidance of 
                            Prof. Jose Annunziato. In this course, I got an indepth, hands-on experience on JavaScript 
                            frameworks especially frontend development framework - AngularJS
                                </q>
                            </blockquote>
                        </div>
                    </div>

                    <div class="columns">
                        <article class="news oneThird">
							<div>
								<h3><a>Experiments</a></h3>
								<div class="content">
									<a class="imgHolder fullWidth"><img src="home_page/img/experiments.jpg" alt="" /></a>
								</div>
								<div class="readMore"><a target="_blank" href="story/index.htm?../experiments/story.txt" class="btn btnSmall"><span>Experiment?</span></a></div>
							</div>
						</article>
                        <article class="news oneThird">
							<div>
								<h3><a>Project Documentation</a></h3>
								<div class="content">
									<a class="imgHolder fullWidth"><img src="home_page/img/documentation.jpg" alt="" /></a>
								</div>
								<div class="readMore"><a target="_blank" href="story/index.htm?../project_documentation/story.txt" class="btn btnSmall"><span>Document/Video?</span></a></div>
							</div>
						</article>
                        <article class="news oneThird">
							<div>
								<h3><a>GitHub</a></h3>
								<div class="content">
									<a class="imgHolder fullWidth"><img src="home_page/img/github.jpg" alt="" /></a>
								</div>
								<div class="readMore"><a target="_blank" href="https://github.com/adibalwani/CS5610-adib" class="btn btnSmall"><span>Code?</span></a></div>
							</div>
						</article>
                    </div>

                    <div class="columns">
                        <article class="news oneThird"></article>
                        <article class="news oneThird">
                            <div>
								<h3><a>Project</a></h3>
								<div class="content">
									<a class="imgHolder fullWidth"><img src="home_page/img/project.jpg" alt="" /></a>
								</div>
								<div class="readMore"><a target="_blank" href="project/" class="btn btnSmall"><span>Project?</span></a></div>
							</div>
						</article>
                        <article class="news oneThird"></article>
                    </div>
				</div>
			</section>
        </div>

        <footer id="footer">
			<div class="center">
				<span class="copy">&copy; Adib Alwani - Northeastern University</span>
                <a href="http://www.hitwebcounter.com/htmltutorial.php" target="_blank">
                    <img src="http://hitwebcounter.com/counter/counter.php?page=5969763&style=0038&nbdigits=5&type=page&initCount=0" title="website numbers total" alt="website numbers total" border="0">
                </a>
			</div>
		</footer>

    </div>

    <%--<form id="form1" runat="server">
        <div class="pad">
            <ul class="master_navigation">
                <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                <li><a href="statistics/" target="_blank">Statistics</a></li>
                <li><a href="source/" target="_blank">Source</a></li>
                <li><a href="search/" target="_blank">Search</a></li>
                <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                <li><a href="textview/" target="_blank">TextView</a></li>
                <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                <li><a href="blog/" target="_blank">Blog</a></li>
                <li><a href="story/index.htm?../experiments/story.txt" target="_blank">Experiments</a></li>
                <li><a href="project/" target="_blank">Project</a></li>
                <li><a href="project/" target="_blank">Project Documentation</a></li>
                <li><a href="https://github.com/adibalwani/CS5610-adib" target="_blank">GitHub</a></li>
            </ul>
        </div>
    </form>


    <div class="reset">
        <div class="col-4"><p class="inherit"></p></div>
        <div class="col-4">
            <h1>ADIB ALWANI</h1>
            <h4>Northeastern University</h4>
        </div>
    </div>

    <div class="row reset">
        <div class="col-4"><p class="inherit"></p></div>
        <div class="col-4"><img src="images/myphoto.JPG" class="inherit" /></div>
    </div>

    <div class="row reset">
        <div class="col-4"><p class="inherit"></p></div>
        <div class="col-4">
                Candidate for a Masters of Science in Computer Science at Northeastern University, Boston. 
                This website is developed for the course CS5610 - Web Development under the guidance of 
                Prof. Jose Annunziato. In this course, I got an indepth, hands-on experience on JavaScript 
                frameworks especially frontend development framework - AngularJS
        </div>
    </div>

    <div class="reset"></div>

    <div class="footer">
        <div class="col-5"><p class="inherit"></p></div>
        <ul class="social-buttons col-2">
            <li class="float">
                <a href="https://www.facebook.com/adib.alwani" target="_blank"><i class="fa fa-facebook"></i></a>
            </li>
            <li class="float">
                <a href="https://github.com/adibalwani/CS5610-adib" target="_blank"><i class="fa fa-github"></i></a>
            </li>
            <li class="float">
                <a href="https://www.linkedin.com/in/adibalwani" target="_blank"><i class="fa fa-linkedin"></i></a>
            </li>
        </ul>
        <div class="copyright reset">&copy; Adib Alwani - Northeastern University</div>
    </div>

    <div class="reset"></div>

    <!-- hitwebcounter Code START -->
    <a href="http://www.hitwebcounter.com/htmltutorial.php" target="_blank">
        <img src="http://hitwebcounter.com/counter/counter.php?page=5969763&style=0038&nbdigits=5&type=page&initCount=0" title="website numbers total" alt="website numbers total" border="0">
    </a>
    <br />
    <!-- hitwebcounter.com -->
    <a href="http://www.hitwebcounter.com/internetcountercontact.php" title="Hitwebcounter.com"
        target="_blank" style="font-family: Arial, Helvetica, sans-serif; font-size: 9px; color: #6A7175; text-decoration: underline;"><strong>Hitwebcounter.com</strong>
    </a>--%>

</body>
</html>
