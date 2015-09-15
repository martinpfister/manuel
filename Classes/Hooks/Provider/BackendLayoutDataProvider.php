<?php
namespace Staempfli\TemplateBootstrap\Hooks\Provider;

/***************************************************************
 *
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2014 Benjamin Kott, http://www.bk2k.info
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
 ***************************************************************/

use \TYPO3\CMS\Backend\View\BackendLayout\BackendLayout;
use \TYPO3\CMS\Backend\View\BackendLayout\DataProviderContext;
use \TYPO3\CMS\Backend\View\BackendLayout\BackendLayoutCollection;
use \TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Documentation\Slots\ExtensionManager;
use TYPO3\CMS\Extbase\Utility\ExtensionUtility;
use TYPO3\CMS\Extensionmanager\Domain\Model\Extension;


/**
 * @author Benjamin Kott <info@bk2k.info>
 */
class BackendLayoutDataProvider implements \TYPO3\CMS\Backend\View\BackendLayout\DataProviderInterface {

    /**
	 * Default Backend Layouts for Bootstrap Theme
	 *
	 * @var array
	 */
	protected $backendLayouts = array();


	/**
	 * @param DataProviderContext $dataProviderContext
	 * @param BackendLayoutCollection $backendLayoutCollection
	 * @return void
	 */
	public function addBackendLayouts(DataProviderContext $dataProviderContext, BackendLayoutCollection $backendLayoutCollection) {

		$layoutConfigs = $this->getLayoutConfigs();
		foreach ($layoutConfigs as $layoutKey => $layoutConfig) {
			$backendLayout = $this->createBackendLayout($layoutConfig);

			$backendLayoutCollection->add($backendLayout);
		} // foreach found .ts files


	}


	/**
	 * Gets a backend layout by (regular) identifier.
	 *
	 * @param string $identifier
	 * @param integer $pageId
	 * @return NULL|BackendLayout
	 */
	public function getBackendLayout($identifier, $pageId){
		$layoutConfigs = $this->getLayoutConfigs();
		if(array_key_exists($identifier,$layoutConfigs)) {
			return $this->createBackendLayout($layoutConfigs[$identifier]);
		}
	}


	/**
	 * Creates a new backend layout (object) using the given record data.
	 *
	 * @param array $data
	 * @return BackendLayout
	 */
	protected function createBackendLayout(array $data) {
	  $configurationData = GeneralUtility::getUrl($data['configFilePath']);
	  $configurationData = str_replace('###PACKAGE_KEY###', $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['Staempfli/TemplateBootstrap']['PackageKey'], $configurationData);
	  $backendLayout = BackendLayout::create(
			$data['layoutKey'],
			$data['title'],
			$configurationData
		);
		$backendLayout->setIconPath($this->getIconPath($data['icon']));
		$backendLayout->setData($data);
		return $backendLayout;
	}


	/**
	 * Gets and sanitizes the icon path.
	 *
	 * @param string $icon Name of the icon file
	 * @return string
	 */
	protected function getIconPath($icon) {
		$iconPath = '';
		if (!empty($icon)) {
			$iconPath = $icon;
		}
		return $iconPath;
	}


	/**
	 * Searches its way through the config file folder in order
	 * to retrieve all the layout configuration files.
	 * @return array
	 */
	protected function getLayoutConfigs() {
		$configs = Array();
		$templateBootstrapPackageKey = $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['Staempfli/TemplateBootstrap']['PackageKey'];
		$directory = GeneralUtility::getFileAbsFileName('EXT:'. $templateBootstrapPackageKey .'/Resources/Private/TypoScript/BackendLayouts/');
		$filesOfDirectory = GeneralUtility::getFilesInDir($directory, 'ts', TRUE);
		foreach ($filesOfDirectory as $file) {
			$fileBaseName = basename($file);
			$layoutKey = substr($fileBaseName, 0, strrpos($fileBaseName, '.'));
			$data = Array(
				'layoutKey'         => $layoutKey,
				'title'             => 'LLL:EXT:'. $templateBootstrapPackageKey .'/Resources/Private/Language/Backend.xlf:backend_layout.'. $layoutKey,
				'configFilePath'    => $file,
				'icon'              => 'EXT:'. $templateBootstrapPackageKey .'/Resources/Public/Backend/Icons/Layouts/'. $layoutKey .'.png'
			);

			$configs[$layoutKey] = $data;
		} // foreach found .ts files

		return $configs;
	}

}
?>