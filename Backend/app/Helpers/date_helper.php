<?php

if (!function_exists('convertToMySQLFormat')) {
    function convertToMySQLFormat($isoDate) {
        return date("Y-m-d H:i:s", strtotime($isoDate));
    }
}

if (!function_exists('convertToISO8601Format')) {
    function convertToISO8601Format($mysqlDate) {
        return date("Y-m-d\TH:i:s\Z", strtotime($mysqlDate));
    }
}
