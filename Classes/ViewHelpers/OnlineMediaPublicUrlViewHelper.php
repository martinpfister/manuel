<?php
namespace Staempfli\TemplateBootstrap\ViewHelpers;
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2015 Staempfli Webteam <webteam@staempfli.com>
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *  A copy is found in the textfile GPL.txt and important notices to the license
 *  from the author is found in LICENSE.txt distributed with these scripts.
 *
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\OnlineMediaHelperRegistry;

/**
 *
 */
class OnlineMediaPublicUrlViewHelper extends AbstractViewHelper {

    /**
     * Arguments Initialization
     */
    public function initializeArguments() {
        $this->registerArgument('fileReference', 'object', 'The file reference object of the online media.', TRUE);
    }

    /**
     * Main rendering method (getting the preview image url)
     */
    public function render() {
        $originalFile = $this->arguments['fileReference']->getOriginalFile();
        $onlineMediaHelper = OnlineMediaHelperRegistry::getInstance()->getOnlineMediaHelper($originalFile);
        if (!$onlineMediaHelper) { return false; }
        return $onlineMediaHelper->getPublicUrl($originalFile);
    }
}
