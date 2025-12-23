import os
import base64
import requests
import hashlib
import time 
from flask import Flask, request, jsonify 
from flask_cors import CORS 
from dotenv import load_dotenv

load_dotenv()

# Config
API_KEY = os.getenv('VT_API_KEY')
BASE_URL = "https://www.virustotal.com/api/v3/urls"

app = Flask(__name__)
# CORS
CORS(app, resources={r"/scan": {"origins": "*"}}) 

# Cache
url_cache = {} 

def get_id(url):
    try:
        return base64.urlsafe_b64encode(url.encode()).decode().strip("=")
    except:
        return None

def get_hash(url):
    return hashlib.sha256(url.encode()).hexdigest()

@app.route('/scan', methods=['POST'])
def scan_url():
    start = time.time()
    
    # Input
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'error': 'URL wajib diisi'}), 400

    hash_id = get_hash(url)

    # 1. Cek Cache
    if hash_id in url_cache:
        print(f"[CACHE] Hit: {url}")
        res = url_cache[hash_id]
        res['process_time'] = f"{time.time() - start:.4f}s (Cached)"
        return jsonify(res)
    
    # 2. Request ke VT
    print(f"[API] Scan: {url}")
    vt_id = get_id(url)
    headers = { "x-apikey": API_KEY, "accept": "application/json" }

    res = requests.get(f"{BASE_URL}/{vt_id}", headers=headers)
    final_res = None

    if res.status_code == 200:
        final_res = res.json()
        
    elif res.status_code == 404:
        # Not found, scan baru
        print("[INFO] New Scan...")
        post_req = requests.post(BASE_URL, data={"url": url}, headers=headers)
        
        if post_req.status_code == 200:
            time.sleep(3) # Tunggu proses
            
            # Ambil ulang
            retry = requests.get(f"{BASE_URL}/{vt_id}", headers=headers)
            if retry.status_code == 200:
                final_res = retry.json()
            else:
                # Masih antri
                return jsonify({
                    'status': 'queued',
                    'malicious': 0, 'harmless': 0, 'suspicious': 0, 'reputation': 0,
                    'scan_signature': "PENDING",
                    'process_time': "Analyzing..."
                })
        else:
            return jsonify({'error': 'Gagal request scan'}), 500

    else:
        return jsonify({'error': 'API Error'}), 500

    # 3. Format Data
    if final_res:
        try:
            attr = final_res['data']['attributes']
            stats = attr['last_analysis_stats']
            
            output = {
                'status': 'success',
                'malicious': stats['malicious'],
                'harmless': stats['harmless'],
                'suspicious': stats['suspicious'],
                'reputation': attr.get('reputation', 0),
                'scan_signature': hash_id,
                'process_time': f"{time.time() - start:.4f}s (Network)"
            }

            # Simpan cache
            url_cache[hash_id] = output
            return jsonify(output)

        except:
            return jsonify({'error': 'Format data salah'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)