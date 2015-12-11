# **********************************************************
#   This setup generates all the needed icon images
#   for the site (excluding favicon which needs to
#   be generated locally (grunt).
#
#   Structure (roughly):
#   - 10 Loads REGISTER with icon source file path
#   - 20 The main icon COA. Contains all (!) icons in
#        different sizes based on $site.icons constants.
#   - 20.[10-100]   All "regular" png icons.
#   - 20.200        .ico file containing multiple sizes
#   - 20.300        Microsoft tile image & color.
# **********************************************************
page.headerData.20 = COA
page.headerData.20 {

    // Load icon path into register
    10 = LOAD_REGISTER
    10.iconRelPath = Resources/Private/LogoSources

    // All the icon renderings grouped by a COA.
    20 = COA

    # **********************************************************
    #  Regular PNG icons
    # **********************************************************
    20.10 = COA
    20.10 {
        // Icon rendering configuration is loaded via register
        // in order to be able to easily use it multiple times.
        10 = LOAD_REGISTER
        10 {
            iconSize = {$site.icons.1.size}
            iconSize.insertData = 1

            iconSourceFileName = icon-default
            iconSourceFileName {
                override = {$site.icons.1.iconSourceFileName}
                override.insertData = 1
                override.required = 1
            }

            colorOverlay = {$site.icons.1.colorOverlay}
            colorOverlay.insertData = 1

            backgroundColor = {$site.icons.1.backgroundColor}
            backgroundColor.insertData = 1

            relAttribute = icon
            relAttribute {
                override = {$site.icons.1.relAttribute}
                override.insertData = 1
                override.required = 1
            }

            additionalAttributes = {$site.icons.1.additionalAttributes}
            additionalAttributes {
                insertData = 1
                required = 1
                noTrimWrap = | ||
            }
        }

        // Render icon image
        // BE CAREFUL when changing any of these settings as all the
        // renderings are derived from this setup (icon 2-10, favicons, etc. - see below)!
        20 = IMG_RESOURCE
        20 {
            file {
                // Force png rendering
                ext = png
                # Add crop parameter to force re-rendering svg as png
                crop = 0,0

                // Collect ImageMagick parameters
                params.cObject = COA
                params.cObject {
                    // Valid for all icons
                    10 = TEXT
                    10 {
                        value = -colorspace RGB
                        insertData = 1
                        stdWrap.noTrimWrap = | ||
                        required = 1
                        stdWrap.required = 1
                    }

                    // Remove transparency, if there is no
                    // background color defined
                    20 < .10
                    20.value = -background transparent
                    20.if.isFalse.data = register:backgroundColor

                    // Optional icon color overlay parameter
                    30 < .10
                    30.value = {register:colorOverlay}
                    30.if.isTrue.data = register:colorOverlay
                    30.stdWrap.noTrimWrap = | -fill "|" -colorize 100%|

                    // Optional background color
                    40 < .10
                    40.value = {register:backgroundColor}
                    40.if.isTrue.data = register:backgroundColor
                    40.stdWrap.noTrimWrap = | -background "|" -alpha remove|

                    // Placeholder for internal, additional parameters (i.e. favicon)
                    100 = TEXT
                    100.noTrimWrap = | ||
                }

                // Build the path to the original file.
                // We're using .data property to avoid (invalid) nested curly braces.
                import.data = PATH:EXT:{$plugin.templatebootstrap.packageKey}/{register:iconRelPath}/{register:iconSourceFileName}.ai
                import.data.insertData = 1

                width = {register:iconSize}c
                width.insertData = 1
                height = {register:iconSize}c
                height.insertData = 1
            }
            stdWrap {
                prepend = TEXT
                prepend.char = 10
                wrap = <link href="|" rel="{register:relAttribute}" sizes="{register:iconSize}x{register:iconSize}"{register:additionalAttributes}>
                insertData = 1
                if.isPositive.data = register:iconSize
            }
        }




        # Restore register for this icon element
        50 = RESTORE_REGISTER
    }

    // Icon 2
    20.20 < .20.10
    20.20.10 {
        iconSize = {$site.icons.2.size}
        iconSourceFileName.override = {$site.icons.2.iconSourceFileName}
        colorOverlay = {$site.icons.2.colorOverlay}
        backgroundColor = {$site.icons.2.backgroundColor}
        relAttribute.override = {$site.icons.2.relAttribute}
        additionalAttributes = {$site.icons.2.additionalAttributes}
    }
    // Icon 3
    20.30 < .20.10
    20.30.10 {
        iconSize = {$site.icons.3.size}
        iconSourceFileName.override = {$site.icons.3.iconSourceFileName}
        colorOverlay = {$site.icons.3.colorOverlay}
        backgroundColor = {$site.icons.3.backgroundColor}
        relAttribute.override = {$site.icons.3.relAttribute}
        additionalAttributes = {$site.icons.3.additionalAttributes}
    }
    // Icon 4
    20.40 < .20.10
    20.40.10 {
        iconSize = {$site.icons.4.size}
        iconSourceFileName.override = {$site.icons.4.iconSourceFileName}
        colorOverlay = {$site.icons.4.colorOverlay}
        backgroundColor = {$site.icons.4.backgroundColor}
        relAttribute.override = {$site.icons.4.relAttribute}
        additionalAttributes = {$site.icons.4.additionalAttributes}
    }
    // Icon 5
    20.50 < .20.10
    20.50.10 {
        iconSize = {$site.icons.5.size}
        iconSourceFileName.override = {$site.icons.5.iconSourceFileName}
        colorOverlay = {$site.icons.5.colorOverlay}
        backgroundColor = {$site.icons.5.backgroundColor}
        relAttribute.override = {$site.icons.5.relAttribute}
        additionalAttributes = {$site.icons.5.additionalAttributes}
    }
    // Icon 6
    20.60 < .20.10
    20.60.10 {
        iconSize = {$site.icons.6.size}
        iconSourceFileName.override = {$site.icons.6.iconSourceFileName}
        colorOverlay = {$site.icons.6.colorOverlay}
        backgroundColor = {$site.icons.6.backgroundColor}
        relAttribute.override = {$site.icons.6.relAttribute}
        additionalAttributes = {$site.icons.6.additionalAttributes}
    }
    // Icon 7
    20.70 < .20.10
    20.70.10 {
        iconSize = {$site.icons.7.size}
        iconSourceFileName.override = {$site.icons.7.iconSourceFileName}
        colorOverlay = {$site.icons.7.colorOverlay}
        backgroundColor = {$site.icons.7.backgroundColor}
        relAttribute.override = {$site.icons.7.relAttribute}
        additionalAttributes = {$site.icons.7.additionalAttributes}
    }
    // Icon 8
    20.80 < .20.10
    20.80.10 {
        iconSize = {$site.icons.8.size}
        iconSourceFileName.override = {$site.icons.8.iconSourceFileName}
        colorOverlay = {$site.icons.8.colorOverlay}
        backgroundColor = {$site.icons.8.backgroundColor}
        relAttribute.override = {$site.icons.8.relAttribute}
        additionalAttributes = {$site.icons.8.additionalAttributes}
    }
    // Icon 9
    20.90 < .20.10
    20.90.10 {
        iconSize = {$site.icons.9.size}
        iconSourceFileName.override = {$site.icons.9.iconSourceFileName}
        colorOverlay = {$site.icons.9.colorOverlay}
        backgroundColor = {$site.icons.9.backgroundColor}
        relAttribute.override = {$site.icons.9.relAttribute}
        additionalAttributes = {$site.icons.9.additionalAttributes}
    }
    // Icon 10
    20.100 < .20.10
    20.100.10 {
        iconSize = {$site.icons.10.size}
        iconSourceFileName.override = {$site.icons.10.iconSourceFileName}
        colorOverlay = {$site.icons.10.colorOverlay}
        backgroundColor = {$site.icons.10.backgroundColor}
        relAttribute.override = {$site.icons.10.relAttribute}
        additionalAttributes = {$site.icons.10.additionalAttributes}
    }
    // Icon 11
    20.110 < .20.10
    20.110.10 {
        iconSize = {$site.icons.11.size}
        iconSourceFileName.override = {$site.icons.11.iconSourceFileName}
        colorOverlay = {$site.icons.11.colorOverlay}
        backgroundColor = {$site.icons.11.backgroundColor}
        relAttribute.override = {$site.icons.11.relAttribute}
        additionalAttributes = {$site.icons.11.additionalAttributes}
    }
    // Icon 12
    20.120 < .20.10
    20.120.10 {
        iconSize = {$site.icons.12.size}
        iconSourceFileName.override = {$site.icons.12.iconSourceFileName}
        colorOverlay = {$site.icons.12.colorOverlay}
        backgroundColor = {$site.icons.12.backgroundColor}
        relAttribute.override = {$site.icons.12.relAttribute}
        additionalAttributes = {$site.icons.12.additionalAttributes}
    }
    // Icon 13
    20.130 < .20.10
    20.130.10 {
        iconSize = {$site.icons.13.size}
        iconSourceFileName.override = {$site.icons.13.iconSourceFileName}
        colorOverlay = {$site.icons.13.colorOverlay}
        backgroundColor = {$site.icons.13.backgroundColor}
        relAttribute.override = {$site.icons.13.relAttribute}
        additionalAttributes = {$site.icons.13.additionalAttributes}
    }
    // Icon 14
    20.140 < .20.10
    20.140.10 {
        iconSize = {$site.icons.14.size}
        iconSourceFileName.override = {$site.icons.14.iconSourceFileName}
        colorOverlay = {$site.icons.14.colorOverlay}
        backgroundColor = {$site.icons.14.backgroundColor}
        relAttribute.override = {$site.icons.14.relAttribute}
        additionalAttributes = {$site.icons.14.additionalAttributes}
    }
    // Icon 15
    20.150 < .20.10
    20.150.10 {
        iconSize = {$site.icons.15.size}
        iconSourceFileName.override = {$site.icons.15.iconSourceFileName}
        colorOverlay = {$site.icons.15.colorOverlay}
        backgroundColor = {$site.icons.15.backgroundColor}
        relAttribute.override = {$site.icons.15.relAttribute}
        additionalAttributes = {$site.icons.15.additionalAttributes}
    }



    # **********************************************************
    #  Favicon
    #  Will not be dynamically generated on the webserver as
    #  T3 might use GraphicsMagick, which does not support ICO!
    # **********************************************************
    20.500 = TEXT
    20.500 {
        prepend = TEXT
        prepend.char = 10
        stdWrap.data = PATH:EXT:{$plugin.templatebootstrap.packageKey}/Resources/Public/Template/images/favicon.ico
        wrap = <link href="|" rel="shortcut icon" type="image/x-icon">
        required = 1
        stdWrap.required = 1
    }


    // Restore previously loaded register
    50 = RESTORE_REGISTER
}