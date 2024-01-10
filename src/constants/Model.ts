export interface Product {
    barcode: string,
    catatan: string,
    created_at: string,
    gambar: string,
    harga_barang: string,
    id: string,
    id_kategori: string,
    nama_barang: string,
    stok: string,
    updated_at: string
}

export interface Category {
    id: string,
    nama_kategori: string,
    created_at: string,
    updated_at: string
    keterangan: string
}

export interface Report {
    total_laba: string,
    total_terjual: string,
    biaya_tambahan: string,
    stok_sebelumnya: string,
    stok_sekarang: number
}

export interface Transactions {
    id_barang: string,
    biaya_tambahan: string,
    catatan: string,
    jumlah: string,
    total_biaya: string,
    nama_barang: string,
    id: string,
    created_at: string,
    nama_kategori: string,
    gambar: string,
}

export interface AdditionalPrice {
    id: string,
    nama: string,
    harga: string,
    keterangan: string,
    created_at: string,
    updated_at: string
}