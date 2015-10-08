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

use TYPO3\CMS\Core\Utility\GeneralUtility;


class GravatarAvatarProvider implements \TYPO3\CMS\Backend\Backend\Avatar\AvatarProviderInterface {

    public function getImage(array $backendUser, $size) {

        // Get user email address
        $emailAddress = strtolower( trim( $backendUser['email'] ) );
        if (empty($emailAddress)) { return NULL; }

        // Create gravatar URL
        $url = 'http://www.gravatar.com/avatar/'. md5( $emailAddress ).'?s='. $size . '&d=404&r=pg';

        // Get image via URL
        $imageResponse = false;
        GeneralUtility::getUrl($url, NULL, 2, $imageResponse);

        // Return NULL, if there was an error (counting 404 as well,
        // otherwise return image object.
        if (intval($imageResponse['error']) > 0) {
            return NULL;
        } else {
            return GeneralUtility::makeInstance(\TYPO3\CMS\Backend\Backend\Avatar\Image::class, $url, $size, $size);
        }
    }

} // class PageNotFoundHandler
