# **********************************************************
# Mailform rendering
# **********************************************************
lib.tx_form.registeredElements.defaultModelDescription.compatibilityMode = 0

plugin.tx_form._CSS_DEFAULT_STYLE >
plugin.tx_form {

    # Disable compatibility mode in order to use the new way
    # of rendering forms (MVC / Fluid).
    registeredElements.defaultModelDescription.compatibilityMode = 0
    settings.registeredElements.FORM.compatibilityMode = 0

    # Define override/local paths for Templates/Partials/Layouts.
    # ... .10 is used by the form extension itself as the 'last' possible fallback.
    view.templateRootPaths.20 = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Extensions/form/Templates/
    view.partialRootPaths.20 = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Extensions/form/Partials/
    view.layoutRootPaths.20 = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Extensions/form/Layouts/
}