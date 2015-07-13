<!--Begin templates/top_bar.php -->
<div class="nav-wrapper">
    <a href="index.php" class="brand-logo">Musicaro</a>
    <a href="#" data-activates="mobile-nav" class="button-collapse"><i class="material-icons">menu</i></a>
    <ul class="right hide-on-med-and-down">
        <li>
            <form class="input-field">
                <input id="search" type="search" required class="tooltipped" data-position="bottom" 
                       data-delay="50" data-tooltip="Search Library">
                <label for="search"><i class="material-icons">search</i></label>
            </form>
        </li>
        <li><a id="update-library" class="tooltipped" data-position="bottom" 
               data-delay="50" data-tooltip="Update Library" href="#"><i class="material-icons">refresh</i></a></li>
        <li><a class="tooltipped" data-position="bottom" 
               data-delay="50" data-tooltip="Settings" href="settings.php"><i class="material-icons">settings</i></a></li>
    </ul>
    <ul class="side-nav light-blue darken-1" id="mobile-nav">
        <li>
            <form>
                <div class="input-field">
                    <input id="search" type="search" required class="tooltipped" data-position="bottom" 
                           data-delay="50" data-tooltip="Search Library">
                    <label for="search"><i class="material-icons">search</i></label>
                </div>
            </form>
        </li>
        <li><a id="update-library" class="tooltipped" data-position="bottom" 
               data-delay="50" data-tooltip="Update Library" href="#"><i class="material-icons">refresh</i></a></li>
        <li><a class="tooltipped" data-position="bottom" 
               data-delay="50" data-tooltip="Settings" href="settings.php"><i class="material-icons">settings</i></a></li>
    </ul>
</div>
<!--End templates/top_bar.php -->