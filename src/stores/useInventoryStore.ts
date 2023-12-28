import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

interface Category {
    id: string,
    nama_kategori: string,
    created_at: string,
    updated_at: string
    keterangan: string
}

interface InitialValues {
    categories: Category[],
    setCategories: (data: Category[]) => void
}

export const useCategoryStore = createWithEqualityFn<InitialValues>((set, get) => ({
    categories: [],
    setCategories: (data) => {
        set({ categories: data })
    },
}), shallow);

export interface AdditionalPrice {
    id: string,
    nama: string,
    harga: string,
    keterangan: string,
    created_at: string,
    updated_at: string
}

interface InitalBiayaTambahan {
    biayaTambahan: AdditionalPrice[],
    setBiayaTambahan: (data: AdditionalPrice[]) => void
}

export const useBiayaTambahan = createWithEqualityFn<InitalBiayaTambahan>((set, get) => ({
    biayaTambahan: [],
    setBiayaTambahan: (data) => {
        set({ biayaTambahan: data })
    },
}), shallow);

export interface Transactions {
    id_barang: string,
    biaya_tambahan: string,
    catatan: string,
    jumlah: string,
    total_biaya: string,
    nama_barang: string,
    id: string,
    created_at: string,
    nama_kategori: string
}

interface InitialTransaksi {
    transaksi: Transactions[],
    setTransaksi: (data: Transactions[]) => void
}

export const useTransaksi = createWithEqualityFn<InitialTransaksi>((set, get) => ({
    transaksi: [],
    setTransaksi: (data) => {
        set({ transaksi: data })
    },
}), shallow);

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

interface InitialProduct {
    products: Product[],
    setProducts: (data: Product[]) => void
}

export const useProducts = createWithEqualityFn<InitialProduct>((set, get) => ({
    products: [],
    setProducts: (data) => {
        set({ products: data })
    },
}), shallow);
