f = open('pb_us_canada_testdata.csv', 'r')
file_text = f.read()
w = open("xmlFormat.xml", "w")
List_Of_Lines = file_text.split("\n")

for line in List_Of_Lines:
	fields = line.split(",")
	if len(fields) > 2:

		if fields[-1] == "NoMatch":
			continue

		# if fields[6] == "Canada":
		# 	continue
		
		#Match Confidence greater than 70%
		if int(fields[-4]) < 70:
			continue 

		w.write("<AddressItem>\n")
		if fields[1] != "":
			w.write("<AddressLine1>" + fields[1] + "</AddressLine1>\n")
		if fields[2] != "":
			w.write("<AddressLine2>" + fields[2] + "</AddressLine2>\n")
		if fields[3] != "":
			w.write("<City>" + fields[3] + "</City>\n")
		if fields[4] != "":
			w.write("<State>" + fields[4] + "</State>\n")
		if fields[5] != "":
			w.write("<PostalCode>" + fields[5] + "</PostalCode>\n")
		if fields[6] != "":
			w.write("<Country>" + fields[6] + "</Country>\n")
		if fields[8] != "":
			w.write("<GeoAccuracyNum>" + fields[8] + "</GeoAccuracyNum>\n")
		if fields[-3] != "":
			w.write("<Latitude>" + fields[-3] + "</Latitude>\n")
		if fields[-2] != "":
			w.write("<Longitude>" + fields[-2] + "</Longitude>\n")
		if fields[-1] != "":
			w.write("<GeoAccuracyCode>" + fields[-1] + "</GeoAccuracyCode>\n")
		
		w.write("</AddressItem>\n")	
