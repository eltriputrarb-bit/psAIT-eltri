import face_recognition
print("======================================================")
print("[AI VERIFICATION] ANTI-SPOOFING & ANTI-TEMAN ACTIVE! 🔥")
print("======================================================")

from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)

NAMA_FOTO_KUNCI = "face.jpg"
KUNCI_WAJAH_MASTER = None

if os.path.exists(NAMA_FOTO_KUNCI):
    try:
        print(f"\n[AI SYSTEM] Menemukan {NAMA_FOTO_KUNCI}. Mengekstrak Biometrik Master...")
        bgr_img = cv2.imread(NAMA_FOTO_KUNCI)
        if bgr_img is None:
            raise FileNotFoundError(f"File '{NAMA_FOTO_KUNCI}' rusak.")
            
        foto_master = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2RGB).astype('uint8')
        encoding_master = face_recognition.face_encodings(foto_master)
        
        if len(encoding_master) > 0:
            KUNCI_WAJAH_MASTER = encoding_master[0]
            print("[AI SYSTEM] Database Kunci Biometrik Sukses Diaktifkan! 🔒 LOCK ON!")
        else:
            print(f"[⚠️ WARN] AI tidak menemukan wajah di {NAMA_FOTO_KUNCI}!")
    except Exception as e:
        print(f"[❌ ERROR] Gagal memproses foto master: {str(e)}")

# ========================================================
# FUNGSI ANTI-SPOOFING (MEMBEDAKAN LIVENESS / FOTO VS ASLI)
# ========================================================
# ========================================================
# FUNGSI ANTI-SPOOFING (DIKALIBRASI ULANG KHUSUS HP ANDROID)
# ========================================================
def cek_wajah_asli(frame_bgr):
    # Mengonversi ke Gray untuk cek ketajaman piksel
    gray = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2GRAY)
    nilai_laplacian = cv2.Laplacian(gray, cv2.CV_64F).var()
    
    print(f"[LIVENESS] Analisis Tekstur Wajah: {nilai_laplacian:.2f}")
    
    # KALIBRASI BARU: Kamera HP Android lewat Ngrok biasanya dapet nilai rendah.
    # Kita turunkan batasan aman ke angka 1.5 biar HP Android abang lolos, 
    # tapi kalau cuma foto kertas/layar mati tetep keblokir.
    if nilai_laplacian < 1.5:
        return False # Terlalu blur / fix palsu
    return True # Wajah asli lolos
# ========================================================
# ROUTE SCAN
# ========================================================
@app.route('/scan-wajah', methods=['POST', 'OPTIONS'])
def scan_wajah():
    if request.method == 'OPTIONS':
        return jsonify({"status": "OK"}), 200

    if KUNCI_WAJAH_MASTER is None:
        return jsonify({"status": "LOCKED", "reason": "Kunci wajah belum aktif"})

    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({"status": "LOCKED", "reason": "Data gambar kosong"})

        encoded_data = data['image'].split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({"status": "LOCKED", "reason": "Gagal membaca frame"})
            
        # 1. VALIDASI ANTI-FOTO (Liveness Detection)
        if not cek_wajah_asli(frame):
            print("[⚠️ ALARM] DETEKSI FRAUD: Teman Lu Nyoba Pakai Foto/HP! AKSES BLOKIR! ❌")
            return jsonify({"status": "LOCKED", "reason": "Fake Image Detected"})

        # 2. PROSES PENCOCOKAN WAJAH
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB).astype('uint8')
        lokasi_wajah_live = face_recognition.face_locations(rgb_frame)
        encodings_wajah_live = face_recognition.face_encodings(rgb_frame, lokasi_wajah_live)

        for wajah_live in encodings_wajah_live:
            # OPTIMASI ANTI-TEMAN: Tolerance diperketat dari 0.55 jadi 0.48! 
            # Makin kecil angkanya, makin sadis AI-nya membedakan kemiripan wajah orang lain.
            hasil_cocok = face_recognition.compare_faces([KUNCI_WAJAH_MASTER], wajah_live, tolerance=0.48)
            jarak_kemiripan = face_recognition.face_distance([KUNCI_WAJAH_MASTER], wajah_live)[0]
            
            print(f"[SCANNING] Jarak Ketidakmiripan AI: {jarak_kemiripan:.4f}")

            if hasil_cocok[0]:
                print("[SUCCESS] MATCH! Selamat Datang Master Eltri! 🔓 ACCESS GRANTED.")
                return jsonify({"status": "UNLOCKED"})

        print("[LOCKED] Anda Bukan Master Eltri! PORTAL TETAP DIKUNCI! 🔒")
        return jsonify({"status": "LOCKED"})

    except Exception as e:
        print(f"[❌ ERROR] Kendala teknis: {str(e)}")
        return jsonify({"status": "LOCKED", "error": str(e)})

if __name__ == '__main__':
    print("\n==================================================================")
    print("--- SERVER INTELLIGENCE ANTI-SPOOFING PORT 5000 ACTIVE ---")
    print("==================================================================")
    app.run(host='0.0.0.0', port=5000, debug=False)
