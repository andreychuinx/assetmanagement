Table user
    - id
    - email
    - password
    - role
    - createdAt
    - updatedAt

table barang
    - nama barang
    - stock

table Tempat
    - nama Place
    - deskripsi place

table TempatBarang
    - id
    - idBarang
    - idTempat
    - quantity

table SewaBarang
    - id
    - idRequestBarang
    - tglKembali -> estimasi kembali
    - statusPinjam
    - statusBarang -> after dibalikin

table requestBarang
    - id
    - UserId
    - BarangId
    - quantity
    - DatePinjem
    - statusApproval
    - keterangan

role admin ada 2
    - admin > semua table
    - user sewa > read SewaBarang where idUser & requsetBarang

phase 0 ---> Urus Table Primary
    - Bang Eko
        - Urus CRUD User dan tempat
    - andrey
        - urus CRUD barang dan tempatBarang

phase 1 ---> Urus Table Conjuction
    - Bang Eko
        - Request Barang
    - Andrey
        - Sewa Barang

phase 2 ---> report
    - Bang Eko
        - Reporting User
    - Andrey
        - Reporting Barang

phase 3 ---> view and bug
    - Bang Eko & Andrey
        - Testing dari Phase 0 sampai 3
        - Deploy ke heroku

phase Opsi ---> SMS
    - Bang Eko & Andrey
        - notifikasi jika request ter approve oleh admin
        - notifikasi jika batas waktu pinjam kurang 1 hari dan seterusnya







sewa barang
CRUD : user, item, rent_barang
MVP : bisa pindah barang dari 1 tempat ke tempat lain
ada report per tabggal sekian, di place apa, ada barang apa(search), report jika ada yang pinjam
