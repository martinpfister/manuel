plugin.Tx_Formhandler.settings.predef.formhandler-basic-contactform {

	# This is the title of the predefined form shown in the dropdown box in the plugin options.
	name = Kontaktformular
	
	# All form fields are prefixed with this values (e.g. contact[name])
	formValuesPrefix = contact

	langFile.1 = TEXT
	langFile.1.value = {$formhandler.livegoing.rootPath}/lang/lang.xml

	templateFile = TEXT
	templateFile.value = {$formhandler.livegoing.rootPath}/html/step-1.html

	# The master template is a file containing the markup for specific field types or other sub templates (e.g. for emails). You can use these predefined markups in your HTML template for a specific form.
	masterTemplateFile = TEXT
	masterTemplateFile.value = {$formhandler.livegoing.rootPath}/html/mastertemplate.html


	# In case an error occurred, all markers ###is_error_[fieldname]### are filled with the configured value of the setting "default".
	isErrorMarker {
		default = error
	}
	
	# These wraps define how an error messages looks like. The message itself is set in the lang file.
	singleErrorTemplate {
		totalWrap = <small class="error">|</small>
	}

	# This block defines the error checks performed when the user hits submit.
	validators {
		1.class = Validator_Default
		1.config.fieldConf {
			email.errorCheck.1 = required
			email.errorCheck.2 = email
		}
	}

	# Finishers are called after the form was submitted successfully (without errors).
	finishers {

		# Finisher_Mail sends emails to an admin and/or the user.
		1.class = Finisher_Mail
		1.config {
			checkBinaryCrLf = message
			admin {
				templateFile = TEXT
				templateFile.value = {$formhandler.livegoing.rootPath}/html/email-admin.html
				sender_email = {$formhandler.livegoing.email.admin.sender_email}
				to_email = {$formhandler.livegoing.email.admin.to_email}
				subject = TEXT
				subject.data = LLL:{$formhandler.livegoing.rootPath}/lang/lang.xml:email_admin_subject
			}
		}

		# Finisher_Redirect will redirect the user to another page after the form was submitted successfully.
		5.class = Finisher_Redirect
		5.config {
			redirectPage = {$formhandler.livegoing.redirectPage}
		}
	}

}

# If the user has chosen to receive a copy of the contact request, reconfigure Finisher_Mail to send an email to the user to.
[globalVar = GP:contact|receive-copy = 1]
plugin.Tx_Formhandler.settings.predef.formhandler-basic-contactform {
	finishers {
		1.config {
			user {
				templateFile = TEXT
				templateFile.value = {$formhandler.livegoing.rootPath}/html/email-user.html
				sender_email = {$formhandler.livegoing.email.user.sender_email}
				to_email = email
				subject = TEXT
				subject.data = LLL:{$formhandler.livegoing.rootPath}/lang/lang.xml:email_user_subject
			}
		}
	}
}
[global]
