<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset='utf-8' />

    <title>Demo Home Page</title>

    <style type="text/css">
        ul.master_navigation {
            font-size: 100%;
            font-weight: bold;
            text-align: center;
            list-style: none;
            margin: 0.5em 0;
            padding: 0;
        }

            ul.master_navigation li {
                display: inline-block;
                padding: 0 0.5%;
            }

        a {
            color: #08f;
            font-weight: bold;
            text-decoration: none;
        }

            a:visited {
                color: #88f;
            }

            a:hover {
                color: #f00;
            }

        p {
            text-align: justify;
        }
    </style>

    <style type="text/css" media="screen">
        body {
            width: 900px;
            max-width: 100%;
            margin: 0;
            padding: 0;
            background-color: azure;
        }

        .pad {
            padding: 10px;
        }
    </style>

</head>

<body>

    <div class="pad">

        <form id="form1" runat="server">

            <div>

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

                <hr />
                <img src="images/myphoto.JPG" width="300px" height="300px" />
                <p>
                    <b>My name is Adib Alwani. I am looking forward to learn new technologies and
                        enhance my progamming skills.
                    </b>
                </p>

            </div>

        </form>

    </div>

    <!-- hitwebcounter Code START -->
    <a href="http://www.hitwebcounter.com/htmltutorial.php" target="_blank">
        <img src="http://hitwebcounter.com/counter/counter.php?page=5969763&style=0038&nbdigits=5&type=page&initCount=0" title="website numbers total" alt="website numbers total" border="0">
    </a>
    <br />
    <!-- hitwebcounter.com -->
    <a href="http://www.hitwebcounter.com/internetcountercontact.php" title="Hitwebcounter.com"
        target="_blank" style="font-family: Arial, Helvetica, sans-serif; font-size: 9px; color: #6A7175; text-decoration: underline;"><strong>Hitwebcounter.com</strong>
    </a>

</body>
</html>
