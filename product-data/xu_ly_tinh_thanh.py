import json
from pprint import pprint
PATH = './tinh_thanh.json'

def read_json():
	file = open(PATH, encoding="utf8")
	data = json.load(file)

	return data["data"]

def serialize_data(data):
	serialized_data = {

	}

	for record in data:
		location = record["path_with_type"]
		splitted = location.split(', ')

		if splitted[2] in serialized_data.keys():
			# if province has already existed
			province = serialized_data[ splitted[2] ]
			if splitted[1] in province.keys():
				# if district has already existed
				serialized_data[ splitted[2] ][ splitted[1] ].append(splitted[0])
				
			else:				
				# if district has not been added
				serialized_data[ splitted[2] ][ splitted[1] ] = [ splitted[0] ]
				
		else:
			serialized_data[ splitted[2] ] = {}
			serialized_data[ splitted[2] ][ splitted[1] ] = [ splitted[0] ]
			#if province has not been added			
	return serialized_data

def main():
	data_object = read_json()
	
	serialized_data = serialize_data(data_object["data"])
	pprint(serialized_data)
	return

if __name__ == '__main__':
	main()