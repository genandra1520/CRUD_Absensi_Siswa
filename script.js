document.getElementById('absensiForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nama = document.getElementById('nama').value;
    const tanggal = document.getElementById('tanggal').value;
    const umur = document.getElementById('umur').value;
    const alamat = document.getElementById('alamat').value;

    const id = document.getElementById('absensiForm').dataset.id; // Ambil id dari dataset form

    const absensi = {
        id: id ? parseInt(id) : Date.now(),
        nama,
        tanggal,
        umur,
        alamat,
    };

    let absensiList = JSON.parse(localStorage.getItem('absensiList')) || [];
    
    if (id) {
        // Jika ada id, berarti sedang dalam mode edit
        absensiList = absensiList.map(item => item.id === absensi.id ? absensi : item);
    } else {
        // Jika tidak ada id, tambahkan data baru
        absensiList.push(absensi);
    }

    localStorage.setItem('absensiList', JSON.stringify(absensiList));
    document.getElementById('absensiForm').reset();
    delete document.getElementById('absensiForm').dataset.id; // Hapus id dari dataset
    renderAbsensi();
});

function renderAbsensi() {
    const absensiList = JSON.parse(localStorage.getItem('absensiList')) || [];
    const tbody = document.getElementById('absensiTable').getElementsByTagName('tbody')[0];
    
    tbody.innerHTML = '';
    absensiList.forEach(absen => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = absen.nama;
        row.insertCell(1).innerText = absen.tanggal;
        row.insertCell(2).innerText = absen.umur;
        row.insertCell(3).innerText = absen.alamat;       

        const editCell = row.insertCell(4);
        const editButton = document.createElement('editButton');
        editButton.innerText = 'Edit';
        editButton.onclick = function () {
            editAbsensi(absen);
        };
        editCell.appendChild(editButton);

        const deleteCell = row.insertCell(5);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Hapus';
        deleteButton.onclick = function () {
            deleteAbsensi(absen.id);
        };
        deleteCell.appendChild(deleteButton);
    });
}

function editAbsensi(absen) {
    document.getElementById('nama').value = absen.nama;
    document.getElementById('tanggal').value = absen.tanggal;
    document.getElementById('umur').value = absen.umur;
    document.getElementById('alamat').value = absen.alamat;

    // Set id ke dataset form untuk menandakan bahwa ini adalah mode edit
    document.getElementById('absensiForm').dataset.id = absen.id;
}

function deleteAbsensi(id) {
    let absensiList = JSON.parse(localStorage.getItem('absensiList')) || [];
    absensiList = absensiList.filter(absen => absen.id !== id);
    localStorage.setItem('absensiList', JSON.stringify(absensiList));
    renderAbsensi();
}

// Render absensi saat halaman dimuat
renderAbsensi();
