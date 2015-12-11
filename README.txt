########################################################################
# Setup for new sites
########################################################################
- Create a new repository
- Make an initial commit
- Clone repository locally
- Add origin to templatebootstrap ("git remote add templatebootstrap ssh://git@stash.staempfli.com:7999/typo3/templatebootstrap.git")
- Fetch files from (non-default) origin "templatebootstrap": "git pull templatebootstrap master"
- Change property 'title' in ext_emconf.php
- Activate extension in the extension manager
- Choose "Site environment" in extension configuration accordingly. Skim through the other options as well.
- Install extension "realurl"
- RealURL: Set "basic.configFile" (in ext conf) to
    "typo3conf/ext/[YOUR NEW EXTENSION KEY]/Resources/Private/Extensions/realurl/realurl_conf.php"
- Install extension "gridelements". You'll need the 3.0.0 DEV version in order to make it work with T3 > 6.0
    https://github.com/TYPO3-extensions/gridelements
- Run "npm install" and then "grunt" from "typo3conf/ext/[YOUREXTENSIONKEY]/Resources/Public/Template" in order
    to install node modules and get going with SCSS.
- Add static templates to your root ts template. What you'll usually want is:
    - Content Elements (fluid_styled_content)
    - Default TS (form)
    - Gridelements (gridelements)
    - yourextension (yourextension)

    => Make sure, your extension constants are included last!
    => Choose option "Include before all static templates if root flag is set"

- Have fun!


########################################################################
# Setup for custom inherited media fields in page properties such
# as background images and/or mood images.
########################################################################
If you need additional media fields that get inherited and fall back to the default language properly,
the easiest thing you could do is to uncomment the commands in ext_tables.sql. And you're good to go.

If you need custom adjustments or want to tear down this feature have a look at:
- ext_tables.sql
- ext_localconf.php (look for 'pageOverlayFields')
- TCA/Overrides/pages.php
- Resources/Private/TypoScript/Content/temp/rootLineMedia.ts
- Resources/Private/Language/Backend.xlf (plus [yourlocalization].Backend.xlf)