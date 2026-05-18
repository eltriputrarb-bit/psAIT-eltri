from flask import Flask, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# 1. MEMUAT DETEKTOR INTI WAJAH (HAAR CASCADE)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# 2. INISIALISASI RECOGNIZER LBPH (ANTI-EROR)
recognizer = None
MODE_KUNCI_AKTIF = False
NAMA_FOTO_KUNCI = "face.jpg"

# Gunakan deteksi otomatis model yang tersedia di library OpenCV Anda
try:
    if hasattr(cv2, 'face') and hasattr(cv2.face, 'LBPHFaceRecognizer_create'):
        recognizer = cv2.face.LBPHFaceRecognizer_create()
    elif hasattr(cv2, 'LBPHFaceRecognizer_create'):
        recognizer = cv2.LBPHFaceRecognizer_create()
except Exception:
    recognizer = None

# 3. VERIFIKASI FILE FOTO UTAMA (face.png)
if recognizer is None:
    print("\n[⚠️ INFO SYSTEM] Berjalan dalam 'Mode Deteksi Wajah Umum' (Asal ada manusia = Unlocked).")
else:
    if os.path.exists(NAMA_FOTO_KUNCI):
        print(f"\n[AI SYSTEM] Menemukan file {NAMA_FOTO_KUNCI}. Memproses data wajah Master Eltri...")
        foto_mentah = cv2.imread(NAMA_FOTO_KUNCI, cv2.IMREAD_GRAYSCALE)
        wajah_terdeteksi = face_cascade.detectMultiScale(foto_mentah, 1.3, 5)

        if len(wajah_terdeteksi) == 0:
            print("[⚠️ WARN] AI tidak menemukan wajah di face.png. Pastikan foto terang dan jelas!")
        else:
            (x, y, w, h) = wajah_terdeteksi[0]
            wajah_crop_kunci = foto_mentah[y:y+h, x:x+w]
            recognizer.train([wajah_crop_kunci], np.array([1]))
            print("[AI SYSTEM] Database Kunci Wajah Sukses Diaktifkan! 🔒")
            MODE_KUNCI_AKTIF = True
    else:
        print(f"\n[⚠️ INFO] File '{NAMA_FOTO_KUNCI}' tidak ditemukan di folder. Menggunakan Mode Umum.")

# 4. AKTIFKAN HARDWARE WEBCAM
kamera = cv2.VideoCapture(0)

@app.route('/scan-wajah', methods=['GET'])
def scan_wajah():
    ret, frame = kamera.read()
    if not ret:
        return jsonify({"status": "LOCKED"})

    gray_live = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces_live = face_cascade.detectMultiScale(gray_live, 1.3, 5)

    # Logika 1: Jika mode kunci tidak aktif, asal ada wajah manusia langsung terbuka
    if not MODE_KUNCI_AKTIF:
        if len(faces_live) > 0:
            return jsonify({"status": "UNLOCKED"})
        return jsonify({"status": "LOCKED"})

    # Logika 2: Jika face.png aktif, cocokkan tingkat kemiripan piksel wajah
    for (x, y, w, h) in faces_live:
        wajah_live_crop = gray_live[y:y+h, x:x+w]
        try:
            label, confidence = recognizer.predict(wajah_live_crop)
            # Nilai confidence semakin kecil berarti semakin mirip dengan face.png
            if label == 1 and confidence < 75.0:
                return jsonify({"status": "UNLOCKED"})
        except Exception:
            # Fallback jika terjadi kendala matriks di tengah jalan
            return jsonify({"status": "UNLOCKED"})

    return jsonify({"status": "LOCKED"})

if __name__ == '__main__':
    print("\n==================================================================")
    print("--- SERVER INTELLIGENCE BACK-END ELTRI PROJECT RUNNING ON PORT 5000 ---")
    print("==================================================================")
    app.run(host='127.0.0.1', port=5000, debug=False)
