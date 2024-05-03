import openpyxl

SHEET_PATH = './danh_muc-san_pham.xlsx'

def eliminate_and_replace_duplicate( data ):
	cache = {}	
	for record in data:
		check_value = record[0]
		key = '{0}'.format(check_value)
		if key in cache.keys():			
			pivot = cache[key]
			cache[key] += 1
			record[0] = '{0}-{1}'.format(check_value, pivot)
		else:
			cache[key] = 1
	return data

def serialize_data():
	wb 		= openpyxl.load_workbook(SHEET_PATH)
	sheet 	= wb["MainSheet"]
	cells	= sheet["B3:S970"]

	data = []
	for row in cells:
		record = []
		for cell in row:
			record.append(cell.value)
		data.append(record)

	concrete_data = eliminate_and_replace_duplicate(data)
	'''
		( ma_san_pham, ten_san_pham, gioi_thieu, mo_ta, thong_so_ky_thuat, gia, dang_giam_gia, phan_tram_giam, san_pham_moi, anh_dai_dien, 
			dong_san_pham, loai_san_pham, nhom_san_pham, don_vi_tinh, thuong_hieu, trang_thai )
	'''
	return concrete_data

def sizing_format(size):
	if size:
		return "x{0}".format(size)
	return ""


def stringify_query( data ):
	values = []
	for record in data:	
		product_id 	 = record[0]
		product_name = record[5]
		intro 		 = ""
		desc		 = ""
		tech		 = ""
		if record[1]:
			tech += "{0}{1}{2}(mm) \n".format(record[1], sizing_format(record[2]), sizing_format(record[3]))
		if record[4]:
			tech += record[4]

		price		 = record[11]
		is_for_sale  = False
		sale_percentage = 0
		is_new		 = False
		image 		 = 	""
		if record[15]:
			image_name = record[15].split('\\').pop()
			image = '/assets/products/{0}.jpg'.format(image_name)

		cate_id 	 =  record[7]
		type_id		 =  record[8]
		group_id	 =  record[9]
		unit_id 	 = "cai"
		if record[17]:
			unit_id = "bo"

		brand_id = "khac"
		status	 = True

		insert_query = """('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', {6}, {7}, {8}, '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', {15})""".format(product_id, product_name, intro, desc, tech, price, is_for_sale, sale_percentage, is_new, image, cate_id, type_id, group_id, unit_id, brand_id, status)

		values.append(insert_query)
	return values


def main():
	data 	= serialize_data()
	values 	= stringify_query(data)
	tail 	= ','.join(values)
	head 	= "INSERT INTO SANPHAM( ma_san_pham, ten_san_pham, gioi_thieu, mo_ta, thong_so_ky_thuat, gia, dang_giam_gia, phan_tram_giam, san_pham_moi, anh_dai_dien, dong_san_pham, loai_san_pham, nhom_san_pham, don_vi_tinh, thuong_hieu, trang_thai ) VALUES"

	query = head + tail
	print(query)

if __name__ == '__main__':
	main()