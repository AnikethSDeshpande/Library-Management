from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

# get name with number
@frappe.whitelist()
def get_key_name(fdt, fdn):
	person = frappe.get_doc(fdt, fdn)
	
	key_name = " ".join([person.first_name, person.last_name, person.phone])
	frappe.msgprint(key_name)
	return key_name