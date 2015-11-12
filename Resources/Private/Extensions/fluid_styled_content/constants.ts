styles.content.textmedia {
    maxW = {$imageRenderingMaxWidth}
    maxWInText = {$imageRenderingMaxWidth}
    columnSpacing = 0
    rowSpacing = 0
    textMargin = 0
    borderColor = black
    borderWidth = 0
    borderPadding = 0

    // Enlarged media max width / height
    linkWrap.width = {$imageRenderingMaxWidth}
    linkWrap.height =
    // Enable lightbox
    linkWrap.lightboxEnabled = 1
    linkWrap.lightboxCssClass = lightbox
    linkWrap.lightboxRelAttribute = lightbox[{field:uid}]
}