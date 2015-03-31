# **********************************************************
# Content element rendering
# **********************************************************
tt_content {

    # **********************************************************
    # "to top" link
    stdWrap.innerWrap2.cObject = COA
    stdWrap.innerWrap2.cObject {
        10 = TEXT
        10 {
            value = |
        }

        20 = TEXT
        20 {
            wrap = <p class="linkToTop no-print">|</p>
            data = LLL:EXT:css_styled_content/pi1/locallang.xml:label.toTop
            typolink {
                parameter.dataWrap = {getIndpEnv:TYPO3_REQUEST_URL}#top
            }
        }
    }


    # **********************************************************
    # Lightbox
    image.20.1.imageLinkWrap {
        JSwindow = 0
        directImageLink = 1
        linkParams.ATagParams {
            dataWrap = class= "lightbox" rel="lightbox{field:uid}"
        }
    }


    # **********************************************************
    # Image column wraps
    # Implement foundation's "block grid"
    image.20 {

        # Render dimensions definition.
        # Set maximum widths.
        1.file {
            width >
            maxW.field = imagewidth
            maxH.field = imageheight

            # Override max width by the general max render
            # width, if it is smaller. - and yes, the field
            # name in this case IS "imageWidth"!
            maxW.override = {$imageRenderingMaxWidth}
            maxW.override.if {
                value = {$imageRenderingMaxWidth}
                isLessThan.field = imageWidth
            }
        }

        # Delete max width depending on number of columns.
        # Dimensions are set via 1.file object (see previous section)!
        maxW >
        maxWInText >

        # Reset spacings as those are handled by CSS.
        colSpace = 0
        textMargin = 0

        # Additional classes
        addClasses =
        addClassesCol =

        # Basic image "row" wraps.
        imageStdWrap >
        imageStdWrap {
            dataWrap = <div class="csc-textpic-imagewrap ###CLASSES###" ###ATTRIBUTES###>|</div>

            dataWrap.replacement {
                10 {
                    search = ###CLASSES###
                    replace =
                    replace.override.cObject = COA
                    replace.override.cObject {
                        10 = TEXT
                        10.value = has-{field:imagecols}-columns
                        20 = TEXT
                        20.value = rowsDisabled
                        20.if.isTrue.field = image_noRows
                        20.noTrimWrap = | ||
                    }

                }
                20 {
                    search = ###ATTRIBUTES###
                    replace =
                    replace.override = style="max-width:{field:imagewidth}px;"
                    replace.override.if.isPositive.field = imagewidth
                }
            }
        }

        # Disabled image rows
        # (set by editor via backend)
        # This basically enables to user to render the images
        # top-down instead of left-right. We use the same wrap-definitions as for
        # the regular rendering (left-right a.k.a. imageStdWrap).
        imageStdWrapNoWidth >
        imageStdWrapNoWidth < .imageStdWrap


        # Wrap every image column, even if there is just one.
        imageColumnStdWrap >
        imageColumnStdWrap.wrap = <div class="csc-textpic-imagecolumn">|</div>


        # Our own render method & wraps
        renderMethod = figure
        rendering.figure >
        rendering.figure {
            imageRowStdWrap.dataWrap = <div class="csc-textpic-imagerow">|</div>
            imageLastRowStdWrap.dataWrap = <div class="csc-textpic-imagerow csc-textpic-imagerow-last">|</div>
            imageColumnStdWrap.wrap = <div class="csc-textpic-imagecolumn">|</div>
            noRowsStdWrap.wrap = |

            # Single image wrap
            oneImageStdWrap.dataWrap = <figure class="csc-textpic-image">|</figure>
            oneImageStdWrap.dataWrap.override = <div class="csc-textpic-imagecolumn"><figure class="csc-textpic-image">|</figure></div>
            oneImageStdWrap.dataWrap.override.if.isFalse.field = image_noRows

            # Image captions
            caption.wrap = <figcaption>|</figcaption>
            caption.required = 1

            # Image tag & edit icons
            imgTagStdWrap.wrap = |
            editIconsStdWrap.wrap = <div>|</div>
        }
    }


    # **********************************************************
    # COA for content element classes
    # based on section_frame and responsive display classes
    stdWrap.innerWrap.cObject.default.20.10 >
    stdWrap.innerWrap.cObject.default.20.10 = COA
    stdWrap.innerWrap.cObject.default.20.10 {
        # Default content element class
        5 = TEXT
        5.value = element
        5.noTrimWrap = || |

        10 = TEXT
        10.value = {field:CType}-element
        10.insertData = 1
        10.noTrimWrap = || |

        # Content element layout class
        15 = TEXT
        15.if.value = 0
        15.if.isGreaterThan.field = layout
        15.value = layout-{field:layout}
        15.value.insertData = 1
        15.noTrimWrap = || |

        # Placeholder for responsive display class
        20 = TEXT
    }


    # Add responsive display classes
    # Hierarchy (X.20.10.20):
    #   X: "content_frame" number
    #       20: native COA for element tag creation
    #           10: COA for element classes (TYPO3 would add TEXT element w/ class "csc-default" natively)
    #               20: Responsive display class (see stdWrap.innerWrap.cObject.default further up)
    stdWrap.innerWrap.cObject {
        20 =< tt_content.stdWrap.innerWrap.cObject.default
        20.20.10.20.value = show-for-small-only
        21 =< tt_content.stdWrap.innerWrap.cObject.default
        21.20.10.20.value = show-for-medium-only
        22 =< tt_content.stdWrap.innerWrap.cObject.default
        22.20.10.20.value = show-for-medium-up
        23 =< tt_content.stdWrap.innerWrap.cObject.default
        23.20.10.20.value = show-for-large-only
        24 =< tt_content.stdWrap.innerWrap.cObject.default
        24.20.10.20.value = show-for-large-up
        25 =< tt_content.stdWrap.innerWrap.cObject.default
        25.20.10.20.value = show-for-xlarge-only
        26 =< tt_content.stdWrap.innerWrap.cObject.default
        26.20.10.20.value = show-for-xlarge-up
        27 =< tt_content.stdWrap.innerWrap.cObject.default
        27.20.10.20.value = show-for-xxlarge-up
    }
}

# **********************************************************
# Remove csc-firstHeader header classes
# (will not work with nested elements anyway)
# **********************************************************
lib.stdheader.3.headerClass.cObject.20 >