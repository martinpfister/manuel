# Page template
page.10 = FLUIDTEMPLATE
page.10 {

    templateRootPaths {
        10 = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Templates/Page
    }
    partialRootPaths {
        10 = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Partials
    }
    layoutRootPaths {
        10 = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Layouts
    }


    # Get template file name dynamically
    templateName = TEXT
    templateName.stdWrap {
        cObject = TEXT
        cObject {
            data = pagelayout
            # Split selected layout ([extkey]__BackendLayoutName) by '__' and return last part as layout name
            split {
                token = __
                returnKey = 1
            }
        }
        ifEmpty = SingleColumn
    }


    # Passing values to FLUIDTEMPLATE for later use
    settings {
        company.name = {$company.name}
        company.street = {$company.street}
        company.pobox = {$company.pobox}
        company.city = {$company.city}
        company.phone = {$company.phone}
        company.email = {$company.email}
        site.url = {$site.url}
    }

    variables {
        pagetitle = TEXT
        pagetitle.data = page:title
    }

}