lib.searchbox < plugin.tx_indexedsearch
lib.searchbox.templateFile = EXT:{$plugin.templatebootstrap.packageKey}/Resources/Private/Extensions/indexed_search/indexed_search_box.tmpl

[globalVar = TSFE:id = {$plugin.tx_indexedsearch.targetPid}]
    lib.searchbox >
[global]