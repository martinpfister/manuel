tt_content.gridelements_pi1.20.10.setup {

    # Match this number with the uid _or alias_ (has precedence!)
    # of the gridelement DB entry!
    threecolumns < .default
    threecolumns {
        cObject = FLUIDTEMPLATE
        cObject.file = typo3conf/ext/{$plugin.templatebootstrap.packageKey}/Resources/Private/Templates/GridElements/ThreeColumns.html
    }
}