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
    `ma_khach_hang` VARCHAR(255) UNIQUE,
	`ho` VARCHAR(512) NOT NULL,
    `ten` VARCHAR(512) NOT NULL,
	`so_dien_thoaI` VARCHAR(20) NOT NULL, 
    `dia_chi` VARCHAR(255)
);

ALTER TABLE KHACHHANG ADD CONSTRAINT `fk_khachhang_account` FOREIGN KEY (`ten_dang_nhap`) REFERENCES TAIKHOAN(`ten_dang_nhap`);

CREATE TABLE DONGSANPHAM (
	`ma_dong` VARCHAR(255) PRIMARY KEY NOT NULL,
    `ten_dong` TEXT,
    `dsp_ghi_chu` TEXT
);

CREATE TABLE LOAISANPHAM (
	`ma_loai` VARCHAR(255) PRIMARY KEY NOT NULL,
    `ten_loai` TEXT,
    `dong_san_pham` VARCHAR(255) NOT NULL,
    `lsp_ghi_chu` TEXT
);

ALTER TABLE LOAISANPHAM ADD CONSTRAINT `fk_loaisp_dongsp` FOREIGN KEY (`dong_san_pham`) REFERENCES DONGSANPHAM( `ma_dong` );


CREATE TABLE NHOMSANPHAM(
	`ma_nhom` VARCHAR(255) PRIMARY KEY NOT NULL,
    `ten_nhom` TEXT,
    `loai_san_pham` VARCHAR(255) NOT NULL,
    `nsp_ghi_chu` TEXT
);

ALTER TABLE NHOMSANPHAM ADD CONSTRAINT `fk_nhomsp_lsp` FOREIGN KEY (`loai_san_pham`) REFERENCES LOAISANPHAM(`ma_loai`);

CREATE TABLE THUONGHIEU(
	`ma_thuong_hieu` VARCHAR(255) PRIMARY KEY NOT NULL,
    `ten_thuong_hieu` TEXT NOT NULL,
    `email` VARCHAR(255),
    `hotline` VARCHAR(20),
    `dia_chi` TEXT,
    `th_ghi_chu` TEXT,
    `logo` TEXT
);

CREATE TABLE TRANGTHAI(
	`ma_trang_thai` VARCHAR(255) PRIMARY KEY NOT NULL,
    `ten_trang_thai` TEXT,    
    `ghi_chu` TEXT
);


CREATE TABLE DONVITINH(
	`ma_don_vi` VARCHAR(255) PRIMARY KEY NOT NULL,
	`ten_don_vi` TEXT,
    `ghi_chu` TEXT
);

-- TRIGGER CHECK % giảm giá không quá 30%
CREATE TABLE SANPHAM(
	`ma_san_pham` VARCHAR(255) PRIMARY KEY NOT NULL,
    `ten_san_pham` TEXT,
    `gioi_thieu` TEXT,
    `mo_ta` TEXT,
    `thong_so_ky_thuat` TEXT,
    `gia` INT,
    `dang_giam_gia` BOOL DEFAULT TRUE,
    `phan_tram_giam` INT,
    `san_pham_moi` BOOL DEFAULT FALSE,
    `anh_dai_dien` TEXT,
    `nhom_san_pham` VARCHAR(255),
    `don_vi_tinh` VARCHAR(255),
    `thuong_hieu` VARCHAR(255),
    `trang_thai` BOOL DEFAULT TRUE
);

ALTER TABLE SANPHAM ADD CONSTRAINT `fk_sp_nsp` FOREIGN KEY (`nhom_san_pham`) REFERENCES NHOMSANPHAM(`ma_nhom`);
ALTER TABLE SANPHAM ADD CONSTRAINT `fk_sp_th` FOREIGN KEY (`thuong_hieu`) REFERENCES THUONGHIEU(`ma_thuong_hieu`);
ALTER TABLE SANPHAM ADD CONSTRAINT `fk_sp_dvt` FOREIGN KEY (`don_vi_tinh`) REFERENCES DONVITINH(`ma_don_vi`);

CREATE TABLE ANHBOSUNG(
	`ma_anh` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `ma_san_pham` VARCHAR(255),
    `url` TEXT,
    `abs_ghi_chu` TEXT
);

ALTER TABLE ANHBOSUNG ADD CONSTRAINT `fk_abs_sanpham` FOREIGN KEY (`ma_san_pham`) REFERENCES SANPHAM(`ma_san_pham`);

CREATE TABLE SANPHAMLIENQUAN(
	`san_pham_goc` VARCHAR(255) NOT NULL,
    `san_pham_lien_quan` VARCHAR(255) NOT NULL
);

ALTER TABLE SANPHAMLIENQUAN ADD CONSTRAINT `pk_san_pham_lien_quan` PRIMARY KEY (`san_pham_goc`, `san_pham_lien_quan`);

CREATE TABLE DONHANG(
	`so_hoa_don` VARCHAR(255) PRIMARY KEY NOT NULL,
    `ten_dang_nhap` VARCHAR(255) NOT NULL,
    `ngay_lap` DATETIME DEFAULT NOW(),
    `dia_chi_nhan_hang` TEXT NOT NULL,
    `nguoi_lap_don` VARCHAR(255) DEFAULT 'Administrator', -- Sau này khi có nhóm ng dùng admin sẽ đặt khóa ngoại lên đây, hiện tại cứ auto Admin là đc
    `dh_ghi_chu` TEXT,
    `nguoi_nhan` TEXT,
    `trang_thai` VARCHAR(255)    
);

ALTER TABLE DONHANG ADD CONSTRAINT `fk_donhang_khachhang` FOREIGN KEY (`ten_dang_nhap`) REFERENCES KHACHHANG(`ten_dang_nhap`);
ALTER TABLE DONHANG ADD CONSTRAINT `fk_donhang_trangthai` FOREIGN KEY (`trang_thai`) REFERENCES TRANGTHAI(`ma_trang_thai`);

CREATE TABLE CHITIETDATHANG (
	`so_hoa_don` VARCHAR(255),
    `ma_san_pham` VARCHAR(255),
    `so_luong` INT,
    `don_gia` INT
);

ALTER TABLE CHITIETDATHANG ADD CONSTRAINT `fk_ctdh_dh` FOREIGN KEY (`so_hoa_don`) REFERENCES DONHANG(`so_hoa_don`);
ALTER TABLE CHITIETDATHANG ADD CONSTRAINT `fk_ctdh_sp` FOREIGN KEY (`ma_san_pham`) REFERENCES SANPHAM(`ma_san_pham`);
ALTER TABLE CHITIETDATHANG ADD CONSTRAINT `pk_ctdh` PRIMARY KEY (`so_hoa_don`, `ma_san_pham`);

CREATE TABLE DANHGIA(
	`ma_danh_gia` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `ten_dang_nhap` VARCHAR(255),
    `chat_luong` TINYINT,
    `binh_luan` TEXT,
    `ma_san_pham` VARCHAR(255)
);

ALTER TABLE DANHGIA ADD CONSTRAINT `fk_dg_ngdung` FOREIGN KEY (`ten_dang_nhap`) REFERENCES KHACHHANG(`ten_dang_nhap`);

CREATE TABLE THULIENHE(
	`ma_thu` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `email` VARCHAR(255),
    `website` TEXT,
    `tin_nhan` TEXT,
    `thoi_gian_gui` DATETIME DEFAULT NOW()
);
