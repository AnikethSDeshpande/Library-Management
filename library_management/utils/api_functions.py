from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from elasticsearch import Elasticsearch


# get name with number
@frappe.whitelist()
def get_key_name(fdt, fdn):
	person = frappe.get_doc(fdt, fdn)
	
	key_name = " ".join([person.first_name, person.last_name, person.phone])
	frappe.msgprint(key_name)
	return key_name


@frappe.whitelist()
def get_details(msg):
    frappe.msgprint("get_details says, {0}".format(msg))
    return


@frappe.whitelist()
def get_articles(search_string):
    es = Elasticsearch()
    body = {
        "query": {
            "match_phrase": {
            "text_entry": search_string
            }
        }
    }

    results = es.search(index='shakespeare', body=body)

    articles = []
    for result in results['hits']['hits']:
        play_name = result['_source']['play_name']
        speech_number = result['_source']['speech_number']
        line_number = result['_source']['line_number']
        speaker = result['_source']['speaker']
        text_entry = result['_source']['text_entry']

        article = '''
            The word {0} was used in the play named {1}, by the speaker {2}, in speech number {3},
            line number {4}, and the dialogue was - <b>{5}</b>
        '''.format(
            search_string
            , play_name
            , speaker
            , speech_number
            , line_number
            , text_entry
        )

        articles.append(article)
    

    return articles



@frappe.whitelist()
def get_items(search_string, shop):
    es = Elasticsearch()

    body = {
        "size": 20, 
        "query": {
            "bool": {
            "must": [
                {
                    "match": {
                        "item_name": {"query": search_string, "analyzer": "standard"}
                    }
                }
            ],
            
            "should": [
                {
                    "term": { "shop_name": shop }
                },
                {
                    "term": { "shop_name": "all_catalog_items" }
                }
            ],
            "minimum_should_match": 1 
            }
        },
        "sort": [
            {
            "als_score": {
                "order": "desc"
            }
            }
        ]
    }
    results = es.search(index='catalog', body=body, size=15)

    items = []

    for result in results['hits']['hits']:
        item_name = result['_source']['item_name']
        # item_code = result['_source']['item_code']
        # item_sub_category = result['_source']['item_sub_category']
        # item_group = result['_source']['item_group']

        items.append(item_name)
    
    print(items)
    
    return items


@frappe.whitelist()
def display_message():
    frappe.msgprint('Hey, you saved somehting!')

