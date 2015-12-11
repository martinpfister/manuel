<?php
namespace Staempfli\TemplateBootstrap\Utility;
/***************************************************************
 *  Copyright notice
 *
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/
class TSRootLineMedia {


    /**
     * Reference to the parent (calling) cObject set from TypoScript
     */
    public $cObj;


    /**
     * Main method called by TS.
     *
     * @param string Empty string (no content to process)
     * @param array TypoScript configuration
     * @return string
     */
    public function getFilteredRootLineFiles($content, $conf) {

        // Set root line as the currently publicly available one
        $rootLine = $GLOBALS['TSFE']->rootLine;

        // Initialize file uid container
        $finalFileUids = Array();

        // Parse allowed file extensions
        $allowedFileExtensions = \TYPO3\CMS\Core\Utility\GeneralUtility::trimExplode(',', strtolower($conf['fileTypes']), true);

        // Parse max number of steps to take up the root line
        $maxStepsUpTheRootLine = intval($conf['maxStepsUpTheRootLine']);
        if ($maxStepsUpTheRootLine < 0) { $maxStepsUpTheRootLine = 0; }
        $currentRootLineStep = 1;

        // Replace root line by the one of an alternative page (optional)
        // Take simple integer input.
        if (isset($conf['pid'])) {
            $pid = intval($conf['pid']);
        }
        // Process stdWrap
        if (isset($conf['pid.'])) {
            $pid = $this->cObj->stdWrap($conf['pid'], $conf['pid.']);
        }
        // Load alternative root line
        if ($pid > 0) {
            $rootLineUtility = new \TYPO3\CMS\Core\Utility\RootlineUtility($pid);
            $rootLine = $rootLineUtility->get();
        }

        // Get media field name dynamically (stdWrap)
        if (isset($conf['fieldName'])) {
            $mediaFieldName = $conf['fieldName'];
        }
        // Process stdWrap
        if (isset($conf['fieldName.'])) {
            $mediaFieldName = $this->cObj->stdWrap($conf['fieldName'], $conf['fieldName.']);
        }


        // Go through whole root line
        foreach($rootLine as $rootLineEntryNo => $rootLineEntry) {

            // Get media field value, which contains sys_file_reference uids
            // at this point as it has been preprocessed by T3. So any hidden
            // sys_file_reference would already be stripped out of this list!
            $media = $rootLineEntry[$mediaFieldName];
            if (empty($media)) {

                // Try original language, if this page record is just an overlay.
                if (!$rootLineEntry['_PAGES_OVERLAY']) { continue; }
                // Instantiate file repository.
                if (!isset($fileRepository)) {
                    $fileRepository = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance('TYPO3\\CMS\\Core\\Resource\\FileRepository');
                }
                // Get corresponding field of original page record.
                $originalMedia = $fileRepository->findByRelation('pages', $mediaFieldName, $rootLineEntry['uid']);
                // No media found - skip this root line entry entirely.
                if (empty($originalMedia)) {
                    continue;
                // Get each media uid.
                } elseif(!empty($originalMedia)) {
                    $mediaUids = Array();
                    foreach($originalMedia as $originalMediaObject) {
                        $mediaUids[] = $originalMediaObject->getProperty('uid');
                    }
                    $media = implode(',', $mediaUids);
                }
            }

            // Resolve any file reference and check, if it is added to
            // the file uid list based on the file extension.
            $fileUids = explode(',', $media);
            foreach($fileUids as $fileUid) {
                // Resolve sys_file_reference
                $fileReferenceData = $GLOBALS['TYPO3_DB']->exec_SELECTgetSingleRow('*', 'sys_file_reference', 'uid=' . (int)$fileUid . ' AND deleted=0');
                // Get file information
                $fileData = $GLOBALS['TYPO3_DB']->exec_SELECTgetSingleRow('*', 'sys_file', 'uid=' . (int)$fileReferenceData['uid_local']);
                // Add file to the final array, if its extension is in the allowed list.
                if (in_array(strtolower($fileData['extension']), $allowedFileExtensions)) {
                    $finalFileUids[] = $fileUid;
                }
            } // foreach


            if ($currentRootLineStep > $maxStepsUpTheRootLine) { break; }
            $currentRootLineStep++;
        } // foreach root line entry

        // Return CSV value to TS.
        return implode(',', $finalFileUids);

    } // getFilteredRootLineFiles


} // TSFilesFilter
