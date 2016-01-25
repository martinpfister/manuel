#-------------------------------------------------------------------------------
#  Pages
#-------------------------------------------------------------------------------
TCEFORM.pages {

    # Page alias
    alias.disabled = 1

    # Abstract
    abstract.disabled = 1

    # Keywords meta tag
    keywords.disabled = 1

    # Categories
    categories.disabled = 0

    # Page type "backend user section" (remove)
    doktype.removeItems = 6

    # Frontend layouts
    # (disabled per default)
    layout {
        disabled = 0

        # Purge all items, only keep "default / inherit" (displayed as empty option field)
        #keepItems = 0
        addItems.1 = LLL:EXT:###PACKAGE_KEY###/Resources/Private/Language/Backend.xlf:frontend_layout.examplelayout
        addItems.1.icon = EXT:###PACKAGE_KEY###/path/to/your/icon.gif
    }

    # Backend layouts
    # Remove "none"
    backend_layout.removeItems = -1
    backend_layout_next_level.removeItems = -1

    # "new until"
    newUntil.disabled = 1

    # Author
    author.disabled = 1
    author_email.disabled = 1

    # Last updated
    lastUpdated.disabled = 1
}


#-------------------------------------------------------------------------------
#  Content elements
#-------------------------------------------------------------------------------
TCEFORM.tt_content {

    # Date
    date.disabled = 1

    # Categories
    categories.disabled = 0

    # Only allow headers 2, 3, and 4
    header_layout {
        keepItems = 2,3,4,100
        altLabels {
            1 = LLL:EXT:###PACKAGE_KEY###/Resources/Private/Language/Backend.xlf:tt_content.header_layout.1
            2 = LLL:EXT:###PACKAGE_KEY###/Resources/Private/Language/Backend.xlf:tt_content.header_layout.2
            3 = LLL:EXT:###PACKAGE_KEY###/Resources/Private/Language/Backend.xlf:tt_content.header_layout.3
            4 = LLL:EXT:###PACKAGE_KEY###/Resources/Private/Language/Backend.xlf:tt_content.header_layout.4
        }
    }

    # Content element layouts
    layout.disabled = 0
    layout.keepItems = 0,1
    layout.altLabels.1 = LLL:EXT:###PACKAGE_KEY###/Resources/Private/Language/Backend.xlf:tt_content.layout.examplelayout

    # Image border
    imageborder.disabled = 1

    # Image positioning
    # 0 - Above, center
    # 1 - Above, right
    # 2 - Above, left
    # 8 - Below, center
    # 9 - Below, right
    # 10 - Below, left
    # 17 - In text, right
    # 18 - in text, left
    imageorient.removeItems = 0,8,9
}


#-------------------------------------------------------------------------------
#  Default language
#-------------------------------------------------------------------------------
mod.SHARED {
    defaultLanguageLabel = English
    defaultLanguageFlag = gb
}


#-------------------------------------------------------------------------------
# Defaults for new content elements
#-------------------------------------------------------------------------------
TCAdefaults.tt_content {
    header_layout = 2
    imagecols = 1
    imageorient = 2
}


#-------------------------------------------------------------------------------
#  Permissions for new pages
#-------------------------------------------------------------------------------
TCEMAIN.permissions {
    # Owner
    userid = 1
    # Group
    groupid = 1
    # Permissions
    user = show, editcontent, edit, new, delete
    group = show, editcontent, edit, new, delete
}


#-------------------------------------------------------------------------------
#  Control elements
#-------------------------------------------------------------------------------
mod {
    # Always show "extended view"
    file_list.enableDisplayBigControlPanel = activated
    web_list.enableDisplayBigControlPanel = activated

    # Hide "Quick Edit" & "Page Information" in dropdown on the very top of a page
    web_layout.menu.function {
        0 = 0
        3 = 0
    }
}


#-------------------------------------------------------------------------------
#  Default form
#-------------------------------------------------------------------------------
mod.wizards {
    newContentElement.wizardItems {
        forms.elements {
            mailform {
                tt_content_defValues {
                    bodytext (
enctype = application/x-www-form-urlencoded
method = post
prefix = tx_form
postProcessor {
    1 = mail
    1 {
        recipientEmail =
        senderEmail =
    }
}
                    )
                }
            }
        }
    }
}


#---------------------------------------
# Default values for new user groups
#---------------------------------------

# Selectable/listable  tables
TCAdefaults.be_groups.tables_select (
    pages,sys_category,sys_collection,sys_file,sys_file_collection,sys_file_metadata,
    sys_file_reference,backend_layout,pages_language_overlay,tt_content,sys_note
)


