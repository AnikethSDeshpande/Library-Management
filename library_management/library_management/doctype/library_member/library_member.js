// Copyright (c) 2020, Aniketh Deshpande and contributors
// For license information, please see license.txt

frappe.ui.form.on('Library Member', {
	last_name: function(frm){
		console.log(frm.docname, frm.doctype)
		frappe.call({
			"method": "library_management.utils.api_functions.get_key_name",
			args: {
				fdt: frm.doctype,
				fdn: frm.docname
			},
			callback: function(r){
				console.log(r)
				frappe.model.set_value(
					frm.doctype,
					frm.docname,
					"key_name",
					r.message
				)
			}
		})
	},

	after_save: function(frm){
		frappe.call({
			"method": "library_management.utils.api_functions.get_key_name",
			args: {
				fdt: frm.doctype,
				fdn: frm.docname
			},
			callback: function(r){
				console.log(r)
				frappe.model.set_value(
					frm.doctype,
					frm.docname,
					"key_name",
					r.message
				)
			}
		})
	}
});
