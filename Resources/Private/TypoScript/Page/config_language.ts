# Default language
config {
    sys_language_uid = 0
    sys_language_isocode = en
    locale_all = en_GB
}
plugin.tx_indexedsearch._DEFAULT_PI_VARS.lang = 0

# Français
[globalVar = GP:L=1]
    config {
        sys_language_uid = 1
        sys_language_isocode = de
        locale_all = de_CH
    }
    plugin.tx_indexedsearch._DEFAULT_PI_VARS.lang = 1
[global]

# Copy language isocode to 'language' and html tag language key
config.language < config.sys_language_isocode
config.htmlTag_langKey < config.sys_language_isocode