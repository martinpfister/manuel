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

/**
 * This view helper returns a child value of any array or object
 * and is mostly used when the child node reference (index or string)
 * needs to be set dynamically and therefore cannot be retrieved
 * easily with standard FLUID methods.
 *
 * = Examples =
 *
 * <code title="Basic usage">
 * {getChild(parent:[[objectOrArray]], childIndex:[[indexOrName]]}"
 * </code>
 * <output>
 * Will return the child of any array or object. Used, if index number
 * or name of child needs to be set dynamically (impossible via {parent.{child}} )
 * </output>
 */
class GetChildViewHelper extends AbstractViewHelper {

	/**
	 * Check if given list contains given item. If yes, render the thenChild, otherwise
	 * the elseChild
	 *
	 * @param object $parent
	 * @param mixed $childIndex String or integer
	 * @return string
	 */
	public function render($parent, $childIndex) {

		if (is_array($parent)) {
			return $parent[$childIndex];
		} elseif(is_object($parent)) {
			return $parent->$childIndex;
		} else {
			return $parent;
		}
	}
}
