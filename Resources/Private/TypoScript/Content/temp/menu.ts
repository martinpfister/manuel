#-------------------------------------------------------------------------------
#    Menu
#-------------------------------------------------------------------------------
temp.menu = HMENU
temp.menu {

    1 = TMENU
    1 {
        noBlur = 1
        expAll = 1

        NO = 1
        NO {
            wrapItemAndSub = <li class="first">|</li>|*|<li>|</li>|*|<li class="last">|</li>
            ATagParams = class="layout-{field:layout}"
            allStdWrap.insertData = 1
            stdWrap.htmlSpecialChars = 1
            ATagTitle.field = subtitle // title
        }

        ACT <.NO
        ACT.wrapItemAndSub = <li class="first active">|</li>|*|<li class="active">|</li>|*|<li class="last active">|</li>
        ACT.ATagParams = class="active layout-{field:layout}"
        ACT.ATagBeforeWrap = 1

        CUR <.ACT

        CURIFSUB = 1
        CURIFSUB < .ACT
        CURIFSUB.wrapItemAndSub = <li class="has-sub"><span class="submenu-button"></span>|</li>

        IFSUB <.NO
        IFSUB {
            wrapItemAndSub = <li class="has-sub"><span class="submenu-button"></span>|</li>
            ATagBeforeWrap = 1
        }

        ACTIFSUB <.IFSUB
        ACTIFSUB.wrapItemAndSub = <li class="active">|</li>

        SPC <.NO
        SPC.wrapItemAndSub = <li class="divider"><label>|</label></li>
    }#1


    2 < .1
    2.wrap = <ul class="sub2">|</ul>

    3 < .2
}