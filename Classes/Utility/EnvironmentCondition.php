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


class EnvironmentCondition extends \TYPO3\CMS\Core\Configuration\TypoScript\ConditionMatching\AbstractCondition {

    /**
     * Evaluate condition
     *
     * @param array $conditionParameters
     * @return bool
     */
    public function matchCondition(array $conditionParameters) {
        $result = FALSE;

        if (!empty($conditionParameters)) {
            $packageKey = $GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['Staempfli/TemplateBootstrap']['PackageKey'];
            $extensionConfiguration = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][$packageKey]);

            if (!empty($conditionParameters) && substr($conditionParameters[0], 0, 1) === '=') {
                $conditionParameters[0] = trim(substr($conditionParameters[0], 1));
            }

            if (!empty($conditionParameters) && strtolower($conditionParameters[0]) === strtolower($extensionConfiguration['environment'])) {
                $result = TRUE;
            }
        }



        return $result;
    }
}