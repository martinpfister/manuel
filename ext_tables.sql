/*
Uncomment this file's content in order to use your own, inherited
media fields in the page properties.
Also, you might want to adjust the field's behaviour in
Configuration/TCA/Overrides/pages.php
*/
CREATE TABLE pages
  tx_manueletter_moodimage varchar(255) DEFAULT '' NOT NULL,
  tx_manueletter_backgroundimage varchar(255) DEFAULT '' NOT NULL,
);
CREATE TABLE pages_language_overlay (
  tx_manueletter_moodimage varchar(255) DEFAULT '' NOT NULL,
  tx_manueletter_backgroundimage varchar(255) DEFAULT '' NOT NULL,
);

/*
ALTER TABLE pages ADD  tx_manueletter_moodimage varchar(255) DEFAULT '' NOT NULL;
ALTER TABLE pages ADD  tx_manueletter_backgroundimage varchar(255) DEFAULT '' NOT NULL;

ALTER TABLE pages_language_overlay ADD  tx_manueletter_moodimage varchar(255) DEFAULT '' NOT NULL;
ALTER TABLE pages_language_overlay ADD  tx_manueletter_backgroundimage varchar(255) DEFAULT '' NOT NULL;
 */