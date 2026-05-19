import face_recognition
print("======================================================")
print("[AI SERVER] ELTRI BIOMETRIC ANTI-TEMAN SYSTEM - ACTIVE! 🚀🔥")
print("======================================================")

from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os

app = Flask(__name__)

# Mengizinkan request dari browser lokal (Live Server) agar tidak diblokir CORS
CORS(app, resources={r"/*": {
    "origins": "*",
    "methods": ["POST", "GET", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

NAMA_FOTO_KUNCI = "face.jpg"
KUNCI_WAJAH_MASTER = None

# ========================================================
# LOCK-ON FASE: MEMUAT BIO-DATA WAJAH ASLI MASTER ELTRI
# ========================================================
if os.path.exists(NAMA_FOTO_KUNCI):
    try:
        print(f"[AI SYSTEM] Memuat data foto master: {NAMA_FOTO_KUNCI}...")
        bgr_img = cv2.imread(NAMA_FOTO_KUNCI)
        if bgr_img is None:
            raise FileNotFoundError("File face.jpg kosong atau korup.")
            
        foto_master = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2RGB).astype('uint8')
        encoding_master = face_recognition.face_encodings(foto_master)
        
        if len(encoding_master) > 0:
            KUNCI_WAJAH_MASTER = encoding_master[0]
            print("[AI SYSTEM] SUKSES: Cetak Wajah Master Eltri Terkunci di Server! 🔒")
        else:
            print(f"[⚠️ WARN] Wajah tidak terdeteksi di file {NAMA_FOTO_KUNCI}! Pastikan foto jelas.")
    except Exception as e:
        print(f"[❌ ERROR] Gagal inisialisasi biometrik: {str(e)}")
else:
    print(f"[❌ ERROR] File '{NAMA_FOTO_KUNCI}' TIDAK ADA! Tolong taruh foto abang dengan nama face.jpg di folder ini.")

# ========================================================
# CORE ENGINE: VERIFIKASI WAJAH LIVE DARI WEBCAM
# ========================================================
@app.route('/deteksi', methods=['POST', 'OPTIONS'])
def verifikasi_akses():
    if request.method == 'OPTIONS':
        response = jsonify({"status": "OK"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "*")
        return response, 200

    if KUNCI_WAJAH_MASTER is None:
        return jsonify({"status": "LOCKED", "reason": "Server belum punya database wajah master"}), 200

    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({"status": "LOCKED", "reason": "Data frame kosong"}), 200

        raw_image_data = data['image']
        
        # Bersihkan header Base64 dari canvas browser
        if ',' in raw_image_data:
            encoded_data = raw_image_data.split(',')[1]
        else:
            encoded_data = raw_image_data

        # Decode base64 string menjadi bentuk gambar matriks
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({"status": "LOCKED", "reason": "Gagal membaca format gambar webcam"}), 200

        # Scanning lokasi wajah pada webcam
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB).astype('uint8')
        lokasi_wajah_live = face_recognition.face_locations(rgb_frame)
        encodings_wajah_live = face_recognition.face_encodings(rgb_frame, lokasi_wajah_live)

        # Jika tidak ada wajah sama sekali di depan kamera
        if len(encodings_wajah_live) == 0:
            return jsonify({"status": "LOCKED", "reason": "Wajah tidak terdeteksi kamera"}), 200

        for wajah_live in encodings_wajah_live:
            # PENTING: Tolerance 0.45 dibuat ketat agar TEMAN TIDAK BISA TEMBUS!
            hasil_cocok = face_recognition.compare_faces([KUNCI_WAJAH_MASTER], wajah_live, tolerance=0.55)
            jarak_kemiripan = face_recognition.face_distance([KUNCI_WAJAH_MASTER], wajah_live)[0]
            
            print(f"[SCANNING LIVE] Skor Jarak Wajah: {jarak_kemiripan:.4f}")

            if hasil_cocok[0]:
                print("[ACCESS GRANTED] VALID! Selamat Datang Master Eltri. 🔓")
                return jsonify({"status": "UNLOCKED"}), 200

        # Jika wajah yang terdeteksi bukan wajah abang (wajah teman)
        print("[ACCESS DENIED] DETEKSI PENYUSUP! Wajah tidak cocok. Akses Blokir! 🔒")
        return jsonify({"status": "LOCKED"}), 200

    except Exception as e:
        print(f"[❌ SERVER ERROR] Gagal memproses data: {str(e)}")
        return jsonify({"status": "LOCKED", "error": str(e)}), 200

if __name__ == '__main__':
    print("\n==================================================================")
    print("--- SERVER ANTI-TEMAN STAND-BY: MENUNGGU DATA DARI LIVE SERVER ---")
    print("==================================================================")
    app.run(host='0.0.0.0', port=5000, debug=True)
