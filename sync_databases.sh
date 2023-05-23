#!/bin/bash

# Source Database Configuration
source_host="localhost"
source_user="root"
source_password=""
source_database="sys_gp"
source_table="vaccines"

# Destination Database Configuration
destination_host="localhost"
destination_user="root"
destination_password=""
destination_database="test"
destination_table="vaccines"

# Export Process
timestamp=$(date +%Y%m%d%H%M%S)
export_file="/path/to/export/folder/${source_table}_${timestamp}.sql"
mysqldump -h "$source_host" -u "$source_user" -p"$source_password" "$source_database" "$source_table" > "$export_file"

# Import Process
mysql -h "$destination_host" -u "$destination_user" -p"$destination_password" "$destination_database" < "$export_file"

echo "Table synchronization completed successfully."
