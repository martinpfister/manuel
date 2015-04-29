temp.menu-language = HMENU
temp.menu-language {
    special = language
    special.value = {$site.languageUids}
    special.normalWhenNoLanguage = 0

    wrap = <nav class="language"><ul>|</ul></nav>

    1 = TMENU
    1 {
        noBlur = 1


        # Normal link to language that exists
        NO = 1
        NO {
            wrapItemAndSub = <li class="first">|</li>|*|<li>|</li>|*|<li class="last">|</li>
            stdWrap.override = {$site.languageLabels}

            # Standardmäßige Verlinkung des Menüs ausschalten
            # Da diese sonstige GET-Parameter nicht enthält
            doNotLinkIt = 1
            # Nun wird der Link mit den aktuellen GET-Parametern neu aufgebaut
            stdWrap.typolink.parameter.data = page:uid
            stdWrap.typolink.additionalParams = {$site.languageSwitcher}
            stdWrap.typolink.addQueryString = 1
            stdWrap.typolink.addQueryString.exclude = L,id,cHash,no_cache
            stdWrap.typolink.addQueryString.method = GET
            stdWrap.typolink.useCacheHash = 1
            stdWrap.typolink.no_cache = 0
        }

        # Active
        ACT = 1
        ACT < .NO
        ACT {
            ATagParams = class="active"
            wrapItemAndSub = <li class="first active">|</li>|*|<li class="active">|</li>|*|<li class="last active">|</li>
        }

        # Language that is NOT available:
        USERDEF1 < .NO
        USERDEF1.doNotLinkIt = 1
    }
}
