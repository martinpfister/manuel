temp.menu-language = HMENU
temp.menu-language {
    special = language
    special.value = {$site.languageUids}
    special.normalWhenNoLanguage = 0

    addQueryString = 1
    addQueryString.exclude = L,cHash

    1 = TMENU
    1 {
        noBlur = 1


        # Normal link to language that exists
        NO = 1
        NO {
            #wrapItemAndSub = <li class="first">|</li>|*|<li>|</li>|*|<li class="last">|</li>
            stdWrap.cObject = TEXT
            stdWrap.cObject.value = {$site.languageLabels}
            ATagParams = class="inactive"
        }

        # Active
        ACT = 1
        ACT < .NO
        ACT {
            ATagParams = class="active"
            #wrapItemAndSub = <li class="first active">|</li>|*|<li class="active">|</li>|*|<li class="last active">|</li>
        }

        # Language that is NOT available:
        USERDEF1 < .NO
        USERDEF1 {
            ATagParams = class="inactive"
        }
    }
}