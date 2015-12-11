lib.skiplinks = COA

# "Regular" skiplinks (home, navigation, content, contact)
lib.skiplinks {
    wrap = <ul id="skiplinks" title="Skiplinks" tabindex="1">|</ul>
    10 = TEXT
    10 {
        wrap = <li>|</li>
        value = <span>{LLL:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Language/locallang.xlf:skiplinks.home}</span>
        value.insertData = 1
        typolink {
            title = [ALT + 0]
            parameter = {$site.pageUids.home}
            ATagParams = accesskey="0"
        }
    }
    20 < .10
    20 {
        value = <span>{LLL:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Language/locallang.xlf:skiplinks.navigation}</span>
        typolink {
            title = [ALT + 1]
            parameter = {$site.pageUids.navigation}
            ATagParams = accesskey="1"
        }
    }
    30 < .10
    30 {
        value = <span>{LLL:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Language/locallang.xlf:skiplinks.content}</span>
        typolink {
            title = [ALT + 2]
            parameter = {$site.pageUids.content}
            ATagParams = accesskey="2"
        }
    }
    40 < .10
    40 {
        value = <span>{LLL:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Language/locallang.xlf:skiplinks.contact}</span>
        typolink {
            title = [ALT + 3]
            parameter = {$site.pageUids.contact}
            ATagParams = accesskey="3"
        }
    }
}

# Sitemap
# (might not always get implemented, thus is generated conditionally).
[globalVar = LIT:0 < {$site.pageUids.sitemap}]
    lib.skiplinks.50 < lib.skiplinks.10
    lib.skiplinks.50 {
        value = <span>{LLL:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Language/locallang.xlf:skiplinks.sitemap}</span>
        typolink {
            title = [ALT + 4]
            parameter = {$site.pageUids.sitemap}
            ATagParams = accesskey="4"
        }
    }
[global]

# Search
# (might not always get implemented, thus is generated conditionally).
[globalVar = LIT:0 < {$site.pageUids.search}]
    lib.skiplinks.60 < lib.skiplinks.10
    lib.skiplinks.60 {
        value = <span>{LLL:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Language/locallang.xlf:skiplinks.search}</span>
        typolink {
            title = [ALT + 5]
            parameter = {$site.pageUids.search}
            ATagParams = accesskey="5"
        }
    }
[global]



# Optional skiplinks
# Get skiplink text automatically from page title as we don't expect
# that additional skiplinks will lead to element ids (anchors) as
# in skiplinks 1-6.
temp.skiplink_dynamic < lib.skiplinks.10
temp.skiplink_dynamic {
    value.wrap = <span>|
    value.data = DB:pages:{$site.pageUids.optionalSkiplink1}:title
    value.noTrimWrap = || {LLL:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Language/locallang.xlf:skiplinks.pressEnter}</span>|
}

# Optional skiplinks 7-10 (ALT+6 - ALT+9)
[globalVar = LIT:0 < {$site.pageUids.optionalSkiplink1}]
    lib.skiplinks.70 < temp.skiplink_dynamic
    lib.skiplinks.70 {
        value.data = DB:pages:{$site.pageUids.optionalSkiplink1}:title
        typolink {
            title = [ALT + 6]
            parameter = {$site.pageUids.optionalSkiplink1}
            ATagParams = accesskey="6"
        }
    }
[global]
[globalVar = LIT:0 < {$site.pageUids.optionalSkiplink2}]
    lib.skiplinks.80 < temp.skiplink_dynamic
    lib.skiplinks.80 {
        value.data = DB:pages:{$site.pageUids.optionalSkiplink2}:title
        typolink {
            title = [ALT + 7]
            parameter = {$site.pageUids.optionalSkiplink2}
            ATagParams = accesskey="7"
        }
    }
[global]
[globalVar = LIT:0 < {$site.pageUids.optionalSkiplink3}]
    lib.skiplinks.90 < temp.skiplink_dynamic
    lib.skiplinks.90 {
        value.data = DB:pages:{$site.pageUids.optionalSkiplink3}:title
        typolink {
            title = [ALT + 8]
            parameter = {$site.pageUids.optionalSkiplink3}
            ATagParams = accesskey="8"
        }
    }
[global]
[globalVar = LIT:0 < {$site.pageUids.optionalSkiplink4}]
    lib.skiplinks.100 < temp.skiplink_dynamic
    lib.skiplinks.100 {
        value.data = DB:pages:{$site.pageUids.optionalSkiplink4}:title
        typolink {
            title = [ALT + 9]
            parameter = {$site.pageUids.optionalSkiplink4}
            ATagParams = accesskey="9"
        }
    }
[global]

