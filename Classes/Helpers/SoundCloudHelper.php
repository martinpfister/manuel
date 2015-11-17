<?php
namespace Staempfli\TemplateBootstrap\Helpers;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Resource\OnlineMedia\Helpers\AbstractOEmbedHelper;

/**
 * SoundCloud helper class
 */
class SoundCloudHelper extends AbstractOEmbedHelper
{
    /**
     * Get public url
     * Return NULL if you want to use core default behaviour
     *
     * @param File $file
     * @param bool $relativeToCurrentScript
     * @return string|NULL
     */
    public function getPublicUrl(File $file, $relativeToCurrentScript = false)
    {
        return null;
    }

    /**
     * Get local absolute file path to preview image
     *
     * @param File $file
     * @return string
     */
    public function getPreviewImage(File $file)
    {
        $soundCloudId = $this->getOnlineMediaId($file);
        $temporaryFileName = $this->getTempFolderPath() . 'soundcloud_' . md5($soundCloudId) . '.jpg';
        if (!file_exists($temporaryFileName)) {
            $oEmbedData = $this->getOEmbedData($soundCloudId);
            $previewImage = GeneralUtility::getUrl($oEmbedData['thumbnail_url']);
            if ($previewImage !== false) {
                file_put_contents($temporaryFileName, $previewImage);
                GeneralUtility::fixPermissions($temporaryFileName);
            }
        }
        return $temporaryFileName;
    }

    /**
     * Try to transform given URL to a File
     *
     * @param string $url
     * @param Folder $targetFolder
     * @return File|NULL
     */
    public function transformUrlToFile($url, Folder $targetFolder)
    {
        $soundCloudId = null;

        // Get SoundCloud ID via parsing the oembed iframe URL as SoundCloud does *not*
        // allow access to the ID without registering an API key.
        $oembedInfos = GeneralUtility::getUrl('https://soundcloud.com/oembed?format=json&url='. urlencode($url));
        $oembedInfos = json_decode($oembedInfos, true);
        if (!$oembedInfos) {
            return false;
        }

        // Parsing the track id out of the embed url
        // Expects the url to be .../tracks/[here's the numerical id]/...
        // May be url encoded.
        $matches = Array();
        preg_match('#(<iframe.+src=".+)(%2F|/)tracks(%2F|/)([0-9]+)#i', $oembedInfos['html'], $matches);
        $soundCloudId = $matches[4];

        if (empty($soundCloudId)) {
            return null;
        }

        return $this->transformMediaIdToFile($soundCloudId, $targetFolder, $this->extension);
    }

    /**
     * Get oEmbed data url
     *
     * @param string $mediaId
     * @param string $format
     * @return string
     */
    protected function getOEmbedUrl($mediaId, $format = 'json')
    {
        return sprintf(
            'https://soundcloud.com/oembed?format=%s&url=%s',
            urlencode($format),
            urlencode(sprintf('https://api.soundcloud.com/tracks/%s', $mediaId))
        );
    }
}
