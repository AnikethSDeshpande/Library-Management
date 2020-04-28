// Copyright (c) 2020, Aniketh Deshpande and contributors
// For license information, please see license.txt

frappe.ui.form.on('Article', {
	refresh: function(frm) {
		console.log('i am here')
		console.log(frm.doc)

		if(frm.doc.article_name == 'Article_1'){
			alert('yes, article_one!');
			frm.doc.article_name = frm.doc.article_name + 'my extra kitkit';
			let art_name = frm.doc.article_name;
			frm.add_custom_button(__('BTN ' + frm.doc.article_name), () => {})
			console.log(frm)

		} else {
			// alert("It's not article 1 :v")
		}

		// frm.set_value({
		// 	article_name: "my cool article"
		// })

		let items_selected = frm.get_selected();
		console.log(items_selected)
	},

	get_details: function(frm){
		frm.call({
			"method": "library_management.utils.api_functions.get_details",
			args: {
				msg: 'Hey, you clicked the button!'
			}, 
			callback: function(r){
				alert('callback also came')
			}
		})
	},

	before_save: function(frm){
		console.log('before_save called');
	},

	after_save: function(frm){
		console.log('after_save called');
	}, 

	before_load: function(frm){
		console.log('before_load')
		let description = 'Excellent article, ' + frm.doc.article_name + ', written by ' + frm.doc.author;
		frm.set_value(
			{
				description: description
			}
		)
		console.log(frm.doc)
	}
});
