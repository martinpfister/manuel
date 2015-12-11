# **********************************************************
# Travels up the rootline, looking for a file of a
# given extension in a given 'pages' /
# 'pages_language_overlay' field.
# **********************************************************
temp.rootLineMedia = FILES
temp.rootLineMedia {
    references.cObject = USER
    references.cObject {
        userFunc = Staempfli\TemplateBootstrap\Utility\TSRootLineMedia->getFilteredRootLineFiles
        // Field to check for media
        fieldName = media
        // Filter file types to get
        fileTypes = jpg,jpeg,png,gif
        // Maximum number of level the script will travel up the root line
        maxStepsUpTheRootLine = 1000
        // Start page uid (optional), will take the current root line per default
        // Type: int / stdWrap!
        pid = 0
    }
    maxItems = 1


    // Render file according to type
    // Type column in sys_file:
    // 0 = unknown, 1 = text, 2 = image, 3 = audio, 4 = video, 5 = software
    renderObj = CASE
    renderObj.key.data = file:current:type
    renderObj {
        2 = IMG_RESOURCE
        2 {
            file {
                import.data = file:current:uid
                treatIdAsReference = 1
                width = 1000
            }
            stdWrap.wrap = /|
        }

        4 = COA
        4 {
            10 = LOAD_REGISTER
            10.attributes =
            10.id =
            10.classes =

            20 = TEXT
            20 {
                value (
                    <video id="{register:id}" class="{register:classes}" {register:attributes}>
                        <source src="{file:current:publicUrl}" type="video/mp4" />
                    </video>
                )
                insertData = 1
                typolink.parameter.data = file:current:link
                typolink.ATagParams = class="lightbox-media"
            }


            30 = RESTORE_REGISTER
        }
    }
}