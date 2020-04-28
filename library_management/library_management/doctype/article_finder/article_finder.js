// Copyright (c) 2020, Aniketh Deshpande and contributors
// For license information, please see license.txt

frappe.ui.form.on('Article Finder', {
	search_btn: function(frm) {
		frm.call({
			'method': 'library_management.utils.api_functions.get_articles',
			args: {
				search_string: frm.doc.search_string
			},
			callback: function(data){
				// console.log(data.message)
				let print_string = ''

				data.message.forEach(
					string => {
						print_string += '<ol><li data-list="ordered">'
						print_string += string
						print_string += '</li></ol>'
					}
				)

				frappe.model.set_value(
					frm.doctype,
					frm.docname,
					'search_results',
					print_string
				)
			}
		})
	},
	
	refresh: function(frm){
		frappe.model.set_value(
			frm.doctype,
			frm.docname,
			'search_results',
			''
		)
	}
});
