tt_content.gridelements_pi1.20.10.setup {

    # Match this number with the uid _or alias_ (has precedence!)
    # of the gridelement DB entry!
    slider < .default
    slider {
        cObject = FLUIDTEMPLATE
        cObject.file = typo3conf/ext/{$plugin.templatebootstrap.packageKey}/Resources/Private/Templates/GridElements/Slider.html

        # Custom content element rendering for column 0
        columns.0.renderObj = COA
        columns.0.renderObj.20 = COA
        columns.0.renderObj.20 {
            wrap = <div class="slide">|</div>
            10 = TEXT
            10.value.field = header
            10.wrap = <span>|</span>
            20 < tt_content.image.20
            20 {
                # Only get first image
                1.file.import.listNum = 0
                # Remove all wraps
                imageStdWrap >
                imageStdWrapNoWidth >
                rendering >
                # Define new "layout" (wrap) for image
                layout >
                layout = TEXT
                layout.value = ###IMAGES###
            }
        }
    }
}