# Non-exclude fields
TCAdefaults.be_groups.non_exclude_fields (
    pages_language_overlay:abstract,pages_language_overlay:author,pages_language_overlay:description,
    pages_language_overlay:author_email,pages_language_overlay:media,pages_language_overlay:hidden,pages_language_overlay:keywords,
    pages_language_overlay:nav_title,pages_language_overlay:shortcut_mode,pages_language_overlay:starttime,
    pages_language_overlay:endtime,pages_language_overlay:subtitle,pages_language_overlay:urltype,pages_language_overlay:doktype,
    pages_language_overlay:url,pages_language_overlay:tx_realurl_pathsegment,

    sys_category:hidden,sys_category:sys_language_uid,sys_category:starttime,sys_category:endtime,sys_category:l10n_parent,

    sys_file_metadata:categories,sys_file_metadata:title,

    sys_file_reference:alternative,sys_file_reference:description,sys_file_reference:crop,sys_file_reference:link,
    sys_file_reference:title,sys_file_reference:autoplay,
    sys_file_collection:hidden,sys_file_collection:sys_language_uid,sys_file_collection:starttime,sys_file_collection:endtime,
    sys_file_collection:l10n_parent,

    pages:newUntil,pages:abstract,pages:fe_group,pages:alias,pages:author,pages:backend_layout_next_level,pages:backend_layout,
    pages:cache_timeout,pages:cache_tags,pages:categories,pages:module,pages:description,pages:tx_realurl_nocache,pages:author_email,
    pages:url_scheme,pages:tx_realurl_exclude,pages:media,pages:nav_hide,pages:hidden,pages:extendToSubpages,pages:is_siteroot,
    pages:keywords,pages:lastUpdated,pages:layout,pages:l18n_cfg,pages:fe_login_mode,pages:nav_title,pages:no_cache,pages:no_search,
    pages:tx_realurl_pathoverride,pages:shortcut_mode,pages:content_from_pid,pages:tx_realurl_pathsegment,pages:starttime,
    pages:php_tree_stop,pages:endtime,pages:subtitle,pages:target,pages:doktype,

    tt_content:rowDescription,tt_content:fe_group,tt_content:uploads_description,tt_content:uploads_type,
    tt_content:categories,tt_content:date,tt_content:colPos,tt_content:hidden,
    tt_content:table_enclosure,tt_content:table_delimiter,tt_content:table_caption,tt_content:table_tfoot,tt_content:table_header_position,
    tt_content:image_zoom,tt_content:select_key,tt_content:imagecols,
    tt_content:section_frame,tt_content:imagewidth,tt_content:imageheight,
    tt_content:sectionIndex,tt_content:sys_language_uid,tt_content:layout,tt_content:header_link,
    tt_content:imageorient,tt_content:recursive,tt_content:starttime,tt_content:endtime,tt_content:subheader,
    tt_content:linkToTop,tt_content:l18n_parent,tt_content:header_layout,
    tt_content:pi_flexform;login;sDEF;pages,

    fe_users:address,fe_users:city,fe_users:company,fe_users:country,fe_users:disable,fe_users:email,fe_users:fax,fe_users:first_name,
    fe_users:felogin_forgotHash,fe_users:image,fe_users:lastlogin,fe_users:last_name,fe_users:lockToDomain,
    fe_users:middle_name,fe_users:name,fe_users:telephone,fe_users:tx_extbase_type,fe_users:felogin_redirectPid,fe_users:starttime,
    fe_users:endtime,fe_users:title,fe_users:TSconfig,fe_users:www,fe_users:zip
)

# Non-exclude fields
TCAdefaults.be_groups.explicit_allowdeny (
    tt_content:CType:--div--:ALLOW,tt_content:CType:header:ALLOW,tt_content:CType:textmedia:ALLOW,
    tt_content:CType:table:ALLOW,tt_content:CType:uploads:ALLOW,tt_content:CType:menu:ALLOW,
    tt_content:CType:shortcut:ALLOW,tt_content:CType:list:ALLOW,tt_content:CType:div:ALLOW,tt_content:CType:html:ALLOW,
    tt_content:CType:mailform:ALLOW,tt_content:list_type:indexedsearch_pi2:ALLOW
)

# Page types
# 1 = Default
# 3 = Link to external url
# 4 = Shortcut (internal)
# 6 = Backend user section
# 7 = Mountpoint
# 199 = Spacer
# 254 = Sysfolder
# 255 = Recycler
TCAdefaults.be_groups.pagetypes_select = 1,4,3,254,199

# Modifyable pages
TCAdefaults.be_groups.tables_modify (
    pages,sys_category,sys_collection,sys_file,sys_file_collection,sys_file_metadata,sys_file_reference,
    sys_file_storage,backend_layout, pages_language_overlay,sys_domain,tt_content
)

# Modules
TCAdefaults.be_groups.groupMods = web_layout,web_list,web_info,file_FilelistList,user_setup

# File permissions
TCAdefaults.be_groups.file_permissions (
    readFolder,writeFolder,addFolder,renameFolder,moveFolder,deleteFolder,recursivedeleteFolder,copyFolder,
    readFile,writeFile,addFile,copyFile,renameFile,replaceFile,moveFile,deleteFile
)

# DB mountpoints
# (going out on a limb here and assume '1' is the root page)
TCAdefaults.be_groups.db_mountpoints = 1

# File mounts
# (again, assuming a DB record with uid 1 exists)
TCAdefaults.be_groups.file_mountpoints = 1
