DROP DATABASE IF EXISTS xuandungstore;

CREATE DATABASE xuandungstore;
USE xuandungstore;

CREATE TABLE TAIKHOAN (
	`ten_dang_nhap` VARCHAR(255) PRIMARY KEY NOT NULL,
    `mat_khau` VARCHAR(255) NOT NULL,
    `trang_thai` BOOL DEFAULT TRUE,
    `role` ENUM('khachhang', 'admin') DEFAULT 'khachhang'
);

CREATE TABLE KHACHHANG (
	`ten_dang_nhap` VARCHAR(255) PRIMARY KEY NOT NULL,
	`ho_ten` VARCHAR(512),
	`so_dien_thoaI` VARCHAR(20) NOT NULL, 
    `email` VARCHAR(20),
    `dia_chi` VARCHAR(255)
);

CREATE TABLE DONGSANPHAM (
	`ma_dong` VARCHAR(255) PRIMARY KEY NOT NULL
);