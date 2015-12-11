# **********************************************************
# Mainly used in FLUID templates:
# <f:cObject typoscriptObjectPath="lib.contentloader" data="0" />
# **********************************************************
temp.contentloader = COA
temp.contentloader {
    5 = LOAD_REGISTER
    5 {
        colPos.cObject = TEXT
        colPos.cObject {
            value.current = 1
            ifEmpty = 0
        }
    }
    20 < styles.content.get
    20.select.where = colPos={register:colPos}
    20.select.where.insertData = 1
}